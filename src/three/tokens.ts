import { token } from 'brandi'
import { ECSPipeline } from '../types'
import { LoopFunc, OrbitControls, RenderLoopFunc } from './types'

export const Renderer = token<THREE.WebGLRenderer>('webgl-renderer')
export const Loop = token<LoopFunc>('loop-func')
export const RenderLoop = token<RenderLoopFunc>('render-loop-func')
export const Camera = token<THREE.Camera>('camera')
export const MainScene = token<THREE.Scene>('main-scene')
export const RenderPipeline = token<ECSPipeline>('render-pipeline')
export const Orbit = token<OrbitControls>('orbit-controls')
