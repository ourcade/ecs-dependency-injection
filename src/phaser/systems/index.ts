import { pipe, defineQuery, enterQuery, exitQuery } from 'bitecs'

import type { IWorld } from 'bitecs'

import { Position, Sprite, Tint } from '../../game'

import type { IndexToTextureFunc } from '../../types'

const sprites = [] as Phaser.GameObjects.Sprite[]

function createSprite(scene: Phaser.Scene, indexToTexture: IndexToTextureFunc) {
	const query = defineQuery([Sprite])
	const enter = enterQuery(query)
	const exit = exitQuery(query)

	return (world: IWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const texId = Sprite.texture[eid]
			const key = indexToTexture(texId)
			sprites[eid] = scene.add.sprite(0, 0, key)
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const sprite = sprites[eid]
			sprite.destroy()
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

export function pipelineCreator(indexToTexture: IndexToTextureFunc) {
	return (scene: Phaser.Scene) =>
		pipe(createSprite(scene, indexToTexture), positionSprite(), tintSprite())
}
