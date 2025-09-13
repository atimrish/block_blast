import {AudioService} from "@src/shared/lib/audioService";
import {randomNumber} from "@src/shared/lib/randomNumber";
import {requestAnimationTimeout} from "@src/shared/lib/requestAnimationTimeout";
import {PropsWithChildren, useEffect, useState} from "react";
import {LANGUAGES, LOCAL_STORAGE_KEYS} from "../../config";
import {checkCanPlaceFigure} from "../../lib/checkCanPlaceFigure";
import {clearColumn} from "../../lib/clearColumn";
import {clearRow} from "../../lib/clearRow";
import {createFiguresStack} from "../../lib/createFiguresStack";
import {getEmptyCells} from "../../lib/getEmptyCells";
import {GameContext, TFigure, TFilled, TMarkedFigure} from "../../model";

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

const initMuted = (): boolean => {
	const localMuted = localStorage.getItem(LOCAL_STORAGE_KEYS.MUTED);
	return localMuted === "true";
};

const initLanguage = (): (typeof LANGUAGES)[number] => {
	// const sdkLanguage = window.ysdk.environment.i18n.lang as (typeof LANGUAGES)[number];
	// const localLanguage = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) as (typeof LANGUAGES)[number] | undefined;

	// if (localLanguage) {
	// 	return localLanguage;
	// }

	// return LANGUAGES.includes(sdkLanguage) ? sdkLanguage : "ru";

	return 'ru'
};

const initIsRewardUsed = (): boolean => {
	const localIsRewardUsed = localStorage.getItem(LOCAL_STORAGE_KEYS.IS_REWARD_USED);
	return localIsRewardUsed === "true";
};

export const GameProvider = (p: PropsWithChildren) => {
	const [cells, setCells] = useState<TFigure>(initCells);
	const [bestScore, setBestScore] = useState(initBestScore);
	const [figures, setFigures] = useState<TMarkedFigure[]>(initFigures);
	const [filled, setFilled] = useState<TFilled>({rows: [], columns: []});
	const [score, setScore] = useState(initScore);
	const [gameOver, setGameOver] = useState(false);
	const [audioService] = useState(() => new AudioService());
	const [muted, setMuted] = useState(initMuted);
	const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>(initLanguage);
	const [isRewardUsed, setIsRewardUsed] = useState(initIsRewardUsed);

	const startNewGame = () => {
		setCells(getEmptyCells());
		setFigures(createFiguresStack());
		setFilled({rows: [], columns: []});
		setScore(0), setGameOver(false);
		setIsRewardUsed(false);
	};

	const clearByRewardedVideo = () => {
		const randomColumnIndexes: number[] = [];
		const randomRowIndexes: number[] = [];

		while (randomColumnIndexes.length < 3) {
			const randNum = randomNumber(0, 11);

			if (!randomColumnIndexes.includes(randNum)) {
				randomColumnIndexes.push(randNum);
			}
		}

		while (randomRowIndexes.length < 3) {
			const randNum = randomNumber(0, 11);

			if (!randomRowIndexes.includes(randNum)) {
				randomRowIndexes.push(randNum);
			}
		}

		setFilled({
			rows: randomRowIndexes,
			columns: randomColumnIndexes,
		});
		setIsRewardUsed(true);
		setGameOver(false);
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
		localStorage.setItem(LOCAL_STORAGE_KEYS.MUTED, String(muted));
		localStorage.setItem(LOCAL_STORAGE_KEYS.IS_REWARD_USED, String(isRewardUsed));
	}, [cells, figures, score, bestScore, muted, isRewardUsed]);

	useEffect(() => {
		//bestScore check
		if (score > bestScore) {
			setBestScore(score);
		}
	}, [score]);

	useEffect(() => {
		audioService.muted = muted;
	}, [muted]);

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
				muted,
				setMuted,
				language,
				setLanguage,
				clearByRewardedVideo,
				isRewardUsed,
				setIsRewardUsed,
			}}>
			{p.children}
		</GameContext.Provider>
	);
};
