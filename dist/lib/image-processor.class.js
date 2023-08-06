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
exports.fromImageWithoutAlphaChannel = exports.fromImageWithAlphaChannel = void 0;
const nut_js_1 = require("@nut-tree/nut-js");
const cv = __importStar(require("@u4/opencv4nodejs"));
function determineROI(img, roi) {
    return new cv.Rect(Math.min(Math.max(roi.left, 0), img.width), Math.min(Math.max(roi.top, 0), img.height), Math.min(roi.width, img.width - roi.left), Math.min(roi.height, img.height - roi.top));
}
/**
 * fromImageWithAlphaChannel should provide a way to create a library specific
 * image with alpha channel from an abstract Image object holding raw data and image dimension
 *
 * @param {Image} img The input Image
 * @param {Region} [roi] An optional Region to specify a ROI
 * @returns {Promise<any>} An image
 * @memberof VisionProviderInterface
 */
const fromImageWithAlphaChannel = async (img, roi) => {
    let mat;
    if (img.colorMode === nut_js_1.ColorMode.RGB) {
        mat = await new cv.Mat(img.data, img.height, img.width, cv.CV_8UC4).cvtColorAsync(cv.COLOR_RGBA2BGR);
    }
    else {
        mat = await new cv.Mat(img.data, img.height, img.width, cv.CV_8UC4).cvtColorAsync(cv.COLOR_BGRA2BGR);
    }
    if (roi) {
        return mat.getRegion(determineROI(img, roi));
    }
    else {
        return mat;
    }
};
exports.fromImageWithAlphaChannel = fromImageWithAlphaChannel;
/**
 * fromImageWithoutAlphaChannel should provide a way to create a library specific
 * image without alpha channel from an abstract Image object holding raw data and image dimension
 *
 * @param {Image} img The input Image
 * @param {Region} [roi] An optional Region to specify a ROI
 * @returns {Promise<any>} An image
 * @memberof VisionProviderInterface
 */
const fromImageWithoutAlphaChannel = async (img, roi) => {
    let mat;
    if (img.colorMode === nut_js_1.ColorMode.RGB) {
        mat = await new cv.Mat(img.data, img.height, img.width, cv.CV_8UC3).cvtColorAsync(cv.COLOR_RGB2BGR);
    }
    else {
        mat = new cv.Mat(img.data, img.height, img.width, cv.CV_8UC3);
    }
    if (roi) {
        return mat.getRegion(determineROI(img, roi));
    }
    else {
        return mat;
    }
};
exports.fromImageWithoutAlphaChannel = fromImageWithoutAlphaChannel;
//# sourceMappingURL=image-processor.class.js.map