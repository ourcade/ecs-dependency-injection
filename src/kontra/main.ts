import { createChildContainer } from '../container'
import { StartGame } from '../tokens'

import { registerBindings, registerInjections } from './register'
import { LoadAssets, Loop } from './tokens'

const container = createChildContainer()

registerInjections()
registerBindings(container)

const loadAssets = container.get(LoadAssets)
const loop = container.get(Loop)
const startGame = container.get(StartGame)

loadAssets().then(() => {
	startGame()
	loop.start()
})
