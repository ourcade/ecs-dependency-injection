import { injected } from 'brandi'
import type { Container } from 'brandi'

import * as Token from '../tokens'
import { renderPipeline } from './systems'
import { RenderPipeline } from './tokens'

export function registerBindings(container: Container) {
	container.bind(RenderPipeline).toInstance(renderPipeline).inTransientScope()

	// const layout = [
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 3, 3, 3, 0, 3, 3, 3, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0],
	// 	[0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
	// 	[0, 0, 0, 3, 1, 2, 6, 3, 6, 4, 5, 3, 0, 0, 0],
	// 	[0, 0, 0, 3, 1, 2, 6, 3, 6, 4, 5, 3, 0, 0, 0],
	// 	[0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
	// 	[0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 3, 3, 3, 0, 3, 3, 3, 0, 0, 0, 0],
	// ]
	// container.bind(Token.BricksLayout).toConstant(layout)
}

export function registerInjections() {
	injected(renderPipeline, Token.AssetsData, Token.IndexToTextureKey)
}
