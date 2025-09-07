import {TFigure, useGameContext} from "@src/entities/game/model";
import {requestAnimationTimeout} from "@src/shared/lib/requestAnimationTimeout";
import {useEffect, useRef} from "react";
import {MOBILE_UP_Y} from "../../config";
import {checkCanPlaceFigureAtPoint} from "../../lib/checkCanPlaceFigureAtPoint";
import {checkColumnAllFilled} from "../../lib/checkColumnAllFilled";
import {checkRowAllFilled} from "../../lib/checkRowAllFilled";
import * as s from "./Figure.module.css";

type FigureProps = {
	id: number;
	figure: TFigure;
};

const halfCell = Math.min(window.innerHeight, innerWidth) * 0.02;

export const Figure = (p: FigureProps) => {
	const {cells, setCells, figures, setFigures, setFilled, setScore, audioService} = useGameContext();

	const blockRef = useRef<HTMLDivElement>(null);
	const figureRef = useRef<HTMLDivElement>(null);
	const touchStartCoordsRef = useRef<{x: number; y: number}>({x: 0, y: 0});
	const mountTouchStartCoordsRef = useRef<{x: number; y: number}>({x: 0, y: 0});

	const getTargetElement = (eventX: number, eventY: number, upX: number = 0): Element | undefined => {
		const firstSquareCenterX = mountTouchStartCoordsRef.current.x - touchStartCoordsRef.current.x + halfCell;
		const firstSquareCenterY = mountTouchStartCoordsRef.current.y - touchStartCoordsRef.current.y - upX + halfCell;
		return document
			.elementsFromPoint(eventX + firstSquareCenterX, eventY + firstSquareCenterY)
			.find((elem) => elem.hasAttribute("data-droppable"));
	};

	useEffect(() => {
		if (blockRef.current) {
			const {x, y} = blockRef.current.getBoundingClientRect();
			mountTouchStartCoordsRef.current.x = x;
			mountTouchStartCoordsRef.current.y = y;
		}
	}, [figures]);

	const onDropFigure = (eventX: number, eventY: number, upX: number = 0) => {
		const elem = getTargetElement(eventX, eventY, upX);

		if (blockRef.current) {
			if (elem) {
				const droppedX = Number(elem.getAttribute("data-x"));
				const droppedY = Number(elem.getAttribute("data-y"));
				const clonedCells = structuredClone(cells);
				let isAllFilled = true;
				let score = 0;

				const touchedRows: Record<number, boolean> = {};
				const touchedColumns: Record<number, boolean> = {};

				main: for (let y = 0; y < p.figure.length; y++) {
					for (let x = 0; x < p.figure[y].length; x++) {
						if (!p.figure[y][x]) {
							continue;
						}

						const currentX = droppedX + x;
						const currentY = droppedY + y;

						if (
							cells[currentY] === undefined ||
							cells[currentY][currentX] === undefined ||
							cells[currentY][currentX]
						) {
							isAllFilled = false;
							break main;
						}

						touchedRows[currentY] = true;
						touchedColumns[currentX] = true;
						clonedCells[currentY][currentX] = p.figure[y][x];
						score++;
					}
				}
				if (isAllFilled) {
					//доводим фигуру до конца элемента
					const elemClientRect = elem.getBoundingClientRect();
					const currentX = mountTouchStartCoordsRef.current.x - elemClientRect.x;
					const currentY = mountTouchStartCoordsRef.current.y - elemClientRect.y;

					blockRef.current.style.transform = `translate(${-currentX}px, ${-currentY}px)`;

					const allFilledColumns: Record<number, boolean> = {};
					const allFilledRows: Record<number, boolean> = {};

					//обнаружение полностью заполненных клеток
					Object.keys(touchedRows).forEach((key) => {
						if (checkRowAllFilled(clonedCells, +key)) {
							allFilledRows[+key] = true;
						}
					});

					Object.keys(touchedColumns).forEach((key) => {
						if (checkColumnAllFilled(clonedCells, +key)) {
							allFilledColumns[+key] = true;
						}
					});

					//проигрываем звук
					audioService.playBubblePop();

					requestAnimationTimeout(() => {
						//помечаем строки и столбцы как заполненные
						setFilled({
							rows: Object.keys(allFilledRows).map((i) => +i),
							columns: Object.keys(allFilledColumns).map((i) => +i),
						});

						setScore((prevScore) => prevScore + score);
						setCells(clonedCells);
						setFigures(figures.filter((figure) => figure.id !== p.id));
					}, 50);
				} else {
					blockRef.current.style.transform = "translate(0px, 0px)";
					if (figureRef.current) {
						figureRef.current.style.scale = "0.7";
					}
				}
			} else {
				blockRef.current.style.transform = "translate(0px, 0px)";
				if (figureRef.current) {
					figureRef.current.style.scale = "0.7";
				}
			}

			blockRef.current.style.opacity = "1";
		}

		//очищаем начальные координаты
		touchStartCoordsRef.current.x = 0;
		touchStartCoordsRef.current.y = 0;
	};

	const mouseMoveHandler = (e: MouseEvent) => {
		if (blockRef.current) {
			const x = e.clientX - touchStartCoordsRef.current.x;
			const y = e.clientY - touchStartCoordsRef.current.y;
			blockRef.current.style.transform = `translate(${x}px, ${y}px)`;

			const elem = getTargetElement(e.clientX, e.clientY);

			if (elem) {
				const dataX = Number(elem.getAttribute("data-x"));
				const dataY = Number(elem.getAttribute("data-y"));
				const res = checkCanPlaceFigureAtPoint(cells, p.figure, dataX, dataY);
				blockRef.current.style.opacity = res ? "1" : "0.65";
			}
		}
	};

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		touchStartCoordsRef.current.x = e.clientX;
		touchStartCoordsRef.current.y = e.clientY;

		if (figureRef.current) {
			figureRef.current.style.scale = "1";
		}

		document.body.addEventListener("mousemove", mouseMoveHandler);

		document.body.addEventListener(
			"mouseup",
			(e) => {
				onDropFigure(e.clientX, e.clientY);
				document.body.removeEventListener("mousemove", mouseMoveHandler);
			},
			{once: true}
		);
	};

	const touchMoveHandler = (e: TouchEvent) => {
		if (blockRef.current) {
			const x = e.changedTouches[0].clientX - touchStartCoordsRef.current.x;
			const y = e.changedTouches[0].clientY - touchStartCoordsRef.current.y - MOBILE_UP_Y;
			blockRef.current.style.transform = `translate(${x}px, ${y}px)`;

			const elem = getTargetElement(e.changedTouches[0].clientX, e.changedTouches[0].clientY, MOBILE_UP_Y);

			if (elem) {
				const dataX = Number(elem.getAttribute("data-x"));
				const dataY = Number(elem.getAttribute("data-y"));
				const res = checkCanPlaceFigureAtPoint(cells, p.figure, dataX, dataY);
				blockRef.current.style.opacity = res ? "1" : "0.65";
			}
		}
	};

	const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		touchStartCoordsRef.current.x = e.changedTouches[0].clientX;
		touchStartCoordsRef.current.y = e.changedTouches[0].clientY;

		if (figureRef.current) {
			figureRef.current.style.scale = "1";
		}

		if (blockRef.current) {
			blockRef.current.style.transform = `translate(0px, -${MOBILE_UP_Y}px)`;
		}

		document.body.addEventListener("touchmove", touchMoveHandler);

		document.body.addEventListener(
			"touchend",
			(ev) => {
				onDropFigure(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY, MOBILE_UP_Y);
				document.body.removeEventListener("touchmove", touchMoveHandler);
			},
			{once: true}
		);
	};

	return (
		<div ref={blockRef} className={s.main_block}>
			<div
				className={s.grid}
				onMouseDown={onMouseDown}
				onTouchStart={onTouchStart}
				ref={figureRef}
				style={{
					gridTemplateColumns: `repeat(${p.figure[0].length}, var(--cell-width))`,
					gridTemplateRows: `repeat(${p.figure.length}, var(--cell-width))`,
				}}>
				{p.figure.map((row, y) =>
					row.map((filled, x) => (
						<div
							key={x + "" + y}
							data-filled={filled}
							data-x={x}
							data-y={y}
							style={{backgroundColor: filled}}
						/>
					))
				)}
			</div>
		</div>
	);
};
