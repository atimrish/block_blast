import {TColor} from "../../model";
import * as s from "./Cell.module.css";

type TCellProps = {
	x: number;
	y: number;
	color: TColor;
	willPop: boolean;
};

export const Cell = (p: TCellProps) => {
	return (
		<div
			className={s.cell}
			data-droppable="true"
			data-x={p.x}
			data-y={p.y}
			data-filled={Boolean(p.color)}
		>
			<div className={s.inner} style={{backgroundColor: p.color}} data-will-pop={p.willPop} />
		</div>
	);
};
