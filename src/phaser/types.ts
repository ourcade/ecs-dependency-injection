import type { ECSPipeline } from '../types'

export type PipelineCreator = (scene: Phaser.Scene) => ECSPipeline
