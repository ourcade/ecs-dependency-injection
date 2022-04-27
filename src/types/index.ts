import type { IWorld } from 'bitecs'
import type {
	indexToTexture,
	createBricks,
	TextureKey,
	textureToIndex,
	createBall,
	createPaddle,
	createWalls,
	gameUpdateCreator,
	createLauncher,
	startGame,
} from '../game'

export interface ISize {
	width: number
	height: number
}
export interface IGameConfig {
	world: ISize
	brick: ISize
	ball: ISize
	paddle: ISize
}

export interface IECSWorld extends IWorld {
	dt: number
}
export type ECSPipeline = (...input: unknown[]) => unknown
export type GameUpdateFunc = ReturnType<typeof gameUpdateCreator>
export type GameUpdateCreator = (world: IECSWorld) => GameUpdateFunc

interface AssetDefinition {
	key: TextureKey
	path: string
}

export interface IAssetsData {
	ball: AssetDefinition
	paddle: AssetDefinition
	brick: AssetDefinition
	logo: {
		phaser: Omit<AssetDefinition, 'key'>
		pixi: Omit<AssetDefinition, 'key'>
		react: Omit<AssetDefinition, 'key'>
		three: Omit<AssetDefinition, 'key'>
	}
}

export type IndexToTextureFunc = typeof indexToTexture
export type TextureToIndexFunc = typeof textureToIndex

export type CreateBricksFunc = ReturnType<typeof createBricks>
export type CreatePaddleFunc = ReturnType<typeof createPaddle>
export type CreateBallFunc = ReturnType<typeof createBall>
export type CreateWallsFunc = ReturnType<typeof createWalls>
export type CreateLauncherFunc = ReturnType<typeof createLauncher>
export type StartGameFunc = ReturnType<typeof startGame>

export interface IKeyboardService {
	readonly left: boolean
	readonly right: boolean
	readonly space: boolean
}

export interface IGlobalState {
	readonly launcherEntityId: number
	readonly paddleEntityId: number
	readonly ballEntityId: number

	setLauncherEntityId(eid: number): void
	setPaddleEntityId(eid: number): void
	setBallEntityId(eid: number): void
}
