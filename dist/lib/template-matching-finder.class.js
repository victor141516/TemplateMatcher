"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nut_js_1 = require("@nut-tree/nut-js");
const image_processor_class_1 = require("./image-processor.class");
const match_image_function_1 = require("./match-image.function");
const scale_image_function_1 = require("./scale-image.function");
const scale_location_function_1 = require("./scale-location.function");
async function loadNeedle(image) {
    return (0, image_processor_class_1.fromImageWithAlphaChannel)(image);
}
async function loadHaystack(matchRequest) {
    return (0, image_processor_class_1.fromImageWithAlphaChannel)(matchRequest.haystack);
}
function throwOnTooLargeNeedle(haystack, needle, smallestScaleFactor) {
    const scaledRows = smallestScaleFactor * needle.rows;
    const scaledCols = smallestScaleFactor * needle.cols;
    if (scaledRows > haystack.rows || scaledCols > haystack.cols) {
        throw new Error("Search input is too large, try using a smaller template image.");
    }
}
class TemplateMatchingFinder {
    constructor() {
        this.scaleSteps = [0.9, 0.8, 0.7, 0.6, 0.5];
    }
    async findMatches(matchRequest) {
        var _a, _b;
        const needle = await loadNeedle(matchRequest.needle);
        if (!needle || needle.empty) {
            throw new Error(`Failed to load ${matchRequest.needle.id}, got empty image.`);
        }
        const haystack = await loadHaystack(matchRequest);
        if (!haystack || haystack.empty) {
            throw new Error(`Failed to load ${matchRequest.haystack.id}, got empty image.`);
        }
        throwOnTooLargeNeedle(haystack, needle, this.scaleSteps[this.scaleSteps.length - 1]);
        const matchResult = await (0, match_image_function_1.matchImages)(haystack, needle);
        const matchResults = [
            new nut_js_1.MatchResult(matchResult.confidence, matchResult.location)
        ];
        if ((_b = (_a = matchRequest.providerData) === null || _a === void 0 ? void 0 : _a.searchMultipleScales) !== null && _b !== void 0 ? _b : true) {
            const scaledResults = await this.searchMultipleScales(needle, haystack);
            matchResults.push(...scaledResults);
        }
        const matches = await Promise.all(matchResults).then(results => {
            results.forEach(matchResult => {
                matchResult.location.left /= matchRequest.haystack.pixelDensity.scaleX;
                matchResult.location.width /= matchRequest.haystack.pixelDensity.scaleX;
                matchResult.location.top /= matchRequest.haystack.pixelDensity.scaleY;
                matchResult.location.height /= matchRequest.haystack.pixelDensity.scaleY;
            });
            return results.sort((first, second) => second.confidence - first.confidence);
        });
        const potentialMatches = matches
            .filter(match => match.confidence >= matchRequest.confidence);
        if (potentialMatches.length === 0) {
            matches.sort((a, b) => a.confidence - b.confidence);
            const bestMatch = matches.pop();
            if (bestMatch) {
                throw new Error(`No match with required confidence ${matchRequest.confidence}. Best match: ${bestMatch.confidence}`);
            }
            else {
                throw new Error(`Unable to locate ${matchRequest.needle.id}, no match!`);
            }
        }
        return potentialMatches;
    }
    async findMatch(matchRequest) {
        const matches = await this.findMatches(matchRequest);
        return matches[0];
    }
    async searchMultipleScales(needle, haystack) {
        const results = [];
        for (const currentScale of this.scaleSteps) {
            const scaledHaystack = await (0, scale_image_function_1.scaleImage)(haystack, currentScale);
            const scaledNeedle = await (0, scale_image_function_1.scaleImage)(needle, currentScale);
            if (scaledHaystack.cols <= 10 || scaledHaystack.rows <= 10) {
                break;
            }
            if (scaledHaystack.cols * scaledHaystack.rows === 0) {
                break;
            }
            if (scaledHaystack.cols < needle.cols ||
                scaledHaystack.rows < needle.rows) {
                break;
            }
            if (scaledNeedle.cols <= 10 || scaledNeedle.rows <= 10) {
                break;
            }
            if (scaledNeedle.cols * scaledNeedle.rows === 0) {
                break;
            }
            if (haystack.cols < scaledNeedle.cols ||
                haystack.rows < scaledNeedle.rows) {
                break;
            }
            const matchNeedleResult = await (0, match_image_function_1.matchImages)(haystack, scaledNeedle);
            results.push(new nut_js_1.MatchResult(matchNeedleResult.confidence, matchNeedleResult.location));
            const matchHaystackResult = await (0, match_image_function_1.matchImages)(scaledHaystack, needle);
            results.push(new nut_js_1.MatchResult(matchHaystackResult.confidence, (0, scale_location_function_1.scaleLocation)(matchHaystackResult.location, currentScale)));
        }
        return results;
    }
}
exports.default = TemplateMatchingFinder;
//# sourceMappingURL=template-matching-finder.class.js.map