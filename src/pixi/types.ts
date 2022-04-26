import type { createLoop } from './create'
import { renderPipeline } from './systems'

export type LoopFunc = ReturnType<typeof createLoop>
export type RenderPipeline = ReturnType<typeof renderPipeline>
