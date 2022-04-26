import {
	addComponent,
	defineQuery,
	enterQuery,
	exitQuery,
	hasComponent,
	removeComponent,
} from 'bitecs'
import Matter from 'matter-js'

import { IECSWorld } from '../../types'
import {
	ActiveState,
	Bouncy,
	BoxCollider,
	Brick,
	ChangeVelocity,
	CircleCollider,
	Direction,
	FixedRotation,
	Follow,
	Friction,
	MovementInput,
	PhysicsBody,
	Position,
	RemoveAll,
	Static,
} from '../components'

const bodies = [] as Matter.Body[]
const bodyIdToEid = [] as number[]

export function getPhysicsBody(eid: number) {
	return bodies[eid]
}

export function setBodyVelocity(body: Matter.Body, x: number, y: number) {
	Matter.Body.setVelocity(body, Matter.Vector.create(x, y))
}

export function setBodyPosition(body: Matter.Body, x: number, y: number) {
	Matter.Body.setPosition(body, Matter.Vector.create(x, y))
}

export function createPhysicsUpdate(engine: Matter.Engine) {
	return () => {
		Matter.Engine.update(engine, 1000 / 60)
	}
}

export function circleCollider(engine: Matter.Engine) {
	const query = defineQuery([PhysicsBody, CircleCollider])
	const enter = enterQuery(query)
	const exit = exitQuery(query)
	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const radius = CircleCollider.radius[eid]
			const body = Matter.Bodies.circle(1, 1, radius, {
				// there's a bug here where if mass is not set to something other than 0
				// the update stick will result in NaN
				// https://github.com/liabru/matter-js/blob/master/src/body/Body.js#L643
				mass: 1,
			})
			Matter.Composite.add(engine.world, body)
			bodies[eid] = body
			bodyIdToEid[body.id] = eid
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const body = bodies[eid]
			Matter.Composite.remove(engine.world, body)
		}
		return world
	}
}

export function boxCollider(engine: Matter.Engine) {
	const query = defineQuery([PhysicsBody, BoxCollider])
	const enter = enterQuery(query)
	const exit = exitQuery(query)
	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const width = BoxCollider.width[eid]
			const height = BoxCollider.height[eid]
			const body = Matter.Bodies.rectangle(0, 0, width, height, {
				chamfer: {
					radius: BoxCollider.chamferRadius[eid],
				},
			})
			Matter.Composite.add(engine.world, body)
			bodies[eid] = body
			bodyIdToEid[body.id] = eid
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const body = bodies[eid]
			Matter.Composite.remove(engine.world, body)
		}

		return world
	}
}

export function friction() {
	const query = defineQuery([PhysicsBody, Friction])
	const enter = enterQuery(query)
	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const body = bodies[eid]
			if (!body) {
				continue
			}
			body.friction = Friction.friction[eid]
			body.frictionAir = Friction.frictionAir[eid]
		}

		const entities = query(world)
		for (const eid of entities) {
			const body = bodies[eid]
			if (!body) {
				continue
			}

			if (body.friction !== Friction.friction[eid]) {
				body.friction = Friction.friction[eid]
			}
			if (body.frictionAir !== Friction.frictionAir[eid]) {
				body.frictionAir = Friction.frictionAir[eid]
			}
		}
		return world
	}
}

export function bouncy() {
	const query = defineQuery([PhysicsBody, Bouncy])
	const enter = enterQuery(query)
	const exit = exitQuery(query)
	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const body = bodies[eid]
			if (!body) {
				continue
			}

			body.restitution = 1
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const body = bodies[eid]
			if (!body) {
				continue
			}

			body.restitution = 0
		}

		return world
	}
}

export function staticBody() {
	const query = defineQuery([PhysicsBody, Static])
	const enter = enterQuery(query)
	const exit = exitQuery(query)
	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const body = bodies[eid]
			if (!body) {
				continue
			}
			Matter.Body.setStatic(body, true)
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const body = bodies[eid]
			if (!body) {
				continue
			}

			Matter.Body.setStatic(body, false)
		}
		return world
	}
}

export function fixedRotation() {
	const query = defineQuery([PhysicsBody, FixedRotation])
	const enter = enterQuery(query)
	const exit = exitQuery(query)
	const previousInertia: number[] = []
	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const body = getPhysicsBody(eid)
			if (!body) {
				continue
			}

			previousInertia[eid] = body.inertia
			Matter.Body.setInertia(body, Infinity)
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const body = getPhysicsBody(eid)
			if (!body) {
				continue
			}

			Matter.Body.setInertia(body, previousInertia[eid] ?? 1)
		}
		return world
	}
}

export function initPositionPhysicsBody() {
	const query = defineQuery([PhysicsBody, Position])
	const enter = enterQuery(query)
	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const body = bodies[eid]
			if (!body) {
				continue
			}

			setBodyPosition(body, Position.x[eid], Position.y[eid])
		}

		return world
	}
}

export function changeVelocity() {
	const query = defineQuery([PhysicsBody, ChangeVelocity])
	const enter = enterQuery(query)
	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const body = bodies[eid]
			if (!body) {
				continue
			}

			Matter.Body.setVelocity(
				body,
				Matter.Vector.create(ChangeVelocity.x[eid], ChangeVelocity.y[eid])
			)

			removeComponent(world, ChangeVelocity, eid)
		}
		return world
	}
}

export function syncPositionPhysicsBody() {
	const query = defineQuery([PhysicsBody, Position])
	return (world: IECSWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const body = bodies[eid]
			if (!body) {
				continue
			}

			const p = body.position
			if (p.x === NaN) {
				console.error('NaN detected!')
			}
			Position.x[eid] = p.x
			Position.y[eid] = p.y
		}
		return world
	}
}

export function handleCollisions(engine: Matter.Engine) {
	const collisionPairs: Matter.IPair[] = []
	Matter.Events.on(engine, 'collisionStart', (e) => {
		for (const data of e.pairs) {
			collisionPairs.push(data)
		}
	})
	return (world: IECSWorld) => {
		while (collisionPairs.length > 0) {
			const data = collisionPairs.shift()!
			const { bodyA, bodyB } = data
			const eida = bodyIdToEid[bodyA.id]
			const eidb = bodyIdToEid[bodyB.id]

			if (hasComponent(world, Brick, eida)) {
				addComponent(world, RemoveAll, eida)
			} else if (hasComponent(world, Brick, eidb)) {
				addComponent(world, RemoveAll, eidb)
			}
		}
		return world
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
			const body = bodies[eid]
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

			const body = bodies[eid]
			if (!body) {
				continue
			}

			const bodyToFollow = bodies[Follow.entityId[eid]]
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
