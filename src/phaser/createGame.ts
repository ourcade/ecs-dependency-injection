import Phaser from 'phaser'
import type { IGameConfig } from '../types'

export function createGame(config: IGameConfig) {
	return (parent: HTMLDivElement | string) => {
		return new Phaser.Game({
			type: Phaser.AUTO,
			parent,
			width: config.world.width,
			height: config.world.height,
			physics: {},
			scale: {
				mode: Phaser.Scale.ScaleModes.NONE,
				expandParent: false,
				autoRound: true,
			},
		})
	}
}
