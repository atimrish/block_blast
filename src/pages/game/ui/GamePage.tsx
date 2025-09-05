import {CellsBlock} from "@src/entities/game/ui/cells-block";
import * as s from "./GamePage.module.css";
import {useGameContext} from "@src/entities/game/model";
import {useEffect, useRef} from "react";
import {animateNumber} from "@src/shared/lib/animateNumber";

export const GamePage = () => {
	const {score, gameOver, startNewGame, bestScore} = useGameContext();

	const prevScore = useRef(score);
	const prevBestScore = useRef(bestScore);
	const scoreElemRef = useRef<HTMLDivElement>(null);
	const bestScoreElemRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scoreElemRef.current) {
			animateNumber(prevScore.current, score, 1000, scoreElemRef.current);
		}

		prevScore.current = score;
	}, [score]);

	useEffect(() => {
		if (bestScoreElemRef.current) {
			animateNumber(prevBestScore.current, bestScore, 1000, bestScoreElemRef.current);
		}

		prevBestScore.current = bestScore;
	}, [bestScore]);

	return (
		<div className={s.container}>
			<div className={s.best_score}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#feffff"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
				</svg>
				<div ref={bestScoreElemRef}>{bestScore}</div>
			</div>

			<div className={s.score} ref={scoreElemRef}>
				{prevScore.current}
			</div>

			<CellsBlock />

			{gameOver && (
				<div className={s.modal}>
					<h3 className={s.modal__title}>Игра окончена</h3>
					<button
						className={s.new_game_button}
						onClick={() => {
							startNewGame();
						}}>
						Новая игра
					</button>
				</div>
			)}
		</div>
	);
};
