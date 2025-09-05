import {randomColor} from "./randomColor";
import {randomNumber} from "@src/shared/lib/randomNumber";
import {FIGURES} from "../config";
import {TFigure} from "../model";

export const randomFigure = (): TFigure => {
	const color = randomColor();
	const figureKeys = Object.keys(FIGURES);
	const randomIndex = randomNumber(0, figureKeys.length - 1);
	const randomKey = figureKeys[randomIndex] as keyof typeof FIGURES;
	return FIGURES[randomKey](color);
};
