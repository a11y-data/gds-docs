import { Context } from "../Context.ts"

/**
 * Take screenshots for all modes (Settings, Localize, Read Aloud, Easy Read, Sign language, Visibility)
 * @param context 
 */
export const takeScreenshotAllModes = async (context: Context) => {
  const { page, name } = context

  await page.getByRole('button', { name: 'Settings Mode' }).click()
  await page.waitForTimeout(350)
  await context
    .setName(name)
    .screenshot()
  await page.getByRole('button', { name: 'Localize Mode' }).click()
  await page.waitForTimeout(350)
  await context
    .setName(`${name}-localize`)
    .screenshot()
  await page.getByRole('button', { name: 'Read Aloud Mode' }).click()
  await page.waitForTimeout(350)
  await context
    .setName(`${name}-readaloud`)
    .screenshot()
  await page.getByRole('button', { name: 'Easy Read Mode' }).click()
  await page.waitForTimeout(350)
  await context
    .setName(`${name}-easyread`)
    .screenshot()
  await page.getByRole('button', { name: 'Sign language Mode' }).click()
  await page.waitForTimeout(350)
  await context
    .setName(`${name}-signlanguage`)
    .screenshot()
  await page.getByRole('button', { name: 'Visibility Mode' }).click()
  await page.waitForTimeout(350)
  await context
    .setName(`${name}-visibility`)
    .screenshot()
  await page.getByRole('button', { name: 'Settings Mode' }).click()
  await page.waitForTimeout(350)
}
