import { injected } from 'brandi'
import {
	createBall,
	createBricks,
	createLauncher,
	createPaddle,
	createWalls,
	gameUpdateCreator,
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
		Tokens.TextureKeyToIndex
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
}
