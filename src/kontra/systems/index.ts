import { Sprite, imageAssets } from 'kontra'
import { defineQuery, enterQuery, exitQuery, IWorld, pipe } from 'bitecs'
import { Position, Sprite as SpriteComp, Tint } from '../../game'
import { IAssetsData, IndexToTextureFunc } from '../../types'
import { GameContext } from '../types'

const sprites: Sprite[] = []
const tintSprites: Sprite[] = []

function createSprite(assets: IAssetsData, indexToTexture: IndexToTextureFunc) {
	const query = defineQuery([SpriteComp])
	const enter = enterQuery(query)
	const exit = exitQuery(query)

	return (world: IWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const texId = SpriteComp.texture[eid]
			const key = indexToTexture(texId)
			const path = assets[key].path
			const sprite = Sprite({
				image: imageAssets[path],
				anchor: { x: 0.5, y: 0.5 },
			})

			sprites[eid] = sprite
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			delete sprites[eid]
		}
		return world
	}
}

function positionSprite() {
	const query = defineQuery([SpriteComp, Position])

	return (world: IWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const sprite = sprites[eid]
			if (!sprite) {
				continue
			}

			sprite.x = Position.x[eid]
			sprite.y = Position.y[eid]

			const tintSprite = tintSprites[eid]
			if (!tintSprite) {
				continue
			}
			tintSprite.x = sprite.x
			tintSprite.y = sprite.y
		}

		return world
	}
}

function tintSprite() {
	const query = defineQuery([SpriteComp, Tint])

	return (world: IWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const sprite = sprites[eid]
			if (!sprite) {
				continue
			}

			const tint = Tint.color[eid]
			const tintSprite = Sprite({
				x: sprite.x,
				y: sprite.y,
				image: sprite.image,
				anchor: { ...sprite.anchor },
				opacity: 1,
			})
			tintSprites[eid] = tintSprite
			sprite.color = `#${tint.toString(16)}`
		}

		return world
	}
}

function renderSprites() {
	const query = defineQuery([SpriteComp])

	return (world: IWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const sprite = sprites[eid]
			if (!sprite) {
				continue
			}
			sprite.render()
		}
		return world
	}
}

function renderTints(game: GameContext) {
	const query = defineQuery([SpriteComp])

	return (world: IWorld) => {
		const entities = query(world)

		const prev = game.context.globalCompositeOperation
		game.context.globalCompositeOperation = 'multiply'
		for (const eid of entities) {
			const tintSprite = tintSprites[eid]
			if (!tintSprite) {
				continue
			}

			tintSprite.render()
		}
		game.context.globalCompositeOperation = prev

		return world
	}
}

export function updatePipeline(
	assets: IAssetsData,
	indexToTexture: IndexToTextureFunc
) {
	return pipe(
		createSprite(assets, indexToTexture),
		tintSprite(),
		positionSprite()
	)
}

export function renderPipeline(game: GameContext) {
	return pipe(renderSprites(), renderTints(game))
}
