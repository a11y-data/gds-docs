import { type Page, type PageScreenshotOptions } from '@playwright/test'

export type ContextT = {
  page: Page
  name: string
  path: string
}

export type AreaT = {
  name: string
  clip?: ClipT
  advanced?: boolean
}

export type ClipT = PageScreenshotOptions['clip']


export type OutlineStyleT = {
  outline: string,
  outlineOffset: string,
}