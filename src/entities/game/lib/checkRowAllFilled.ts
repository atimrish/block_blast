import {TFigure} from "../model";

export const checkRowAllFilled = (cells: TFigure, y: number): boolean => cells[y].every((cell) => cell !== "");
