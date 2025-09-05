import { TFigure } from "../model";

export const clearColumn = (cells: TFigure, x: number): TFigure => {
	for (let y = 0; y < cells.length; y++) {
		cells[y][x] = "";
	}

	return cells;
};
