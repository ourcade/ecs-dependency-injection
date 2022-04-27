import { addComponent, addEntity } from 'bitecs'
import * as THREE from 'three'
import {
	ECSPipeline,
	GameUpdateFunc,
	IAssetsData,
	IECSWorld,
	IGameConfig,
} from '../types'
import { Orbit } from './components'
import { RenderLoopFunc } from './types'

export function createRenderer(config: IGameConfig) {
	const renderer = new THREE.WebGLRenderer()
	renderer.setSize(config.world.width, config.world.height)

	return renderer
}

export function createRenderLoop(
	scene: THREE.Scene,
	camera: THREE.Camera,
	renderer: THREE.WebGLRenderer
) {
	return () => {
		renderer.render(scene, camera)
	}
}

export function createMainScene(assets: IAssetsData) {
	const scene = new THREE.Scene()

	const map = new THREE.TextureLoader().load(assets.logo.three.path)
	const material = new THREE.SpriteMaterial({ map: map })
	material.opacity = 0.3

	const sprite = new THREE.Sprite(material)
	sprite.position.set(5, -4, 0)
	sprite.scale.set(3, 3, 1)
	scene.add(sprite)
	return scene
}

export function createMainCamera() {
	const camera = new THREE.OrthographicCamera(-8, 8, -6, 6)
	return camera
}

export function createPerspectiveCamera() {
	const camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 100)
	camera.position.z = 13
	return camera
}

export function createLoop(
	world: IECSWorld,
	gameUpdate: GameUpdateFunc,
	renderPipeline: ECSPipeline,
	renderLoop: RenderLoopFunc
) {
	return (dt: number) => {
		world.dt = dt

		gameUpdate(world)
		renderPipeline(world)
		renderLoop()
	}
}

export function addOrbitControls(world: IECSWorld) {
	return () => {
		const eid = addEntity(world)
		addComponent(world, Orbit, eid)
	}
}
