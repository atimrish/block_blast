declare module "*.css";
declare module "*.mp3";

declare interface Window {
	webkitAudioContext: typeof AudioContext;
}
