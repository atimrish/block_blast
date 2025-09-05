import { TFigure } from "../model";

export const getEmptyCells = (): TFigure => Array.from({length: 12}, () => new Array(12).fill(""))