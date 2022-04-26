import Phaser from 'phaser'

import type {
	ECSPipeline,
	GameUpdateFunc,
	IAssetsData,
	IECSWorld,
	StartGameFunc,
} from '../types'
import type { PipelineCreator } from './types'

export class MainScene extends Phaser.Scene {
	private readonly assetsData: IAssetsData
	private readonly world: IECSWorld
	private readonly gameUpdate: GameUpdateFunc
	private readonly pipeline: ECSPipeline
	private readonly start: StartGameFunc

	constructor(
		assetsData: IAssetsData,
		world: IECSWorld,
		gameUpdate: GameUpdateFunc,
		createPipeline: PipelineCreator,
		startGame: StartGameFunc
	) {
		super({})

		this.assetsData = assetsData
		this.world = world
		this.gameUpdate = gameUpdate
		this.pipeline = createPipeline(this)
		this.start = startGame
	}

	preload() {
		const { ball, paddle, brick, logo } = this.assetsData

		this.load.image(ball.key, ball.path)
		this.load.image(paddle.key, paddle.path)
		this.load.image(brick.key, brick.path)

		this.load.image('logo', logo.phaser.path)
	}

	create() {
		const { width, height } = this.scale
		this.add.image(width, height, 'logo').setOrigin(1, 1).setAlpha(0.3)
		this.start()
	}

	update(_t: number, dt: number) {
		this.world.dt = dt
		this.gameUpdate(this.world)
		this.pipeline(this.world)
	}
}
