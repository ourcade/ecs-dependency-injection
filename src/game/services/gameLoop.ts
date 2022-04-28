export function createGameLoop(
	updateFunc: (dt: number) => void,
	renderFunc?: () => void
) {
	let last = performance.now()
	const delta = 1e3 / 60
	const step = 1 / 60
	let accumulator = 0

	const loop = (timestamp: number) => {
		requestAnimationFrame(loop)

		const dt = timestamp - last
		last = timestamp
		if (dt > 1e3) {
			// skip large dt's
			return
		}

		accumulator += dt

		while (accumulator >= delta) {
			updateFunc(step)

			accumulator -= delta
		}

		renderFunc?.()
	}

	return () => loop(last)
}
