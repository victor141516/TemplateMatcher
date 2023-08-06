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
exports.scaleImage = void 0;
const cv = __importStar(require("@u4/opencv4nodejs"));
const bound_value_function_1 = require("./bound-value.function");
async function scaleImage(image, scaleFactor) {
    const boundScaleFactor = (0, bound_value_function_1.lowerBound)(scaleFactor, 0.0, 1.0);
    const scaledRows = Math.floor(image.rows * boundScaleFactor);
    const scaledCols = Math.floor(image.cols * boundScaleFactor);
    return image.resizeAsync(scaledRows, scaledCols, 0, 0, cv.INTER_AREA);
}
exports.scaleImage = scaleImage;
//# sourceMappingURL=scale-image.function.js.map