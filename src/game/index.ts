import { addComponent, addEntity, createWorld } from 'bitecs'
import Matter from 'matter-js'

import type {
	IECSWorld,
	IGameConfig,
	IGlobalState,
	TextureToIndexFunc,
	CreateBallFunc,
	CreateBricksFunc,
	CreateLauncherFunc,
	CreatePaddleFunc,
	CreateWallsFunc,
} from '../types'
import {
	Ball,
	Bouncy,
	BoxCollider,
	Brick,
	CircleCollider,
	FixedRotation,
	Follow,
	Friction,
	Launcher,
	MovementInput,
	PhysicsBody,
	Position,
	Sprite,
	Static,
	Tint,
} from './components'
import { Texture } from './consts'

export * from './components'
export * from './consts'
export * from './systems'

export function createECSWorld(): IECSWorld {
	return createWorld({ dt: 0 })
}

export function createPhysicsEngine() {
	return Matter.Engine.create({
		gravity: { x: 0, y: 0 },
	})
}

export function createBricks(
	config: IGameConfig,
	world: IECSWorld,
	textureToIndex: TextureToIndexFunc,
	layout: number[][]
) {
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
				addComponent(world, Brick, eid)
				addComponent(world, PhysicsBody, eid)
				addComponent(world, BoxCollider, eid)
				BoxCollider.width[eid] = config.brick.width
				BoxCollider.height[eid] = config.brick.height

				addComponent(world, Static, eid)
				addComponent(world, Friction, eid)
				addComponent(world, Bouncy, eid)

				addComponent(world, Sprite, eid)
				Sprite.texture[eid] = textureToIndex(Texture.brick)

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
	textureToIndex: TextureToIndexFunc,
	globalState: IGlobalState
) {
	return () => {
		const eid = addEntity(world)
		addComponent(world, Sprite, eid)
		Sprite.texture[eid] = textureToIndex(Texture.paddle)

		addComponent(world, PhysicsBody, eid)
		addComponent(world, BoxCollider, eid)
		BoxCollider.width[eid] = config.paddle.width
		BoxCollider.height[eid] = config.paddle.height
		BoxCollider.chamferRadius[eid] = 10

		addComponent(world, Static, eid)
		addComponent(world, Friction, eid)
		addComponent(world, Bouncy, eid)

		addComponent(world, Position, eid)
		Position.x[eid] = config.world.width * 0.5
		Position.y[eid] = config.world.height - 50

		addComponent(world, MovementInput, eid)

		globalState.setPaddleEntityId(eid)
	}
}

export function createBall(
	config: IGameConfig,
	world: IECSWorld,
	textureToIndex: TextureToIndexFunc,
	globalState: IGlobalState
) {
	return () => {
		const eid = addEntity(world)
		addComponent(world, Ball, eid)
		Ball.startX[eid] = config.world.width * 0.5
		Ball.startY[eid] =
			config.world.height -
			50 -
			config.paddle.height * 0.5 -
			config.ball.height * 0.5
		addComponent(world, Sprite, eid)
		Sprite.texture[eid] = textureToIndex(Texture.ball)

		addComponent(world, Position, eid)
		Position.x[eid] = Ball.startX[eid]
		Position.y[eid] = Ball.startY[eid]

		addComponent(world, PhysicsBody, eid)
		addComponent(world, CircleCollider, eid)
		CircleCollider.radius[eid] = 12

		addComponent(world, Friction, eid)
		addComponent(world, Bouncy, eid)
		addComponent(world, FixedRotation, eid)

		const paddleEid = globalState.paddleEntityId
		if (paddleEid >= 0) {
			addComponent(world, Follow, eid)
			Follow.entityId[eid] = paddleEid
			Follow.offsetX[eid] = 0
			Follow.offsetY[eid] = -config.ball.height * 0.5
		}

		globalState.setBallEntityId(eid)
	}
}

export function createWalls(config: IGameConfig, world: IECSWorld) {
	return () => {
		const leftWall = addEntity(world)
		addComponent(world, PhysicsBody, leftWall)
		addComponent(world, BoxCollider, leftWall)
		BoxCollider.width[leftWall] = 100
		BoxCollider.height[leftWall] = config.world.height

		addComponent(world, Static, leftWall)
		addComponent(world, Friction, leftWall)
		addComponent(world, Bouncy, leftWall)
		addComponent(world, Position, leftWall)
		Position.x[leftWall] = -50
		Position.y[leftWall] = config.world.height * 0.5

		const topWall = addEntity(world)
		addComponent(world, PhysicsBody, topWall)
		addComponent(world, BoxCollider, topWall)
		BoxCollider.width[topWall] = config.world.width
		BoxCollider.height[topWall] = 100

		addComponent(world, Static, topWall)
		addComponent(world, Friction, topWall)
		addComponent(world, Bouncy, topWall)
		addComponent(world, Position, topWall)
		Position.x[topWall] = config.world.width * 0.5
		Position.y[topWall] = -50

		const rightWall = addEntity(world)
		addComponent(world, PhysicsBody, rightWall)
		addComponent(world, BoxCollider, rightWall)
		BoxCollider.width[rightWall] = 100
		BoxCollider.height[rightWall] = config.world.height

		addComponent(world, Static, rightWall)
		addComponent(world, Friction, rightWall)
		addComponent(world, Bouncy, rightWall)
		addComponent(world, Position, rightWall)
		Position.x[rightWall] = config.world.width + 50
		Position.y[rightWall] = config.world.height * 0.5
	}
}

export function createLauncher(world: IECSWorld, globalState: IGlobalState) {
	return () => {
		const eid = addEntity(world)
		addComponent(world, Launcher, eid)

		globalState.setLauncherEntityId(eid)
	}
}

export function startGame(
	createBricks: CreateBricksFunc,
	createPaddle: CreatePaddleFunc,
	createBall: CreateBallFunc,
	createWalls: CreateWallsFunc,
	createLauncher: CreateLauncherFunc
) {
	return () => {
		createBricks()
		createPaddle()
		createBall()
		createWalls()
		createLauncher()
	}
}
