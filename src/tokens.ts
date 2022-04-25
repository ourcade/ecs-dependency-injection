import { token } from 'brandi'
import type { Container } from 'brandi'

import type {
	ECSPipeline,
	IECSWorld,
	IGameConfig,
	IndexToTextureFunc,
	CreateBricksFunc,
	TextureToIndexFunc,
	CreateBallFunc,
	CreatePaddleFunc,
} from './types'

import type { IAssetsData } from './types'

export const Root = token<Container>('root-container')

// assets
export const AssetsData = token<IAssetsData>('assets-data')
export const IndexToTextureKey = token<IndexToTextureFunc>(
	'index-to-texture-key'
)
export const TextureKeyToIndex = token<TextureToIndexFunc>(
	'texture-key-to-index'
)

// game
export const GameConfig = token<IGameConfig>('game-config')
export const ECSWorld = token<IECSWorld>('ecs-world')
export const CorePipe = token<ECSPipeline>('core-pipe')
export const CreateBricks = token<CreateBricksFunc>('create-bricks-func')
export const CreatePaddle = token<CreatePaddleFunc>('create-paddle-func')
export const CreateBall = token<CreateBallFunc>('create-ball-func')
