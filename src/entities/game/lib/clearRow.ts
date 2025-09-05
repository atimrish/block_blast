import {TFigure} from "../model";

export const clearRow = (cells: TFigure, y: number): TFigure => {
	for (let x = 0; x < cells[y].length; x++) {
		cells[y][x] = "";
	}

	return cells;
};
