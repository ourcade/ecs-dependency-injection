import { addOrbitControls, createLoop, createRenderLoop } from './create'

export type RenderLoopFunc = ReturnType<typeof createRenderLoop>
export type LoopFunc = ReturnType<typeof createLoop>
export type OrbitControls = ReturnType<typeof addOrbitControls>
