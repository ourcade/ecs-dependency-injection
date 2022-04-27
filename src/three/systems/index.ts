import { defineQuery, enterQuery, exitQuery, pipe } from 'bitecs'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
	Ball,
	Brick,
	Paddle,
	Position,
	Sprite,
	Tint,
} from '../../game/components'
import {
	IAssetsData,
	IECSWorld,
	IGameConfig,
	IndexToTextureFunc,
} from '../../types'
import { Orbit } from '../components'

const meshes: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>[] = []

const textureLoader = new THREE.TextureLoader()
const xScale = 1 / 60
const yScale = 1 / 45

export function createBrickMeshes(
	config: IGameConfig,
	assets: IAssetsData,
	indexToTexture: IndexToTextureFunc,
	scene: THREE.Scene
) {
	const query = defineQuery([Sprite, Brick])
	const enter = enterQuery(query)
	const exit = exitQuery(query)

	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const texId = Sprite.texture[eid]
			const key = indexToTexture(texId)
			const path = assets[key].path

			const entityConf = config[key]
			const box = new THREE.BoxGeometry(
				entityConf.width * xScale,
				entityConf.height * yScale,
				0.5
			)
			const texture = textureLoader.load(path)
			const mat = new THREE.MeshBasicMaterial({
				map: texture,
			})
			const mesh = new THREE.Mesh(box, mat)
			scene.add(mesh)
			meshes[eid] = mesh
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const mesh = meshes[eid]
			mesh.removeFromParent()
		}
		return world
	}
}

function createPaddleMeshes(
	config: IGameConfig,
	assets: IAssetsData,
	indexToTexture: IndexToTextureFunc,
	scene: THREE.Scene
) {
	const query = defineQuery([Sprite, Paddle])
	const enter = enterQuery(query)
	const exit = exitQuery(query)

	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const texId = Sprite.texture[eid]
			const key = indexToTexture(texId)
			const path = assets[key].path

			const paddleConfig = config.paddle
			const geom = new THREE.CapsuleGeometry(
				paddleConfig.height * yScale * 0.5,
				paddleConfig.width * xScale
			)
			geom.rotateZ(Math.PI * 0.5)
			const texture = textureLoader.load(path)
			texture.center.set(0.5, 0.5)
			texture.rotation = Math.PI * 0.5
			texture.repeat.set(3, 4)
			const mat = new THREE.MeshBasicMaterial({
				map: texture,
			})
			const mesh = new THREE.Mesh(geom, mat)
			scene.add(mesh)
			meshes[eid] = mesh
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const mesh = meshes[eid]
			mesh.removeFromParent()
		}
		return world
	}
}

function createBallMeshes(
	config: IGameConfig,
	assets: IAssetsData,
	indexToTexture: IndexToTextureFunc,
	scene: THREE.Scene
) {
	const query = defineQuery([Sprite, Ball])
	const enter = enterQuery(query)
	const exit = exitQuery(query)

	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const texId = Sprite.texture[eid]
			const key = indexToTexture(texId)
			const path = assets[key].path

			const ballConfig = config.ball
			const box = new THREE.SphereGeometry(ballConfig.width * 0.5 * xScale)
			const texture = textureLoader.load(path)
			const mat = new THREE.MeshBasicMaterial({
				map: texture,
			})
			const mesh = new THREE.Mesh(box, mat)
			scene.add(mesh)
			meshes[eid] = mesh
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const mesh = meshes[eid]
			mesh.removeFromParent()
		}
		return world
	}
}

function positionMesh(config: IGameConfig, camera: THREE.Camera) {
	const query = defineQuery([Sprite, Position])

	const halfWidth = config.world.width * 0.5
	const height = config.world.height
	const halfHeight = height * 0.5

	const isOrtho = camera instanceof THREE.OrthographicCamera

	return (world: IECSWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const mesh = meshes[eid]
			if (!mesh) {
				continue
			}

			const x = Position.x[eid] - halfWidth
			const offsetY = isOrtho ? Position.y[eid] : height - Position.y[eid]
			const y = offsetY - halfHeight

			mesh.position.set(x * xScale, y * yScale, 0)
		}

		return world
	}
}

function tintMesh() {
	const query = defineQuery([Sprite, Tint])

	return (world: IECSWorld) => {
		const entities = query(world)
		for (const eid of entities) {
			const mesh = meshes[eid]
			if (!mesh) {
				continue
			}

			const tint = Tint.color[eid]
			mesh.material.color = new THREE.Color(tint)
		}

		return world
	}
}

const controls: OrbitControls[] = []
export function orbitControls(camera: THREE.Camera, renderer: THREE.Renderer) {
	const query = defineQuery([Orbit])
	const enter = enterQuery(query)
	const exit = exitQuery(query)

	return (world: IECSWorld) => {
		const enterEntities = enter(world)
		for (const eid of enterEntities) {
			const control = new OrbitControls(camera, renderer.domElement)
			control.autoRotate = true
			control.autoRotateSpeed = 3
			controls[eid] = control
		}

		const entities = query(world)
		for (const eid of entities) {
			const control = controls[eid]
			control?.update()
		}

		const exitEntities = exit(world)
		for (const eid of exitEntities) {
			const control = controls[eid]
			if (!control) {
				continue
			}

			control.dispose()
		}
		return world
	}
}

export function renderPipeline(
	config: IGameConfig,
	assets: IAssetsData,
	scene: THREE.Scene,
	indexToTexture: IndexToTextureFunc,
	camera: THREE.Camera,
	renderer: THREE.Renderer
) {
	return pipe(
		createBrickMeshes(config, assets, indexToTexture, scene),
		createPaddleMeshes(config, assets, indexToTexture, scene),
		createBallMeshes(config, assets, indexToTexture, scene),
		positionMesh(config, camera),
		tintMesh(),
		orbitControls(camera, renderer)
	)
}
