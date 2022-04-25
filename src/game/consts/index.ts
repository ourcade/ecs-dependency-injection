export const TexturesToIndices = {
	Brick: 0,
	Paddle: 1,
	Ball: 2,
}

export type TextureKey = keyof typeof TexturesToIndices

const textureRecord: Record<string, TextureKey> = {}
Object.keys(TexturesToIndices).forEach((k) => {
	const key = k as TextureKey
	textureRecord[key] = key
})

export const Texture: Readonly<Record<TextureKey, TextureKey>> = {
	...(textureRecord as Record<TextureKey, TextureKey>),
}

export function textureToIndex(tex: TextureKey) {
	return TexturesToIndices[tex]
}

const lookup: TextureKey[] = []
for (const key in TexturesToIndices) {
	const texKey = key as TextureKey
	const idx = TexturesToIndices[texKey]
	lookup[idx] = texKey
}

export function indexToTexture(idx: number) {
	return lookup[idx]
}
