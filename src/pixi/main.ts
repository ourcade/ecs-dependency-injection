import { createChildContainer } from '../container'
import { StartGame } from '../tokens'

import { registerBindings, registerInjections } from './register'
import { App, Loop } from './tokens'

const container = createChildContainer()

registerInjections()
registerBindings(container)

const app = container.get(App)
const loop = container.get(Loop)
const startGame = container.get(StartGame)

app.ticker.add((dt) => {
	loop(dt)
})

startGame()

document.getElementById('app')?.appendChild(app.view)
