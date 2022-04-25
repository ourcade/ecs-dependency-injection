import { createChildContainer } from '../container'

import { registerBindings } from './registerBindings'
import { registerInjections } from './registerInjections'

import { MainScene, CreateGame } from './tokens'

const container = createChildContainer()

registerInjections()
registerBindings(container)

const createGame = container.get(CreateGame)
const game = createGame('app')

game.scene.add(MainScene.__d, function () {
	return container.get(MainScene)
})

game.scene.start(MainScene.__d)
