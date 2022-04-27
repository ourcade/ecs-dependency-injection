import { useEffect, useRef } from 'react'
import type { SpriteProps } from './types'
import { stateStore } from './store'

export function Sprite({ eid, color, path, x, y, opacity = 1 }: SpriteProps) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!ref.current) {
			return
		}

		stateStore.setSpriteRef(eid, ref)
	}, [ref.current])

	return (
		<div
			ref={ref}
			style={{
				position: 'absolute',
				left: x,
				top: y,
			}}
		>
			<div
				style={{
					position: 'relative',
					left: '-50%',
				}}
			>
				<img
					src={path}
					style={{
						opacity: color ? 0.7 : opacity,
						marginBottom: '-4px',
					}}
				/>
			</div>
		</div>
	)
}
