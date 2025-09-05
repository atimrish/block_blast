import { TFigure } from "../model";

export const checkColumnAllFilled = (cells: TFigure, x: number): boolean => {
	for (let y = 0; y < cells.length; y++) {
		if (cells[y][x] === "") return false;
	}

	return true;
};
