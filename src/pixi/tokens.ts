import { token } from 'brandi'
import { Application } from 'pixi.js'
import { ECSPipeline } from '../types'
import { LoopFunc } from './types'

export const App = token<Application>('pixi-app')
export const Loop = token<LoopFunc>('loop')
export const RenderPipeline = token<ECSPipeline>('render-pipeline')
