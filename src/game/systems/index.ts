import {
	addComponent,
	defineQuery,
	getEntityComponents,
	pipe,
	removeComponent,
	removeEntity,
} from 'bitecs'
import {
	IECSWorld,
	IGameConfig,
	IGlobalState,
	IKeyboardService,
} from '../../types'
import {
	Ball,
	ChangeVelocity,
	Direction,
	Follow,
	Launcher,
	ActiveState,
	MovementInput,
	Position,
	RemoveAll,
	PhysicsBody,
} from '../components'

import {
	staticBody,
	circleCollider,
	createPhysicsUpdate,
	changeVelocity,
	boxCollider,
	syncPositionPhysicsBody,
	initPositionPhysicsBody,
	friction,
	bouncy,
	getPhysicsBody,
	setBodyVelocity,
	setBodyPosition,
	fixedRotation,
	handleCollisions,
} from './physics'

export function keyboardInput(keyboard: IKeyboardService) {
	const query = defineQuery([MovementInput])
	return (world: IECSWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			let directions = 0
			if (keyboard.left) {
				directions |= Direction.Left
			} else if (keyboard.right) {
				directions |= Direction.Right
			}
			MovementInput.directions[eid] = directions
		}
		return world
	}
}

export function launcher(
	config: IGameConfig,
	keyboard: IKeyboardService,
	globalState: IGlobalState
) {
	const query = defineQuery([Launcher])
	return (world: IECSWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			if (Launcher.state[eid] === ActiveState.Disabled) {
				continue
			}

			if (!keyboard.space) {
				continue
			}

			const ballEid = globalState.ballEntityId
			if (ballEid < 0) {
				continue
			}

			addComponent(world, ChangeVelocity, ballEid)
			const middleX = config.world.width * 0.5
			const x = Position.x[ballEid] ?? middleX
			const diff = middleX - x
			ChangeVelocity.x[ballEid] = Math.abs(diff) < 100 ? 0 : diff > 0 ? -10 : 10
			ChangeVelocity.y[ballEid] = -10

			Follow.state[ballEid] = ActiveState.Disabled
			Launcher.state[eid] = ActiveState.Disabled
		}
		return world
	}
}

export function loseBall(config: IGameConfig, globalState: IGlobalState) {
	const query = defineQuery([Ball, Position])
	return (world: IECSWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const y = Position.y[eid]
			if (y > config.world.height + 50) {
				const body = getPhysicsBody(eid)
				if (!body) {
					console.error('loseBall: missing phyiscs body')
					continue
				}

				setBodyVelocity(body, 0, 0)

				const paddleEid = globalState.paddleEntityId
				const x = Position.x[paddleEid] ?? Ball.startX[eid]
				const y = Position.y[paddleEid]
					? Position.y[paddleEid] - config.ball.height * 0.5
					: Ball.startY[eid]
				setBodyPosition(body, x, y)

				if (globalState.launcherEntityId >= 0) {
					Launcher.state[globalState.launcherEntityId] = ActiveState.Enabled
				}
				if (globalState.ballEntityId >= 0) {
					Follow.state[globalState.ballEntityId] = ActiveState.Enabled
				}
			}
		}
		return world
	}
}

export function removeAll() {
	const query = defineQuery([RemoveAll])
	return (world: IECSWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const components = getEntityComponents(world, eid)
			for (const comp of components) {
				removeComponent(world, comp, eid)
			}
			removeEntity(world, eid)
		}
	}
}

function isDirectionActive(mask: number, bit: Direction) {
	return (mask & bit) === bit
}

export function movement() {
	const query = defineQuery([PhysicsBody, MovementInput])
	const speed = 12
	return (world: IECSWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const body = getPhysicsBody(eid)
			if (!body) {
				continue
			}

			const mask = MovementInput.directions[eid]
			const { x, y } = body.position
			if (isDirectionActive(mask, Direction.Left)) {
				setBodyPosition(body, x - speed, y)
			} else if (isDirectionActive(mask, Direction.Right)) {
				setBodyPosition(body, x + speed, y)
			}
		}
		return world
	}
}

export function follow() {
	const query = defineQuery([PhysicsBody, Follow])
	return (world: IECSWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			if (Follow.state[eid] === ActiveState.Disabled) {
				continue
			}

			const body = getPhysicsBody(eid)
			if (!body) {
				continue
			}

			const bodyToFollow = getPhysicsBody(Follow.entityId[eid])
			if (!bodyToFollow) {
				continue
			}

			setBodyPosition(
				body,
				bodyToFollow.position.x + Follow.offsetX[eid],
				bodyToFollow.position.y + Follow.offsetY[eid]
			)
		}
		return world
	}
}

export function gameUpdateCreator(
	config: IGameConfig,
	globalState: IGlobalState,
	keyboard: IKeyboardService,
	physicsEngine: Matter.Engine
) {
	const prePhysics = pipe(
		circleCollider(physicsEngine),
		boxCollider(physicsEngine),
		staticBody(),
		initPositionPhysicsBody(),
		friction(),
		bouncy(),
		fixedRotation(),
		keyboardInput(keyboard),
		launcher(config, keyboard, globalState),
		changeVelocity(),
		movement(),
		follow()
	)
	const postPhysics = pipe(
		handleCollisions(physicsEngine),
		syncPositionPhysicsBody(),
		loseBall(config, globalState),
		removeAll()
	)
	const physicsUpdate = createPhysicsUpdate(physicsEngine)
	return (world: IECSWorld) => {
		prePhysics(world)
		physicsUpdate()
		postPhysics(world)
	}
}
