import * as cv from "@u4/opencv4nodejs";
import { lowerBound } from "./bound-value.function";

export async function scaleImage(image: cv.Mat, scaleFactor: number): Promise<cv.Mat> {
    const boundScaleFactor = lowerBound(scaleFactor, 0.0, 1.0);
    const scaledRows = Math.floor(image.rows * boundScaleFactor);
    const scaledCols = Math.floor(image.cols * boundScaleFactor);
    return image.resizeAsync(scaledRows, scaledCols, 0, 0, cv.INTER_AREA);
}
