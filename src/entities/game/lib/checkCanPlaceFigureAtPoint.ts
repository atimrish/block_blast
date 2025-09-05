import {TFigure} from "../model";

export const checkCanPlaceFigureAtPoint = (
	cells: TFigure,
	figure: TFigure,
	pointX: number,
	pointY: number
): boolean => {
	for (let figureY = 0; figureY < figure.length; figureY++) {
		for (let figureX = 0; figureX < figure[figureY].length; figureX++) {
			//проверка на пустую ячейку фигуры
			if (figure[figureY][figureX] === "") {
				continue;
			}

			if (cells[pointY + figureY] === undefined || cells[pointY + figureY][pointX + figureX] === undefined) {
				return false;
			}

			//проверка на заполненность ячейки поля
			if (cells[pointY + figureY][pointX + figureX] !== "") {
				return false;
			}
		}
	}

	return true;
};
