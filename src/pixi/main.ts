import { createChildContainer } from '../container'

import { registerBindings } from './registerBindings'

const container = createChildContainer()
registerBindings(container)
