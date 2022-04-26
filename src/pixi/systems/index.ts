import * as PIXI from 'pixi.js'
import { defineQuery, enterQuery, exitQuery, IWorld, pipe } from 'bitecs'
import { Position, Sprite, Tint } from '../../game'
import { IAssetsData, IndexToTextureFunc } from '../../types'

const sprites: PIXI.Sprite[] = []

export function createSprite(
	assets: IAssetsData,
	app: PIXI.Application,
	indexToTexture: IndexToTextureFunc
) {
	const query = defineQuery([Sprite])
	const enter = enterQuery(query)
	const exit = exitQuery(query)

	return (world: IWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const texId = Sprite.texture[eid]
			const key = indexToTexture(texId)
			const path = assets[key].path
			const sprite = PIXI.Sprite.from(path)
			sprite.anchor.set(0.5, 0.5)
			app.stage.addChild(sprite)
			sprites[eid] = sprite
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const sprite = sprites[eid]
			sprite.destroy({
				children: true,
			})
		}
		return world
	}
}

function positionSprite() {
	const query = defineQuery([Sprite, Position])

	return (world: IWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const sprite = sprites[eid]
			if (!sprite) {
				continue
			}

			sprite.x = Position.x[eid]
			sprite.y = Position.y[eid]
		}

		return world
	}
}

function tintSprite() {
	const query = defineQuery([Sprite, Tint])

	return (world: IWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const sprite = sprites[eid]
			if (!sprite) {
				continue
			}

			const tint = Tint.color[eid]
			sprite.tint = tint
		}

		return world
	}
}

export function renderPipeline(
	assets: IAssetsData,
	app: PIXI.Application,
	indexToTexture: IndexToTextureFunc
) {
	return pipe(
		createSprite(assets, app, indexToTexture),
		positionSprite(),
		tintSprite()
	)
}
