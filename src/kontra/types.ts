import type {
	getGame,
	createLoadAssets,
	createRenderLoop,
	createUpdateLoop,
} from './create'

export type GameContext = ReturnType<typeof getGame>
export type LoadAssetsFunc = ReturnType<typeof createLoadAssets>
export type UpdateLoopFunc = ReturnType<typeof createUpdateLoop>
export type RenderLoopFunc = ReturnType<typeof createRenderLoop>
