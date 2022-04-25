import { CreateBallFunc, CreateBricksFunc, CreatePaddleFunc } from '../types'

export function startGame(
	createBricks: CreateBricksFunc,
	createPaddle: CreatePaddleFunc,
	createBall: CreateBallFunc
) {
	return () => {
		createBricks()
		createPaddle()
		createBall()
	}
}
