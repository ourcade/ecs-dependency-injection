import { addComponent, addEntity, createWorld, pipe } from 'bitecs'
import type { IECSWorld, IGameConfig, TextureToIndexFunc } from '../types'
import { Ball, Position, Sprite, Tint } from './components'
import { Texture } from './consts'

export * from './components'
export * from './consts'
export * from './systems'

export function createECSWorld(): IECSWorld {
	return createWorld({ dt: 0 })
}

export function createCorePipeline() {
	return pipe()
}

export function createBricks(
	config: IGameConfig,
	world: IECSWorld,
	textureToIndex: TextureToIndexFunc
) {
	// 0 - nothing, 1 - red, 2 - green, 3 - blue, 4 - purple, 5 - yellow, 6 - white
	const layout = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 1, 1, 1, 6, 3, 3, 3, 3],
		[0, 0, 0, 2, 2, 2, 1, 6, 3, 5, 5, 5],
		[0, 0, 0, 3, 3, 3, 1, 6, 3, 4, 4, 4],
		[0, 0, 0, 1, 1, 1, 1, 6, 3, 3, 3, 3],
	]
	const brickWidth = config.brick.width
	const halfBrickWidth = brickWidth * 0.5

	const brickHeight = config.brick.height
	const halfBrickHeight = brickHeight * 0.5

	return () => {
		for (let i = 0; i < layout.length; ++i) {
			for (let j = 0; j < layout[i].length; ++j) {
				const space = layout[i][j]
				if (space <= 0) {
					continue
				}

				const eid = addEntity(world)
				addComponent(world, Sprite, eid)
				Sprite.texture[eid] = textureToIndex(Texture.Brick)

				addComponent(world, Tint, eid)
				switch (space) {
					case 1:
						Tint.color[eid] = 0xc73e3e
						break
					case 2:
						Tint.color[eid] = 0x80be1e
						break
					case 3:
						Tint.color[eid] = 0x1da7e2
						break
					case 4:
						Tint.color[eid] = 0xab1de2
						break
					case 5:
						Tint.color[eid] = 0xffcc00
						break
					case 6:
						Tint.color[eid] = 0xffffff
						break
					default:
						break
				}

				addComponent(world, Position, eid)
				Position.x[eid] = j * brickWidth + halfBrickWidth
				Position.y[eid] = i * brickHeight + halfBrickHeight
			}
		}
	}
}

export function createPaddle(
	config: IGameConfig,
	world: IECSWorld,
	textureToIndex: TextureToIndexFunc
) {
	return () => {
		const eid = addEntity(world)
		addComponent(world, Sprite, eid)
		Sprite.texture[eid] = textureToIndex(Texture.Paddle)

		addComponent(world, Position, eid)
		Position.x[eid] = config.world.width * 0.5
		Position.y[eid] = config.world.height - 150
	}
}

export function createBall(
	config: IGameConfig,
	world: IECSWorld,
	textureToIndex: TextureToIndexFunc
) {
	return () => {
		const eid = addEntity(world)
		addComponent(world, Ball, eid)
		addComponent(world, Sprite, eid)
		Sprite.texture[eid] = textureToIndex(Texture.Ball)

		addComponent(world, Position, eid)
		Position.x[eid] = config.world.width * 0.5
		Position.y[eid] =
			config.world.height -
			150 -
			config.paddle.height * 0.5 -
			config.ball.height * 0.5
	}
}
