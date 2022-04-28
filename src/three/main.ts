import { createChildContainer } from '../container'
import { createGameLoop } from '../game/services'
import { StartGame } from '../tokens'

import { registerBindings, registerInjections } from './register'
import { Loop, Orbit, Renderer, RenderLoop } from './tokens'

const container = createChildContainer()

registerInjections()
registerBindings(container)

const renderer = container.get(Renderer)
document.getElementById('app')!.appendChild(renderer.domElement)

const loop = container.get(Loop)
const renderLoop = container.get(RenderLoop)
const startGame = container.get(StartGame)

const startLoop = createGameLoop(loop, renderLoop)

startGame()

const addOrbitControls = container.get(Orbit)
addOrbitControls()

startLoop()
