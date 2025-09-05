import {useGameContext} from "../../model";
import {Figure} from "../figure/Figure";
import * as s from "./FiguresBlock.module.css";

export const FiguresBlock = () => {
	const {figures} = useGameContext();

	return (
		<div className={s.container}>
			{figures.map((i) => (
				<Figure figure={i.figure} key={i.id} id={i.id} />
			))}
		</div>
	);
};
