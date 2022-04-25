import { injected } from 'brandi'

import * as Tokens from '../tokens'
import { createGame } from './createGame'

import { MainScene } from './MainScene'
import { startGame } from './startGame'
import { pipelineCreator } from './systems'
import { PhaserPipeline, StartGame } from './tokens'

export function registerInjections() {
	injected(
		MainScene,
		Tokens.AssetsData,
		Tokens.ECSWorld,
		Tokens.CorePipe,
		PhaserPipeline,
		StartGame
	)
	injected(pipelineCreator, Tokens.IndexToTextureKey)
	injected(createGame, Tokens.GameConfig)
	injected(
		startGame,
		Tokens.CreateBricks,
		Tokens.CreatePaddle,
		Tokens.CreateBall
	)
}
