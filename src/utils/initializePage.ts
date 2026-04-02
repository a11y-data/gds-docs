import { Page } from "@playwright/test"

/**
 * Initializes the page by setting the viewport, navigating to the root URL, and then to the specified path.
 * This function is useful for ensuring that the page is fully loaded and ready for interactions before running tests.
 */
export async function initializePage(page: Page, root: string, path?: string) {
  await page.setViewportSize({ width: 1600, height: 1080 })
  await page.goto(`${root}`)
  await page.waitForTimeout(1000)
  await page.goto(`${root}/${path || ''}`)
  await page.waitForTimeout(1000)

} 