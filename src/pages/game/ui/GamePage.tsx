import {LANGUAGES, LOCAL_STORAGE_KEYS} from "@src/entities/game/config";
import {i18n} from "@src/entities/game/config/i18n";
import {useGameContext} from "@src/entities/game/model";
import {CellsBlock} from "@src/entities/game/ui/cells-block";
import {animateNumber} from "@src/shared/lib/animateNumber";
import {CrownIcon} from "@src/shared/ui/assets/icons/CrownIcon";
import {MutedVolumeIcon} from "@src/shared/ui/assets/icons/MutedVolumeIcon";
import {RefreshIcon} from "@src/shared/ui/assets/icons/RefreshIcon";
import {VolumeIcon} from "@src/shared/ui/assets/icons/VolumeIcon";
import {useEffect, useRef} from "react";
import * as s from "./GamePage.module.css";

export const GamePage = () => {
	const {score, gameOver, startNewGame, bestScore, muted, setMuted, language, setLanguage, clearByRewardedVideo} =
		useGameContext();

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
			<div className={s.top_panel}>
				<div className={s.best_score}>
					<CrownIcon />
					<div ref={bestScoreElemRef}>{bestScore}</div>
				</div>

				<div className={s.top_panel__right_block}>
					<select
						className={s.top_panel__select}
						value={language}
						onChange={(e) => {
							localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, e.target.value);
							setLanguage(e.target.value as (typeof LANGUAGES)[number]);
						}}>
						<option value="en">🇬🇧</option>
						<option value="ru">🇷🇺</option>
					</select>

					<button className={s.top_panel__button} onClick={() => setMuted((prev) => !prev)}>
						{muted ? <MutedVolumeIcon /> : <VolumeIcon />}
					</button>

					<button
						className={s.top_panel__button}
						onClick={() => {
							startNewGame();
						}}>
						<RefreshIcon />
					</button>
				</div>
			</div>

			<div className={s.score} ref={scoreElemRef}>
				{prevScore.current}
			</div>

			<CellsBlock />

			{gameOver && (
				<div className={s.modal}>
					<h3 className={s.game_over_heading}>{i18n[language].noMoves}</h3>
					<div className={s.game_over_score}>{score}</div>
					<div className={s.game_over_best_score}>
						{i18n[language].bestScore} {bestScore}
					</div>

					<button
						className={s.new_game_button}
						onClick={() => {
							startNewGame();
						}}>
						<RefreshIcon />
					</button>
				</div>
			)}
		</div>
	);
};
