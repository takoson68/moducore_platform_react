//- vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { mkdir, readdir, rm } from 'node:fs/promises'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const project = env.VITE_PROJECT || 'react-welcome'
  const apiTarget = 'http://moducore_platform.test'
  const buildOutDir = path.resolve(__dirname, '..', 'backend', 'public')

  return {
    plugins: [react(), prepareBuildOutput(buildOutDir)],
    build: {
      outDir: buildOutDir,
      emptyOutDir: false,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          manualChunks: undefined,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@app': path.resolve(__dirname, 'src/app'),
        '@project': path.resolve(__dirname, `projects/${project}`),
      },
    },
    server: {
      proxy: {
        '/assets/QRC': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
    preview: {
      proxy: {
        '/assets/QRC': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  }
})

function prepareBuildOutput(outputDir) {
  return {
    name: 'prepare-build-output',
    apply: 'build',
    async buildStart() {
      const assetsDir = path.join(outputDir, 'assets')
      const preservedAssetDirNames = new Set(['QRC'])

      await mkdir(outputDir, { recursive: true })

      if (existsSync(path.join(outputDir, 'index.html'))) {
        await rm(path.join(outputDir, 'index.html'), { force: true })
      }

      if (!existsSync(assetsDir)) {
        return
      }

      const assetEntries = await readdir(assetsDir, { withFileTypes: true })
      await Promise.all(
        assetEntries
          .filter((entry) => !preservedAssetDirNames.has(entry.name))
          .map((entry) =>
            rm(path.join(assetsDir, entry.name), {
              recursive: true,
              force: true
            })
          )
      )
    },
  }
}
