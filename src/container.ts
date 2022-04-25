import { createContainer } from 'brandi'

import * as Token from './tokens'
import {
	createCorePipeline,
	createECSWorld,
	indexToTexture,
	createBricks,
	Texture,
	textureToIndex,
	createPaddle,
	createBall,
} from './game'

import { registerInjections } from './injections'

export const container = createContainer()

export function createChildContainer() {
	return createContainer().extend(container)
}

registerInjections()

container.bind(Token.Root).toConstant(container)

container.bind(Token.GameConfig).toConstant({
	world: {
		width: 1920,
		height: 1080,
	},
	brick: {
		width: 128,
		height: 64,
	},
	ball: {
		width: 48,
		height: 48,
	},
	paddle: {
		width: 200,
		height: 48,
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

// game
container.bind(Token.ECSWorld).toInstance(createECSWorld).inContainerScope()
container.bind(Token.CorePipe).toInstance(createCorePipeline).inTransientScope()
container.bind(Token.CreateBricks).toInstance(createBricks).inTransientScope()
container.bind(Token.CreatePaddle).toInstance(createPaddle).inTransientScope()
container.bind(Token.CreateBall).toInstance(createBall).inTransientScope()
