import {requestAnimationTimeout} from "@src/shared/lib/requestAnimationTimeout";
import {PropsWithChildren, useEffect, useRef, useState} from "react";
import {LOCAL_STORAGE_KEYS} from "../../config";
import {checkCanPlaceFigure} from "../../lib/checkCanPlaceFigure";
import {clearColumn} from "../../lib/clearColumn";
import {clearRow} from "../../lib/clearRow";
import {createFiguresStack} from "../../lib/createFiguresStack";
import {getEmptyCells} from "../../lib/getEmptyCells";
import {GameContext, TFigure, TFilled, TMarkedFigure} from "../../model";
import {AudioService} from "@src/shared/lib/audioService";

const initCells = (): TFigure => {
	const localCells = localStorage.getItem(LOCAL_STORAGE_KEYS.CELLS);
	return localCells ? JSON.parse(localCells) : getEmptyCells();
};

const initFigures = (): TMarkedFigure[] => {
	const localFigures = localStorage.getItem(LOCAL_STORAGE_KEYS.FIGURES);
	return localFigures ? JSON.parse(localFigures) : createFiguresStack();
};

const initScore = (): number => {
	const localScore = localStorage.getItem(LOCAL_STORAGE_KEYS.SCORE);
	return localScore ? Number(localScore) : 0;
};

const initBestScore = (): number => {
	const localBestScore = localStorage.getItem(LOCAL_STORAGE_KEYS.BEST_SCORE);
	return localBestScore ? Number(localBestScore) : 0;
};

export const GameProvider = (p: PropsWithChildren) => {
	const [cells, setCells] = useState<TFigure>(initCells);
	const [bestScore, setBestScore] = useState(initBestScore);
	const [figures, setFigures] = useState<TMarkedFigure[]>(initFigures);
	const [filled, setFilled] = useState<TFilled>({rows: [], columns: []});
	const [score, setScore] = useState(initScore);
	const [gameOver, setGameOver] = useState(false);
	const [audioService] = useState(() => new AudioService());

	const startNewGame = () => {
		setCells(getEmptyCells());
		setFigures(createFiguresStack());
		setFilled({rows: [], columns: []});
		setScore(0), setGameOver(false);
	};

	useEffect(() => {
		if (figures.length === 0) {
			setFigures(createFiguresStack());
		}
	}, [figures]);

	useEffect(() => {
		if (filled.columns.length > 0 || filled.rows.length > 0) {
			let score = (filled.columns.length + filled.rows.length) * 12;

			audioService.playBells();

			requestAnimationTimeout(() => {
				filled.columns.forEach((i) => clearColumn(cells, i));
				filled.rows.forEach((i) => clearRow(cells, i));

				setScore((prevScore) => prevScore + score);
				setCells([...cells]);
				setFilled({rows: [], columns: []});
			}, 500);
		}
	}, [filled, cells]);

	useEffect(() => {
		//game over check

		if (figures.length > 0) {
			setGameOver(!figures.some((i) => checkCanPlaceFigure(cells, i.figure)));
		}
	}, [figures, cells]);

	useEffect(() => {
		//save to localStorage
		localStorage.setItem(LOCAL_STORAGE_KEYS.CELLS, JSON.stringify(cells));
		localStorage.setItem(LOCAL_STORAGE_KEYS.FIGURES, JSON.stringify(figures));
		localStorage.setItem(LOCAL_STORAGE_KEYS.SCORE, score.toString());
		localStorage.setItem(LOCAL_STORAGE_KEYS.BEST_SCORE, bestScore.toString());
	}, [cells, figures, score, bestScore]);

	useEffect(() => {
		//bestScore check
		if (score > bestScore) {
			setBestScore(score);
		}
	}, [score]);

	return (
		<GameContext.Provider
			value={{
				cells,
				setCells,
				figures,
				setFigures,
				filled,
				setFilled,
				score,
				setScore,
				gameOver,
				setGameOver,
				startNewGame,
				bestScore,
				setBestScore,
				audioService,
			}}>
			{p.children}
		</GameContext.Provider>
	);
};
