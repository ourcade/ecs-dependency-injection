import {
	CreateBallFunc,
	CreateBricksFunc,
	CreateLauncherFunc,
	CreatePaddleFunc,
	CreateWallsFunc,
} from '../types'

export function startGame(
	createBricks: CreateBricksFunc,
	createPaddle: CreatePaddleFunc,
	createBall: CreateBallFunc,
	createWalls: CreateWallsFunc,
	createLauncher: CreateLauncherFunc
) {
	return () => {
		createBricks()
		createPaddle()
		createBall()
		createWalls()
		createLauncher()
	}
}
