import { token } from 'brandi'
import { ECSPipeline } from '../types'

export const RenderPipeline = token<ECSPipeline>('render-pipeline')
