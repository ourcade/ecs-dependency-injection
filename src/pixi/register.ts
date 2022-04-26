import { Container, injected } from 'brandi'

import * as Token from '../tokens'
import { createApp, createLoop } from './create'
import { renderPipeline } from './systems'
import { App, Loop, RenderPipeline } from './tokens'

export function registerBindings(container: Container) {
	container.bind(App).toInstance(createApp).inContainerScope()
	container.bind(RenderPipeline).toInstance(renderPipeline).inTransientScope()
	container.bind(Loop).toInstance(createLoop).inTransientScope()

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
	injected(createApp, Token.GameConfig, Token.AssetsData)
	injected(createLoop, Token.ECSWorld, Token.GameUpdate, RenderPipeline)
	injected(renderPipeline, Token.AssetsData, App, Token.IndexToTextureKey)
}
