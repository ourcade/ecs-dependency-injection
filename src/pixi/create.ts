import * as PIXI from 'pixi.js'

import type {
	GameUpdateFunc,
	IAssetsData,
	IECSWorld,
	IGameConfig,
} from '../types'
import { RenderPipeline } from './types'

export function createApp(config: IGameConfig, assets: IAssetsData) {
	const app = new PIXI.Application({
		width: config.world.width,
		height: config.world.height,
	})

	const logo = PIXI.Sprite.from(assets.logo.pixi.path)
	logo.anchor.set(1, 1)
	logo.position.set(config.world.width, config.world.height)
	logo.alpha = 0.3

	app.stage.addChild(logo)

	return app
}

export function createLoop(
	world: IECSWorld,
	gameUpdate: GameUpdateFunc,
	render: RenderPipeline
) {
	return (dt: number) => {
		world.dt = dt

		gameUpdate(world)
		render(world)
	}
}
