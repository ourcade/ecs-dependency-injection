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

export const Follow = defineComponent({
	entityId: Types.eid,
	offsetX: Types.f32,
	offsetY: Types.f32,
	state: Types.ui8,
})

export enum Direction {
	Left = 0b01,
	Right = 0b10,
}
export const MovementInput = defineComponent({
	directions: Types.ui8,
})

export const Ball = defineComponent({
	startX: Types.f64,
	startY: Types.f64,
	followOffsetX: Types.f32,
	followOffsetY: Types.f32,
})

export const Brick = defineComponent()
export const Paddle = defineComponent()

export const RemoveAll = defineComponent()

export enum ActiveState {
	Enabled,
	Disabled,
}
export const Launcher = defineComponent({
	state: Types.ui8,
})

export const PhysicsBody = defineComponent()

export const BoxCollider = defineComponent({
	width: Types.ui32,
	height: Types.ui32,
	chamferRadius: Types.ui32,
})

export const CircleCollider = defineComponent({
	radius: Types.ui8,
})

export const Static = defineComponent()

export const Friction = defineComponent({
	friction: Types.f32,
	frictionAir: Types.f32,
})

export const Bouncy = defineComponent({
	restitution: Types.f32,
})

export const FixedRotation = defineComponent()

export const ChangeVelocity = defineComponent({
	x: Types.f32,
	y: Types.f32,
})
