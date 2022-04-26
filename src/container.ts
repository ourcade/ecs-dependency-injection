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
		key: Texture.Ball,
		path: 'assets/ball.png',
	},
	paddle: {
		key: Texture.Paddle,
		path: 'assets/paddle.png',
	},
	brick: {
		key: Texture.Brick,
		path: 'assets/brick.png',
	},
})
container.bind(Token.IndexToTextureKey).toConstant(indexToTexture)
container.bind(Token.TextureKeyToIndex).toConstant(textureToIndex)

// input
container.bind(Token.Keyboard).toInstance(KeyboardService).inSingletonScope()

// game
container.bind(Token.GlobalState).toInstance(GlobalState).inContainerScope()
container.bind(Token.ECSWorld).toInstance(createECSWorld).inContainerScope()
container
	.bind(Token.GameUpdateCreator)
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

// physics
container
	.bind(Token.PhysicsEngine)
	.toInstance(createPhysicsEngine)
	.inContainerScope()
