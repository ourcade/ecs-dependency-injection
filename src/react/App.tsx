import { useContext, useState, useEffect } from 'react'
import { GameConfig } from '../tokens'
import { ContainerContext } from './container'
import { observer } from 'mobx-react-lite'
import { ECSWorld, GameUpdate, StartGame } from '../tokens'
import { stateStore } from './store'
import { RenderPipeline } from './tokens'
import { Sprite } from './Sprite'

export const App = observer(function () {
	const container = useContext(ContainerContext)
	const [config] = useState(container.get(GameConfig))

	useEffect(() => {
		const startGame = container.get(StartGame)
		const world = container.get(ECSWorld)
		const gameUpdate = container.get(GameUpdate)
		const renderPipeline = container.get(RenderPipeline)

		let start = performance.now()
		const loop = (timestamp: number) => {
			const dt = timestamp - start
			world.dt = dt
			gameUpdate(world)
			renderPipeline(world)

			requestAnimationFrame(loop)
		}

		startGame()
		requestAnimationFrame(loop)
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
				path="assets/logos/react.png"
				eid={-1}
			/>
			{stateStore.spriteComponentsList.map((props) => (
				<Sprite key={`${props.eid}`} {...props} />
			))}
		</div>
	)
})
