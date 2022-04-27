import { createChildContainer } from '../container'
import { StartGame } from '../tokens'

import { registerBindings, registerInjections } from './register'
import { Loop, Orbit, Renderer } from './tokens'

const container = createChildContainer()

registerInjections()
registerBindings(container)

const renderer = container.get(Renderer)
document.getElementById('app')!.appendChild(renderer.domElement)

const loop = container.get(Loop)
const startGame = container.get(StartGame)

const start = performance.now()
function step(timestamp: number) {
	const dt = timestamp - start

	loop(dt)

	requestAnimationFrame(step)
}

startGame()

const addOrbitControls = container.get(Orbit)
addOrbitControls()

step(start)
