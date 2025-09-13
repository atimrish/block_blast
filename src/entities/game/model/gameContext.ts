import {AudioService} from "@src/shared/lib/audioService";
import {createContext, useContext} from "react";
import {LANGUAGES} from "../config";
import {TFigure, TFilled, TMarkedFigure} from "./types";

interface IGameContext {
	cells: TFigure;
	setCells: React.Dispatch<React.SetStateAction<TFigure>>;

	figures: TMarkedFigure[];
	setFigures: React.Dispatch<React.SetStateAction<TMarkedFigure[]>>;

	filled: TFilled;
	setFilled: React.Dispatch<React.SetStateAction<TFilled>>;

	score: number;
	setScore: React.Dispatch<React.SetStateAction<number>>;

	gameOver: boolean;
	setGameOver: React.Dispatch<React.SetStateAction<boolean>>;

	bestScore: number;
	setBestScore: React.Dispatch<React.SetStateAction<number>>;

	muted: boolean;
	setMuted: React.Dispatch<React.SetStateAction<boolean>>;

	language: (typeof LANGUAGES)[number];
	setLanguage: React.Dispatch<React.SetStateAction<(typeof LANGUAGES)[number]>>;

	isRewardUsed: boolean;
	setIsRewardUsed: React.Dispatch<React.SetStateAction<boolean>>;

	startNewGame: () => void;
	clearByRewardedVideo: () => void;
	audioService: AudioService;
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

export const useGameContext = (): IGameContext => {
	const context = useContext(GameContext);

	if (context === undefined) {
		throw new Error("context is undefined");
	}

	return context;
};
