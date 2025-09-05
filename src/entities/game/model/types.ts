import {COLORS} from "../config";

export type TColor = (typeof COLORS)[number] | "";

export type TFigure = TColor[][];

export type TMarkedFigure = {
	id: number;
	figure: TFigure;
};

export type TFilled = {rows: number[]; columns: number[]};
