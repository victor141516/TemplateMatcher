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
const cv = __importStar(require("@u4/opencv4nodejs"));
const sneer_1 = require("sneer");
const match_image_function_1 = require("./match-image.function");
jest.mock('jimp', () => { });
describe("matchImages", () => {
    it("should return minLoc position and needle size", async () => {
        // GIVEN
        const minLocX = 100;
        const minLocY = 1000;
        const matchMock = (0, sneer_1.mockPartial)({
            minMaxLocAsync: jest.fn(() => Promise.resolve({
                maxLoc: new cv.Point2(200, 2000),
                maxVal: 100,
                minLoc: new cv.Point2(minLocX, minLocY),
                minVal: 0,
            }))
        });
        const haystackMock = (0, sneer_1.mockPartial)({
            matchTemplateAsync: jest.fn(() => Promise.resolve(matchMock))
        });
        const needleMock = (0, sneer_1.mockPartial)({
            cols: 123,
            rows: 456
        });
        // WHEN
        const result = await (0, match_image_function_1.matchImages)(haystackMock, needleMock);
        // THEN
        expect(result.location.left).toEqual(minLocX);
        expect(result.location.top).toEqual(minLocY);
        expect(result.location.width).toEqual(needleMock.cols);
        expect(result.location.height).toEqual(needleMock.rows);
    });
});
//# sourceMappingURL=match-image.function.spec.js.map