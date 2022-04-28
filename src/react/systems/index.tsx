import { defineQuery, enterQuery, exitQuery, IWorld, pipe } from 'bitecs'

import { Position, Sprite, Tint } from '../../game/components'
import { IAssetsData, IGameConfig, IndexToTextureFunc } from '../../types'
import { stateStore } from '../store'

function createSprite(assets: IAssetsData, indexToTexture: IndexToTextureFunc) {
	const query = defineQuery([Sprite, Position])
	const enter = enterQuery(query)
	const exit = exitQuery(query)

	return (world: IWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const texId = Sprite.texture[eid]
			const key = indexToTexture(texId)
			const path = assets[key].path
			const s = {
				eid,
				path,
				x: Position.x[eid],
				y: Position.y[eid],
			}
			stateStore.addSprite(eid, s)
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			stateStore.removeSprite(eid)
		}
		return world
	}
}

function positionSprite(
	config: IGameConfig,
	indexToTexture: IndexToTextureFunc
) {
	const query = defineQuery([Sprite, Position])

	return (world: IWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const ref = stateStore.getSpriteRef(eid)
			if (!ref) {
				continue
			}

			if (!ref.current) {
				continue
			}

			const texId = Sprite.texture[eid]
			const key = indexToTexture(texId)
			const conf = config[key]

			ref.current.style.left = `${Position.x[eid]}px`
			ref.current.style.top = `${Position.y[eid] - conf.height * 0.5}px`
		}

		return world
	}
}

function tintSprite() {
	const query = defineQuery([Sprite, Tint])

	return (world: IWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const ref = stateStore.getSpriteRef(eid)
			if (!ref) {
				continue
			}

			if (!ref.current) {
				continue
			}

			const tint = Tint.color[eid]
			const firstChild = ref.current.firstChild as HTMLDivElement
			firstChild.style.background = `#${tint.toString(16)}`

			const imgElement = firstChild.firstChild as HTMLImageElement
			imgElement.style.mixBlendMode = 'multiply'
		}

		return world
	}
}

export function renderPipeline(
	assets: IAssetsData,
	config: IGameConfig,
	indexToTexture: IndexToTextureFunc
) {
	return pipe(
		createSprite(assets, indexToTexture),
		tintSprite(),
		positionSprite(config, indexToTexture)
	)
}
