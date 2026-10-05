import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'

const workspaceRoot = resolve(process.cwd(), '..')
const assetTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
}

function localAssets() {
  return {
    name: 'serve-local-assets',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url || '/', 'http://localhost').pathname
        const prefix = '/__local-assets/'
        if (!pathname.startsWith(prefix) || !['GET', 'HEAD'].includes(req.method || '')) {
          return next()
        }

        let assetPath
        try {
          assetPath = resolve(workspaceRoot, decodeURIComponent(pathname.slice(prefix.length)))
        } catch {
          res.statusCode = 400
          return res.end('Invalid asset path')
        }
        if (!assetPath.startsWith(`${workspaceRoot}${sep}assets${sep}`)) {
          res.statusCode = 403
          return res.end('Forbidden')
        }

        try {
          const file = await stat(assetPath)
          if (!file.isFile()) return next()
          res.statusCode = 200
          res.setHeader('Content-Type', assetTypes[extname(assetPath).toLowerCase()] || 'application/octet-stream')
          res.setHeader('Content-Length', file.size)
          res.setHeader('Cache-Control', 'no-cache')
          if (req.method === 'HEAD') return res.end()
          const stream = createReadStream(assetPath)
          stream.on('error', next)
          stream.pipe(res)
        } catch (error) {
          if (error.code === 'ENOENT') return next()
          next(error)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), localAssets()],
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    watch: {
      ignored: ['**/public/assets/images/**'],
    },
  },
})
