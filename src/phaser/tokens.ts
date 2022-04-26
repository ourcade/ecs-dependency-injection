import { token } from 'brandi'

import { PipelineCreator } from './types'

export const MainScene = token<Phaser.Scene>('main-scene')
export const PhaserPipeline = token<PipelineCreator>('phaser-pipeline')
