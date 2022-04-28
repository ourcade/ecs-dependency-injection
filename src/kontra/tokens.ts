import { token } from 'brandi'
import type { GameLoop } from 'kontra'
import { ECSPipeline } from '../types'
import {
	GameContext,
	LoadAssetsFunc,
	RenderLoopFunc,
	UpdateLoopFunc,
} from './types'

export const Game = token<GameContext>('canvas')
export const LoadAssets = token<LoadAssetsFunc>('load-assets')
export const Loop = token<GameLoop>('game-loop')
export const UpdateLoop = token<UpdateLoopFunc>('update-loop')
export const RenderLoop = token<RenderLoopFunc>('render-loop')
export const UpdatePipeline = token<ECSPipeline>('update-pipeline')
export const RenderPipeline = token<ECSPipeline>('render-pipeline')
