import { defineConfig } from 'cypress'
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin'

export default defineConfig({
  projectId: 'yz9weq',
  e2e: {
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config)
    }
  }
})
