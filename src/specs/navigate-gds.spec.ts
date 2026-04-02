import { test } from '@playwright/test'
import { Context } from '../Context.ts'

const port = process.env.PLAYWRIGHT_PORT || '7173'
const root = `http://localhost:${port}`
const pathRoot = 'docs/reference/space'
/**
 * Playwright script to navigate the GDS app and take screenshots for documentation.
 * The structure of the documentation follows the structure of the app's routes
 * as defined in app/app-gds/src/page/space/ok.ts.
 * 
 * Screenshots are stored in a structure that reflects the app's hierarchy:
 * app/gds/reference/<route-name>/assets/<screenshot-name>.png
 */
test.describe('GDS Space Navigation and Screenshots', () => {

  test('navigate gds space', async ({ page }) => {
    // We initialize the context with the base path for GDS reference documentation
    const context = new Context(pathRoot, page)
    await page.setViewportSize({ width: 1600, height: 1080 })

    console.info(`Starting GDS navigation on ${root}`)

    // Navigate to the entry point of My Space
    // This will likely redirect to /space/:organisationId/ok/welcome if authenticated
    await page.goto(`${root}/space/ok/welcome`)

    // Wait for the app to initialize and any redirects to settle and sign-in
    await page.waitForTimeout(3000)

    // List of routes from app/app-gds/src/page/space/ok.ts
    // These are the main sections of the GDS Portal (My Space)
    const routes = [
      { name: 'welcome', path: 'welcome' },
      { name: 'discover', path: 'discover' },
      { name: 'commitment', path: 'commitment' },
      { name: 'report', path: 'report' },
      { name: 'communication', path: 'communication' },
      { name: 'organisation', path: 'organisation' },
      { name: 'team', path: 'team' }
    ]

    for (const route of routes) {
      console.info(`Capturing route: ${route.name}`)


      const currentUrl = page.url()
      await page.goto(`${currentUrl}/${route.path}`)


      await page.waitForTimeout(1000) // Wait for content to load

      // Update context path and name for the current route
      // context.resetPath(pathRoot)
      // context.setPath(route.name)
      context.setName(route.name)

      // Take screenshots (including advanced mode if applicable)
      await context.screenshot()

      console.info(`Successfully captured ${route.name}`)
    }
  })
})
