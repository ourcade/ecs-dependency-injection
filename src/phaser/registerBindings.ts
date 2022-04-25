import type { Container } from 'brandi'
import { MainScene } from './MainScene'
import { startGame } from './startGame'
import { pipelineCreator } from './systems'
import { createGame } from './createGame'

import {
	CreateGame,
	MainScene as MainSceneToken,
	PhaserPipeline,
	StartGame,
} from './tokens'

export function registerBindings(container: Container) {
	container.bind(CreateGame).toInstance(createGame).inTransientScope()
	container.bind(MainSceneToken).toInstance(MainScene).inTransientScope()
	container.bind(PhaserPipeline).toInstance(pipelineCreator).inTransientScope()
	container.bind(StartGame).toInstance(startGame).inTransientScope()
}
