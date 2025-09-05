import {Cell} from "@src/entities/game/ui/cell";
import {useGameContext} from "../../model";
import {FiguresBlock} from "../figures-block";
import * as s from "./CellsBlock.module.css";
import {useMemo} from "react";

export const CellsBlock = () => {
	const {cells, filled} = useGameContext();

	const filledRows = useMemo(
		() =>
			filled.rows.reduce<Record<number, boolean>>((acc, key) => {
				acc[key] = true;
				return acc;
			}, {}),
		[filled]
	);

	const filledColumns = useMemo(
		() =>
			filled.columns.reduce<Record<number, boolean>>((acc, key) => {
				acc[key] = true;
				return acc;
			}, {}),
		[filled]
	);

	return (
		<>
			<div className={s.container}>
				{cells.map((row, y) =>
					row.map((color, x) => (
						<Cell x={x} y={y} color={color} key={x + "" + y} willPop={filledColumns[x] || filledRows[y]} />
					))
				)}
			</div>

			<FiguresBlock />
		</>
	);
};
