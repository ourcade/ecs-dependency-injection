import { createChildContainer } from '../container'
import { GameConfig } from '../tokens'

import { registerBindings, registerInjections } from './register'

import { MainScene } from './tokens'

const container = createChildContainer()

registerInjections()
registerBindings(container)

const config = container.get(GameConfig)
const game = new Phaser.Game({
	type: Phaser.AUTO,
	parent: 'app',
	width: config.world.width,
	height: config.world.height,
	physics: {},
	scale: {
		mode: Phaser.Scale.ScaleModes.NONE,
		expandParent: false,
		autoRound: true,
	},
})

game.scene.add(MainScene.__d, function () {
	return container.get(MainScene)
})

game.scene.start(MainScene.__d)
