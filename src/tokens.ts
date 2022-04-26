import { token } from 'brandi'
import type { Container } from 'brandi'

import {
	IECSWorld,
	IGameConfig,
	IndexToTextureFunc,
	CreateBricksFunc,
	TextureToIndexFunc,
	CreateBallFunc,
	CreatePaddleFunc,
	CreateWallsFunc,
	GameUpdateFunc,
	IKeyboardService,
	CreateLauncherFunc,
	IGlobalState,
	StartGameFunc,
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

// input
export const Keyboard = token<IKeyboardService>('keyboard-service')

// game
export const BricksLayout = token<number[][]>('bricks-layout')
export const GlobalState = token<IGlobalState>('global-state')
export const GameConfig = token<IGameConfig>('game-config')
export const ECSWorld = token<IECSWorld>('ecs-world')
export const GameUpdate = token<GameUpdateFunc>('game-update')
export const CreateBricks = token<CreateBricksFunc>('create-bricks-func')
export const CreatePaddle = token<CreatePaddleFunc>('create-paddle-func')
export const CreateBall = token<CreateBallFunc>('create-ball-func')
export const CreateWalls = token<CreateWallsFunc>('create-walls-func')
export const CreateLauncher = token<CreateLauncherFunc>('create-launcher-func')
export const StartGame = token<StartGameFunc>('start-game-func')

export const PhysicsEngine = token<Matter.Engine>('physics engine')
