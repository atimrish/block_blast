import {randomNumber} from "@src/shared/lib/randomNumber";
import {TColor, TFigure} from "../model";

export const LOCAL_STORAGE_KEYS = {
	CELLS: "block__blast_cells",
	FIGURES: "block_blast_figures",
	SCORE: "block_blast_score",
	BEST_SCORE: "block_blast_best_score",
	MUTED: "block_blast_muted",
};

export const MOBILE_UP_Y = 70;

export const COLORS = [
	"#6A0572",
	"#43AA8B",
	"#577590",
	"#c0d2a0",
	"#ffd192",
	"#ae5865",
	"#F79D84",
	"#FF6B6B",
	"#6441a4",
] as const;

const FIGURE_CROSS = (color: TColor): TFigure => [
	["", color, ""],
	[color, color, color],
	["", color, ""],
];

const FIGURE_STAIRS_1 = (color: TColor): TFigure => [
	[color, ""],
	[color, color],
];

const FIGURE_STAIRS_2 = (color: TColor): TFigure => [
	["", color],
	[color, color],
];

const FIGURE_STAIRS_3 = (color: TColor): TFigure => [
	[color, color],
	[color, ""],
];

const FIGURE_STAIRS_4 = (color: TColor): TFigure => [
	[color, color],
	["", color],
];

const FIGURE_VERTICAL_LINE = (color: TColor): TFigure => {
	const length = randomNumber(1, 6);
	return Array.from({length}, () => [color]);
};

const FIGURE_HORIZONTAL_LINE = (color: TColor): TFigure => {
	const length = randomNumber(1, 6);
	return [new Array(length).fill(color)];
};

const FIGURE_SQUARE = (color: TColor): TFigure => {
	const length = randomNumber(1, 3);
	return Array.from({length}, () => new Array(length).fill(color));
};

const FIGURE_ARROW_TOP = (color: TColor): TFigure => [
	["", color, ""],
	[color, color, color],
	[color, "", color],
];

const FIGURE_ARROW_BOTTOM = (color: TColor): TFigure => [
	[color, "", color],
	[color, color, color],
	["", color, ""],
];

const FIGURE_ARROW_LEFT = (color: TColor): TFigure => [
	["", color, color],
	[color, color, ""],
	["", color, color],
];

const FIGURE_ARROW_RIGHT = (color: TColor): TFigure => [
	[color, color, ""],
	["", color, color],
	[color, color, ""],
];

const FIGURE_CAP_TOP = (color: TColor): TFigure => [
	[color, color, color],
	[color, "", color],
];

const FIGURE_CAP_BOTTOM = (color: TColor): TFigure => [
	[color, "", color],
	[color, color, color],
];

const FIGURE_CAP_LEFT = (color: TColor): TFigure => [
	[color, color],
	[color, ""],
	[color, color],
];

const FIGURE_CAP_RIGHT = (color: TColor): TFigure => [
	[color, color],
	["", color],
	[color, color],
];

const FIGURE_MOUNTAIN_TOP = (color: TColor): TFigure => [
	["", color, ""],
	[color, color, color],
];

const FIGURE_MOUNTAIN_BOTTOM = (color: TColor): TFigure => [
	[color, color, color],
	["", color, ""],
];

const FIGURE_MOUNTAIN_LEFT = (color: TColor): TFigure => [
	["", color],
	[color, color],
	["", color],
];

const FIGURE_MOUNTAIN_RIGHT = (color: TColor): TFigure => [
	[color, ""],
	[color, color],
	[color, ""],
];

const FIGURE_LONG_STAIRS_TOP_LEFT = (color: TColor): TFigure => [
	[color, color, color],
	[color, "", ""],
];

const FIGURE_LONG_STAIRS_TOP_RIGHT = (color: TColor): TFigure => [
	[color, color, color],
	["", "", color],
];

const FIGURE_LONG_STAIRS_BOTTOM_LEFT = (color: TColor): TFigure => [
	[color, "", ""],
	[color, color, color],
];

const FIGURE_LONG_STAIRS_BOTTOM_RIGHT = (color: TColor): TFigure => [
	["", "", color],
	[color, color, color],
];

