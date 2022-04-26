import { injected } from 'brandi'
import type { Container } from 'brandi'
import { MainScene } from './MainScene'
import { pipelineCreator } from './systems'

import * as Tokens from '../tokens'

import { MainScene as MainSceneToken, PhaserPipeline } from './tokens'

export function registerBindings(container: Container) {
	container.bind(MainSceneToken).toInstance(MainScene).inTransientScope()
	container.bind(PhaserPipeline).toInstance(pipelineCreator).inTransientScope()
}

export function registerInjections() {
	injected(
		MainScene,
		Tokens.AssetsData,
		Tokens.ECSWorld,
		Tokens.GameUpdate,
		PhaserPipeline,
		Tokens.StartGame
	)
	injected(pipelineCreator, Tokens.IndexToTextureKey)
}
