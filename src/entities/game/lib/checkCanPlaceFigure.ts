import {TFigure} from "../model";
import {checkCanPlaceFigureAtPoint} from "./checkCanPlaceFigureAtPoint";

export const checkCanPlaceFigure = (cells: TFigure, figure: TFigure): boolean => {
	for (let y = 0; y < cells.length - figure.length + 1; y++) {
		for (let x = 0; x < cells[y].length - figure[0].length + 1; x++) {
			if (!checkCanPlaceFigureAtPoint(cells, figure, x, y)) {
				continue;
			}			

			return true;
		}
	}

	return false;
};
