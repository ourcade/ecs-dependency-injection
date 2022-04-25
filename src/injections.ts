import { injected } from 'brandi'
import { createBall, createBricks, createPaddle } from './game'

import * as Tokens from './tokens'

export function registerInjections() {
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
		Tokens.TextureKeyToIndex
	)
	injected(
		createBall,
		Tokens.GameConfig,
		Tokens.ECSWorld,
		Tokens.TextureKeyToIndex
	)
}
