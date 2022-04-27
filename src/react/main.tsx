import { createRoot } from 'react-dom/client'

import { App } from './App'
import { ContainerContext, container } from './container'

const root = createRoot(document.getElementById('app')!)
root.render(
	<ContainerContext.Provider value={container}>
		<App />
	</ContainerContext.Provider>
)
