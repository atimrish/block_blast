import {TMarkedFigure} from "../model";
import {randomFigure} from "./randomFigure";

export const createFiguresStack = (): TMarkedFigure[] => {
	const now = Date.now();
	return Array.from({length: 3}, (_, index) => ({
		id: now + index,
		figure: randomFigure(),
	}));
};
