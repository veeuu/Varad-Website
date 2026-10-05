import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(projectRoot, '../assets/images')
const destination = resolve(projectRoot, 'public/assets/images')

await rm(destination, { recursive: true, force: true })
await mkdir(dirname(destination), { recursive: true })
await cp(source, destination, { recursive: true })

console.log(`Synced portfolio images from ${source}`)
