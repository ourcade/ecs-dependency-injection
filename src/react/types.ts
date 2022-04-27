export type WithEID<T> = T & { eid: number }
export type SpriteProps = WithEID<{
	color?: number
	path: string
	x: number
	y: number
	opacity?: number
}>
