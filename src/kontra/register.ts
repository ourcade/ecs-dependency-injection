import { Container, injected } from 'brandi'

import * as Token from '../tokens'
import {
	getGame,
	createLoadAssets,
	createLoop,
	createRenderLoop,
	createUpdateLoop,
} from './create'
import { renderPipeline, updatePipeline } from './systems'
import {
	Game,
	LoadAssets,
	Loop,
	RenderLoop,
	RenderPipeline,
	UpdateLoop,
	UpdatePipeline,
} from './tokens'

export function registerBindings(container: Container) {
	container.bind(Game).toInstance(getGame).inContainerScope()
	container.bind(LoadAssets).toInstance(createLoadAssets).inContainerScope()
	container.bind(Loop).toInstance(createLoop).inContainerScope()
	container.bind(RenderLoop).toInstance(createRenderLoop).inContainerScope()
	container.bind(UpdateLoop).toInstance(createUpdateLoop).inContainerScope()
	container.bind(UpdatePipeline).toInstance(updatePipeline).inTransientScope()
	container.bind(RenderPipeline).toInstance(renderPipeline).inTransientScope()

	// const layout = [
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 1, 1, 1, 1, 1, 0, 3, 3, 3, 3, 3, 0, 0],
	// 	[0, 0, 0, 2, 2, 2, 1, 0, 3, 5, 5, 5, 0, 0, 0],
	// 	[0, 0, 0, 0, 3, 3, 1, 6, 3, 4, 4, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 1, 1, 6, 3, 3, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 1, 6, 3, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0],
	// ]
	// container.bind(Token.BricksLayout).toConstant(layout)
}

export function registerInjections() {
	injected(getGame, Token.GameConfig)
	injected(createLoadAssets, Token.AssetsData)
	injected(createLoop, Game, UpdateLoop, RenderLoop)
	injected(createUpdateLoop, Token.ECSWorld, Token.GameUpdate, UpdatePipeline)
	injected(createRenderLoop, Token.ECSWorld, RenderPipeline)
	injected(updatePipeline, Token.AssetsData, Token.IndexToTextureKey)
	injected(renderPipeline, Game)
}
