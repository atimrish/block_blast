import {GameProvider} from "@src/entities/game/ui/game-provider";
import {GamePage} from "@src/pages/game/ui/GamePage";
import {RootContext} from "./context/rootContext";
import {StrictMode, useEffect} from "react";

export const App = () => {
	useEffect(() => {
		const preventContextMenuEvent = (e: MouseEvent) => {
			e.preventDefault();
		};

		document.body.addEventListener("contextmenu", preventContextMenuEvent);

		return () => {
			document.body.removeEventListener("contextmenu", preventContextMenuEvent);
		};
	}, []);

	return (
		<StrictMode>
			<RootContext.Provider value={RootContext}>
				<GameProvider>
					<GamePage />
				</GameProvider>
			</RootContext.Provider>
		</StrictMode>
	);
};
