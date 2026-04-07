import { Page } from '@playwright/test'

/**
 * Navigates to a URL using history.pushState to avoid a full page reload.
 * This is useful for SPA navigation in tests.
 * 
 * @param page Playwright Page object
 * @param url The URL to navigate to
 */
export async function pushState(page: Page, path: string) {
  await page.evaluate((path) => {
    const url = new URL(path, window.location.href).href
    window.history.pushState({}, '', url)
  }, path)
}

/**
 * Navigates to a path using history.replaceState to avoid a full page reload.
 * This is useful for SPA navigation in tests when you want to replace the current state.
 * 
 * @param page Playwright Page object
 * @param path The path to navigate to
 */
export async function replaceState(page: Page, path: string) {
  await page.evaluate((path) => {
    const url = new URL(path, window.location.href).href
    window.history.replaceState({}, '', url)
    // window.dispatchEvent(new Event('popstate'));
  }, path)
}
