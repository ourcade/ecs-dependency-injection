import { createContext } from 'react'
import { createChildContainer } from '../container'

import { registerBindings, registerInjections } from './register'

export const container = createChildContainer()
registerInjections()
registerBindings(container)

export const ContainerContext = createContext(container)
