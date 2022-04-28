import { Container, injected } from 'brandi'

import * as Token from '../tokens'
import {
	addOrbitControls,
	createLoop,
	createMainCamera,
	createMainScene,
	createPerspectiveCamera,
	createRenderer,
	createRenderLoop,
} from './create'
import { renderPipeline } from './systems'
import {
	Camera,
	Loop,
	MainScene,
	Orbit,
	Renderer,
	RenderLoop,
	RenderPipeline,
} from './tokens'

export function registerBindings(container: Container) {
	container.bind(Renderer).toInstance(createRenderer).inContainerScope()
	container.bind(Loop).toInstance(createLoop).inContainerScope()
	container.bind(Camera).toInstance(createMainCamera).inContainerScope()
	container.bind(Camera).toInstance(createPerspectiveCamera).inContainerScope()
	container.bind(MainScene).toInstance(createMainScene).inContainerScope()
	container.bind(RenderLoop).toInstance(createRenderLoop).inContainerScope()
	container.bind(RenderPipeline).toInstance(renderPipeline).inTransientScope()
	container.bind(Orbit).toInstance(addOrbitControls).inTransientScope()

	// const layout = [
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 1, 1, 1, 1, 1, 0, 3, 3, 3, 3, 3, 0, 0],
	// 	[0, 0, 0, 1, 1, 6, 6, 6, 6, 6, 3, 3, 0, 0, 0],
	// 	[0, 0, 0, 0, 1, 1, 6, 6, 6, 3, 3, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 1, 1, 6, 3, 3, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 1, 6, 3, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0],
	// ]
	// container.bind(Token.BricksLayout).toConstant(layout)
}

export function registerInjections() {
	injected(createRenderer, Token.GameConfig)
	injected(createMainScene, Token.AssetsData)
	injected(createLoop, Token.ECSWorld, Token.GameUpdate, RenderPipeline)
	injected(createRenderLoop, MainScene, Camera, Renderer)
	injected(
		renderPipeline,
		Token.GameConfig,
		Token.AssetsData,
		MainScene,
		Token.IndexToTextureKey,
		Camera,
		Renderer
	)
	injected(addOrbitControls, Token.ECSWorld)
}
