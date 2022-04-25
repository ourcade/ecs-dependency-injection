import type { ECSPipeline } from '../types'
import type { createGame } from './createGame'
import type { startGame } from './startGame'

export type CreateGameFunc = ReturnType<typeof createGame>
export type PipelineCreator = (scene: Phaser.Scene) => ECSPipeline
export type StartGameFunc = ReturnType<typeof startGame>
