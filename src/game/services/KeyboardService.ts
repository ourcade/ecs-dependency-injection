import { IKeyboardService } from '../../types'

export class KeyboardService implements IKeyboardService {
	private keysPressed = new Set<string>()

	get left() {
		return this.keysPressed.has('arrowleft') || this.keysPressed.has('a')
	}

	get right() {
		return this.keysPressed.has('arrowright') || this.keysPressed.has('d')
	}

	get space() {
		return this.keysPressed.has(' ')
	}

	constructor() {
		window.addEventListener('keydown', this.handleKeyDown)
		window.addEventListener('keyup', this.handleKeyUp)
	}

	destroy() {
		window.removeEventListener('keydown', this.handleKeyDown)
		window.removeEventListener('keyup', this.handleKeyUp)
	}

	private handleKeyDown = (evt: KeyboardEvent) => {
		this.keysPressed.add(evt.key.toLowerCase())
	}

	private handleKeyUp = (evt: KeyboardEvent) => {
		this.keysPressed.delete(evt.key.toLowerCase())
	}
}
