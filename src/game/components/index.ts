import { defineComponent, Types } from 'bitecs'

export const Position = defineComponent({
	x: Types.f64,
	y: Types.f64,
})

export const Velocity = defineComponent({
	x: Types.f64,
	y: Types.f64,
})

export const Sprite = defineComponent({
	texture: Types.ui8,
})

export const Tint = defineComponent({
	color: Types.ui32,
})

export const Ball = defineComponent()
