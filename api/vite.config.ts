import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul'
    },
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@repositories': path.resolve(__dirname, 'src/repositories'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@models': path.resolve(__dirname, 'src/models')
    }
  }
})
