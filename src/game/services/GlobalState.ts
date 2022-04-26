import { IGlobalState } from '../../types'

export class GlobalState implements IGlobalState {
	private launcher = -1
	private paddle = -1
	private ball = -1

	get launcherEntityId() {
		return this.launcher
	}

	get paddleEntityId() {
		return this.paddle
	}

	get ballEntityId() {
		return this.ball
	}

	setLauncherEntityId(eid: number) {
		this.launcher = eid
	}

	setPaddleEntityId(eid: number) {
		this.paddle = eid
	}

	setBallEntityId(eid: number) {
		this.ball = eid
	}
}
