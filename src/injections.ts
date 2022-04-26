import { injected } from 'brandi'
import {
	createBall,
	createBricks,
	createLauncher,
	createPaddle,
	createWalls,
	gameUpdateCreator,
	startGame,
} from './game'

import * as Tokens from './tokens'

export function registerInjections() {
	injected(
		gameUpdateCreator,
		Tokens.GameConfig,
		Tokens.GlobalState,
		Tokens.Keyboard,
		Tokens.PhysicsEngine
	)
	injected(
		createBricks,
		Tokens.GameConfig,
		Tokens.ECSWorld,
		Tokens.TextureKeyToIndex,
		Tokens.BricksLayout
	)
	injected(
		createPaddle,
		Tokens.GameConfig,
		Tokens.ECSWorld,
		Tokens.TextureKeyToIndex,
		Tokens.GlobalState
	)
	injected(
		createBall,
		Tokens.GameConfig,
		Tokens.ECSWorld,
		Tokens.TextureKeyToIndex,
		Tokens.GlobalState
	)
	injected(createWalls, Tokens.GameConfig, Tokens.ECSWorld)
	injected(createLauncher, Tokens.ECSWorld, Tokens.GlobalState)
	injected(
		startGame,
		Tokens.CreateBricks,
		Tokens.CreatePaddle,
		Tokens.CreateBall,
		Tokens.CreateWalls,
		Tokens.CreateLauncher
	)
}
