import { Page, test } from '@playwright/test'
import { Context } from '../Context.ts'
import { pushState } from '../utils/historyState.ts'

const port = process.env.PLAYWRIGHT_PORT || '7173'
const root = `http://localhost:${port}`
const referenceRoot = 'docs/reference'
type Route = {
  name: string
  path: string
}

/**
 * Playwright script to navigate the GDS app and take screenshots for documentation.
 * The structure of the documentation follows the structure of the app's routes
 * as defined in app/app-gds/src/page/space/ok.ts.
 * 
 * Screenshots are stored in a structure that reflects the app's hierarchy:
 * app/gds/reference/<route-name>/assets/<screenshot-name>.png
 */
test.describe('GDS Space Navigation and Screenshots', () => {

  test('navigate home page', async ({ page }) => {
    // We initialize the context with the base path for GDS reference documentation
    const context = new Context(`${referenceRoot}/home`, page)
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(`${root}`)
    await page.waitForTimeout(1000)
    console.info(`Starting Home`)
    const routes = [
      { name: 'home', path: 'home' },
      { name: 'faq', path: 'home/faq' },
      { name: 'guidance', path: 'guidance' },
    ]
    await loopRoutes(page, context, routes)
  })

  test('navigate gds space', async ({ page }) => {
    // We initialize the context with the base path for GDS reference documentation
    const context = new Context(`${referenceRoot}/space`, page)
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(`${root}`)
    await page.waitForTimeout(1000)
    await page.getByRole('link', { name: 'My Space' }).click()
    await page.waitForTimeout(1000)
    console.info(`Starting GDS navigation on ${root}`)
    const routes = [
      { name: 'welcome', path: 'welcome' },
      { name: 'discover', path: 'discover' },
      { name: 'commitment', path: 'commitment' },
      { name: 'report', path: 'report' },
      { name: 'communication', path: 'communication' },
      { name: 'organisation', path: 'organisation' },
      { name: 'team', path: 'team' }
    ]
    await loopRoutes(page, context, routes, 1200)
  })

  test('navigate to commitment', async ({ page }) => {
    // We initialize the context with the base path for GDS reference documentation
    const context = new Context(`${referenceRoot}/space`, page)
    await page.setViewportSize({ width: 1600, height: 1080 })
    console.info(`navigate to commitment`)
    await page.goto(`${root}`)
    await page.waitForTimeout(1000)
    await page.getByRole('link', { name: 'My Space' }).click()
    await page.waitForTimeout(1000)

    const routes = [
      { name: 'new-commitment', path: 'commitment/new' },
    ]
    await loopRoutes(page, context, routes, 1200)
    // try {


    // } finally {
    //   // Cleanup: if a commitment was created during the test, we delete it to keep the environment clean
    //   if (commitmentId) {
    //     console.info(`Cleaning up commitment with ID: ${commitmentId}`)
    //   }
    // }

  })



})

async function loopRoutes(page: Page, context: Context, routes: Route[], timeout = 300) {
  for (const route of routes) {
    console.info(`Capturing route: ${route.name}`)

    // Navigate using pushState to avoid full page reload
    await pushState(page, route.path)
    await page.waitForTimeout(timeout) // Wait for content to load
    context.setName(route.name)
    await context.screenshot()
    console.info(`Successfully captured ${route.name}`)
  }
}