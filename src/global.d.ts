import {SDK} from "@types/ysdk";

declare global {
	interface Window {
		webkitAudioContext: typeof AudioContext;
		ysdk: SDK;
	}

	declare module "*.css";
	declare module "*.mp3";
}
