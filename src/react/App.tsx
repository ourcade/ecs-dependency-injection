import { useContext, useState, useEffect } from 'react'
import { AssetsData, GameConfig } from '../tokens'
import { ContainerContext } from './container'
import { observer } from 'mobx-react-lite'
import { ECSWorld, GameUpdate, StartGame } from '../tokens'
import { stateStore } from './store'
import { RenderPipeline } from './tokens'
import { Sprite } from './Sprite'
import { createGameLoop } from '../game/services'

export const App = observer(function () {
	const container = useContext(ContainerContext)
	const [config] = useState(container.get(GameConfig))
	const [assetsData] = useState(container.get(AssetsData))

	useEffect(() => {
		const startGame = container.get(StartGame)
		const world = container.get(ECSWorld)
		const gameUpdate = container.get(GameUpdate)
		const renderPipeline = container.get(RenderPipeline)

		const startLoop = createGameLoop((dt) => {
			world.dt = dt
			gameUpdate(world)
			renderPipeline(world)
		})

		startGame()
		startLoop()
	}, [])

	return (
		<div
			style={{
				width: config.world.width,
				height: config.world.height,
				background: 'black',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<Sprite
				x={config.world.width - 168}
				y={config.world.height - 300}
				opacity={0.3}
				path={assetsData.logo.react.path}
				eid={-1}
			/>
			{stateStore.spriteComponentsList.map((props) => (
				<Sprite key={`${props.eid}`} {...props} />
			))}
		</div>
	)
})
