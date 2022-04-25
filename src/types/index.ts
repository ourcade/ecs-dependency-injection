import type { IWorld } from 'bitecs'
import {
	indexToTexture,
	createBricks,
	TextureKey,
	textureToIndex,
	createBall,
	createPaddle,
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

interface AssetDefinition {
	key: TextureKey
	path: string
}

export interface IAssetsData {
	ball: AssetDefinition
	paddle: AssetDefinition
	brick: AssetDefinition
}

export type IndexToTextureFunc = typeof indexToTexture
export type TextureToIndexFunc = typeof textureToIndex

export type CreateBricksFunc = ReturnType<typeof createBricks>
export type CreatePaddleFunc = ReturnType<typeof createPaddle>
export type CreateBallFunc = ReturnType<typeof createBall>
