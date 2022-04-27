import { createContainer } from 'brandi'

import * as Token from './tokens'
import {
	gameUpdateCreator,
	createECSWorld,
	indexToTexture,
	createBricks,
	Texture,
	textureToIndex,
	createPaddle,
	createBall,
	createWalls,
	createLauncher,
	createPhysicsEngine,
	startGame,
} from './game'

import { registerInjections } from './injections'
import { KeyboardService, GlobalState } from './game/services'

export const container = createContainer()

export function createChildContainer() {
	return createContainer().extend(container)
}

registerInjections()

container.bind(Token.Root).toConstant(container)

container.bind(Token.GameConfig).toConstant({
	world: {
		width: 960,
		height: 540,
	},
	brick: {
		width: 64,
		height: 32,
	},
	ball: {
		width: 24,
		height: 24,
	},
	paddle: {
		width: 100,
		height: 24,
	},
})

// assets
container.bind(Token.AssetsData).toConstant({
	ball: {
		key: Texture.ball,
		path: 'assets/ball.png',
	},
	paddle: {
		key: Texture.paddle,
		path: 'assets/paddle.png',
	},
	brick: {
		key: Texture.brick,
		path: 'assets/brick.png',
	},
	logo: {
		phaser: {
			path: 'assets/logos/phaser.png',
		},
		pixi: {
			path: 'assets/logos/pixi.png',
		},
		react: {
			path: 'assets/logos/react.png',
		},
		three: {
			path: 'assets/logos/three.png',
		},
	},
})
container.bind(Token.IndexToTextureKey).toConstant(indexToTexture)
container.bind(Token.TextureKeyToIndex).toConstant(textureToIndex)

// input
container.bind(Token.Keyboard).toInstance(KeyboardService).inSingletonScope()

// game
// 0 - nothing, 1 - red, 2 - green, 3 - blue, 4 - purple, 5 - yellow, 6 - white
const layout = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 6, 3, 3, 3, 3, 0, 0, 0],
	[0, 0, 0, 2, 2, 2, 1, 6, 3, 5, 5, 5, 0, 0, 0],
	[0, 0, 0, 3, 3, 3, 1, 6, 3, 4, 4, 4, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 6, 3, 3, 3, 3, 0, 0, 0],
]
container.bind(Token.BricksLayout).toConstant(layout)
container.bind(Token.GlobalState).toInstance(GlobalState).inContainerScope()
container.bind(Token.ECSWorld).toInstance(createECSWorld).inContainerScope()
container
	.bind(Token.GameUpdate)
	.toInstance(gameUpdateCreator)
	.inTransientScope()
container.bind(Token.CreateBricks).toInstance(createBricks).inTransientScope()
container.bind(Token.CreatePaddle).toInstance(createPaddle).inTransientScope()
container.bind(Token.CreateBall).toInstance(createBall).inTransientScope()
container.bind(Token.CreateWalls).toInstance(createWalls).inTransientScope()
container
	.bind(Token.CreateLauncher)
	.toInstance(createLauncher)
	.inTransientScope()
container.bind(Token.StartGame).toInstance(startGame).inTransientScope()

// physics
container
	.bind(Token.PhysicsEngine)
	.toInstance(createPhysicsEngine)
	.inContainerScope()
