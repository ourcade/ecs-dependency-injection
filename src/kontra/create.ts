import { init, GameLoop, load, imageAssets } from 'kontra'
import {
	ECSPipeline,
	GameUpdateFunc,
	IAssetsData,
	IECSWorld,
	IGameConfig,
} from '../types'
import { GameContext, RenderLoopFunc, UpdateLoopFunc } from './types'

export function getGame(config: IGameConfig) {
	const canvasElem = document.getElementById('app')! as HTMLCanvasElement
	canvasElem.width = config.world.width
	canvasElem.height = config.world.height
	canvasElem.style.background = 'black'
	return init(canvasElem)
}

export function createLoadAssets(assets: IAssetsData) {
	return async () => {
		await load(assets.ball.path, assets.brick.path, assets.paddle.path)

		console.log(imageAssets[assets.ball.path])
	}
}

export function createUpdateLoop(
	world: IECSWorld,
	gameUpdate: GameUpdateFunc,
	updatePipeline: ECSPipeline
) {
	return (dt: number) => {
		world.dt = dt

		gameUpdate(world)
		updatePipeline(world)
	}
}

export function createRenderLoop(
	world: IECSWorld,
	renderPipeline: ECSPipeline
) {
	return () => {
		renderPipeline(world)
	}
}

export function createLoop(
	game: GameContext,
	updateLoop: UpdateLoopFunc,
	renderLoop: RenderLoopFunc
) {
	const { context } = game
	return GameLoop({
		context,
		update: updateLoop,
		render: renderLoop,
	})
}
