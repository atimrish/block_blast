import BubblePopAudio from "@src/shared/ui/assets/audio/bubble_1.mp3";
import BellsAudio from "@src/shared/ui/assets/audio/bells.mp3";

export class AudioService {
	audioContext: AudioContext | null = null;
	muted: boolean = false;

	bubblePopArrayBuffer: ArrayBuffer | null = null;
	bubblePopAudioBuffer: AudioBuffer | null = null;

	bellsArrayBuffer: ArrayBuffer | null = null;
	bellsAudioBuffer: AudioBuffer | null = null;

	constructor() {
		fetch(BubblePopAudio)
			.then((res) => res.arrayBuffer())
			.then((res) => {
				this.bubblePopArrayBuffer = res;
			});

		fetch(BellsAudio)
			.then((res) => res.arrayBuffer())
			.then((res) => {
				this.bellsArrayBuffer = res;
			});
	}

	async playBubblePop() {
		if (this.muted) {
			return;
		}

		if (!this.audioContext) {
			this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		}

		if (this.bubblePopArrayBuffer) {
			if (!this.bubblePopAudioBuffer) {
				this.bubblePopAudioBuffer = await this.audioContext.decodeAudioData(this.bubblePopArrayBuffer);
			}

			await this._playSource(this.audioContext, this.bubblePopAudioBuffer);
		}
	}

	async playBells() {
		if (this.muted) {
			return;
		}

		if (!this.audioContext) {
			this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		}

		if (this.bellsArrayBuffer) {
			if (!this.bellsAudioBuffer) {
				this.bellsAudioBuffer = await this.audioContext.decodeAudioData(this.bellsArrayBuffer);
			}

			await this._playSource(this.audioContext, this.bellsAudioBuffer);
		}
	}

	async _playSource(audioContext: AudioContext, buffer: AudioBuffer) {
		const source = audioContext.createBufferSource();
		source.buffer = buffer;
		source.connect(audioContext.destination);
		source.start();
	}
}