const FIGURE_LONG_STAIRS_LEFT_TOP = (color: TColor): TFigure => [
	[color, color],
	[color, ""],
	[color, ""],
];

const FIGURE_LONG_STAIRS_LEFT_BOTTOM = (color: TColor): TFigure => [
	[color, ""],
	[color, ""],
	[color, color],
];

const FIGURE_LONG_STAIRS_RIGHT_TOP = (color: TColor): TFigure => [
	[color, color],
	["", color],
	["", color],
];

const FIGURE_LONG_STAIRS_RIGHT_BOTTOM = (color: TColor): TFigure => [
	["", color],
	["", color],
	[color, color],
];

const FIGURE_T_TOP = (color: TColor): TFigure => [
	[color, color, color],
	["", color, ""],
	["", color, ""],
];

const FIGURE_T_BOTTOM = (color: TColor): TFigure => [
	["", color, ""],
	["", color, ""],
	[color, color, color],
];

const FIGURE_T_LEFT = (color: TColor): TFigure => [
	[color, "", ""],
	[color, color, color],
	[color, "", ""],
];

const FIGURE_T_RIGHT = (color: TColor): TFigure => [
	["", "", color],
	[color, color, color],
	["", "", color],
];

const FIGURE_Z_1 = (color: TColor): TFigure => [
	[color, "", ""],
	[color, color, color],
	["", "", color],
];

const FIGURE_Z_2 = (color: TColor): TFigure => [
	["", "", color],
	[color, color, color],
	[color, "", ""],
];

const FIGURE_Z_3 = (color: TColor): TFigure => [
	[color, color, ""],
	["", color, ""],
	["", color, color],
];

const FIGURE_Z_4 = (color: TColor): TFigure => [
	["", color, color],
	["", color, ""],
	[color, color, ""],
];

export const FIGURES = {
	cross: FIGURE_CROSS,
	stairs_1: FIGURE_STAIRS_1,
	stairs_2: FIGURE_STAIRS_2,
	stairs_3: FIGURE_STAIRS_3,
	stairs_4: FIGURE_STAIRS_4,

	vertical_line: FIGURE_VERTICAL_LINE,
	horizontal_line: FIGURE_HORIZONTAL_LINE,
	square: FIGURE_SQUARE,

	arrow_top: FIGURE_ARROW_TOP,
	arrow_bottom: FIGURE_ARROW_BOTTOM,
	arrow_left: FIGURE_ARROW_LEFT,
	arrow_right: FIGURE_ARROW_RIGHT,

	cap_top: FIGURE_CAP_TOP,
	cap_bottom: FIGURE_CAP_BOTTOM,
	cap_left: FIGURE_CAP_LEFT,
	cap_right: FIGURE_CAP_RIGHT,

	mountain_top: FIGURE_MOUNTAIN_TOP,
	mountain_bottom: FIGURE_MOUNTAIN_BOTTOM,
	mountain_left: FIGURE_MOUNTAIN_LEFT,
	mountain_right: FIGURE_MOUNTAIN_RIGHT,

	long_stairs_top_left: FIGURE_LONG_STAIRS_TOP_LEFT,
	long_stairs_top_right: FIGURE_LONG_STAIRS_TOP_RIGHT,

	long_stairs_bottom_left: FIGURE_LONG_STAIRS_BOTTOM_LEFT,
	long_stairs_bottom_right: FIGURE_LONG_STAIRS_BOTTOM_RIGHT,

	long_stairs_left_top: FIGURE_LONG_STAIRS_LEFT_TOP,
	long_stairs_left_bottom: FIGURE_LONG_STAIRS_LEFT_BOTTOM,

	long_stairs_right_top: FIGURE_LONG_STAIRS_RIGHT_TOP,
	long_stairs_right_bottom: FIGURE_LONG_STAIRS_RIGHT_BOTTOM,

	t_top: FIGURE_T_TOP,
	t_bottom: FIGURE_T_BOTTOM,
	t_left: FIGURE_T_LEFT,
	t_right: FIGURE_T_RIGHT,

	z_1: FIGURE_Z_1,
	z_2: FIGURE_Z_2,
	z_3: FIGURE_Z_3,
	z_4: FIGURE_Z_4,
};
