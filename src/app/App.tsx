import {GameProvider} from "@src/entities/game/ui/game-provider";
import {GamePage} from "@src/pages/game/ui/GamePage";
import {RootContext} from "./context/rootContext";
import {StrictMode} from "react";

export const App = () => {
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
