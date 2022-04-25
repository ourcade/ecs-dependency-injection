import { token } from 'brandi'

import { CreateGameFunc, PipelineCreator, StartGameFunc } from './types'

export const CreateGame = token<CreateGameFunc>('create-game-func')
export const MainScene = token<Phaser.Scene>('main-scene')
export const PhaserPipeline = token<PipelineCreator>('phaser-pipeline')
export const StartGame = token<StartGameFunc>('start-game-func')
