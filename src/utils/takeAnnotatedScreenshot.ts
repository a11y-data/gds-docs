import { Locator, Page } from '@playwright/test'

type ScreenShotType = {
  page: Page,
  locator: Locator,
  outputPath: string,
  padding?: number,
  paddingX?: number,
  paddingY?: number,
  outlineStyle: {
    outline: string,
    outlineOffset: string,
  }
}
/**
 * Highlights an element and takes a cropped screenshot with surrounding context.
 *
 * @param page The Playwright page object
 * @param locator The Playwright locator for the element to highlight
 * @param outputPath Where to save the image
 * @param padding The amount of context (in pixels) to include around the element
 * @param paddingX The amount of horizontal context (in pixels) to include around the element
 * @param paddingY The amount of vertical context (in pixels) to include around the element
  */
export async function takeAnnotatedScreenshot(
  { page,
    locator,
    outputPath,
    padding = 50,
    paddingX,
    paddingY = 30,
    outlineStyle = { outline: '4px solid #bc004b', outlineOffset: '4px' }
  }: ScreenShotType
) {
  // 1. Inject CSS to highlight the element (e.g., a thick red border)
  await locator.evaluate((node, outlineStyle) => {
    // Save original styles if you need to revert them later
    const host = (node.parentNode as ShadowRoot)?.host as HTMLElement
    let targetNode = node
    if (node && node instanceof HTMLButtonElement && host) {
      targetNode = host
    }

    targetNode.dataset.originalOutline = targetNode.style.outline
    targetNode.dataset.originalOutlineOffset = targetNode.style.outlineOffset
    // Apply the highlight
    targetNode.style.outline = outlineStyle.outline
    targetNode.style.outlineOffset = outlineStyle.outlineOffset
  }, outlineStyle)

  // Wait a brief moment for styles to paint
  await page.waitForTimeout(100)

  // 2. Get the exact bounding box of the element
  const box = await locator.boundingBox()
  if (!box) throw new Error('Element not visible, cannot take screenshot')

  const viewportSize = page.viewportSize() || { width: 1920, height: 1080 }

  const pX = paddingX ?? padding
  const pY = paddingY

  const startX = Math.max(0, box.x - pX)
  const startY = Math.max(0, box.y - pY)

  const endX = Math.min(viewportSize.width, box.x + box.width + pX)
  const endY = Math.min(viewportSize.height, box.y + box.height + pY)

  // 3. Take a screenshot cropped to the element + padding
  await page.screenshot({
    path: outputPath,
    clip: {
      x: startX,
      y: startY,
      width: endX - startX,
      height: endY - startY
    }
  })

  // 4. (Optional) Revert the styling so the test can continue cleanly
  await locator.evaluate((node) => {
    const host = (node.parentNode as ShadowRoot)?.host as HTMLElement
    let targetNode = node
    if (node && node instanceof HTMLButtonElement && host) {
      targetNode = host
    }
    targetNode.style.outline = targetNode.dataset.originalOutline || ''
    targetNode.style.outlineOffset = targetNode.dataset.originalOutlineOffset || ''
  })
}

