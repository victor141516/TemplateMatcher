"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchImages = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
const cv = __importStar(require("@u4/opencv4nodejs"));
async function matchImages(haystack, needle) {
    const match = await haystack.matchTemplateAsync(needle, cv.TM_SQDIFF_NORMED);
    const minMax = await match.minMaxLocAsync();
    return new nut_js_1.MatchResult(1.0 - minMax.minVal, new nut_js_1.Region(minMax.minLoc.x, minMax.minLoc.y, needle.cols, needle.rows));
}
exports.matchImages = matchImages;
//# sourceMappingURL=match-image.function.js.map