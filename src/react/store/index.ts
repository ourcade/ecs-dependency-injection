import { makeAutoObservable, ObservableMap } from 'mobx'
import { RefObject } from 'react'
import { SpriteProps } from '../types'

class Sprite implements SpriteProps {
	eid: number
	x: number
	y: number
	path: string

	constructor(data: SpriteProps) {
		this.eid = data.eid
		this.x = data.x
		this.y = data.y
		this.path = data.path

		makeAutoObservable(this)
	}
}

export class StateStore {
	spriteComponents = new ObservableMap<number, SpriteProps>()
	spriteRefs: RefObject<HTMLDivElement>[] = []

	spriteComponentsList: SpriteProps[] = []

	constructor() {
		makeAutoObservable(this, {
			spriteRefs: false,
		})
	}

	addSprite(eid: number, data: SpriteProps) {
		const sprite = new Sprite(data)
		this.spriteComponents.set(eid, sprite)
		this.spriteComponentsList.unshift(sprite)
	}

	setSpriteRef(eid: number, ref: RefObject<HTMLDivElement>) {
		this.spriteRefs[eid] = ref
	}

	getSpriteRef(eid: number) {
		return this.spriteRefs[eid]
	}

	removeSprite(eid: number) {
		const component = this.spriteComponents.get(eid)
		const idx = this.spriteComponentsList.findIndex((c) => c === component)
		if (idx >= 0) {
			this.spriteComponentsList.splice(idx, 1)
		}
		this.spriteComponents.delete(eid)
		delete this.spriteRefs[eid]
	}
}

export const stateStore = new StateStore()
