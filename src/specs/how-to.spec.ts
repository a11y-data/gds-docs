import { Locator, test } from '@playwright/test'
import { initializeFirebaseApp } from '../utils/initialize'
const db = initializeFirebaseApp().db

const port = '7173'
const a11yPort = '7174'
const baseUrl = `http://localhost:${port}` // playwright team
const a11yBaseUrl = `http://localhost:${a11yPort}` // accessible data team
const satisfactionSurveyId = '3BBFzJneqakYoyDu02c2'
const testSurveyId = 'ufPnZmyEOqZIokmDYuT0' // import content
const mainPath = 'docs/app/survey/how-to'

let locator: Locator
const suffix = ``
let surveyId: string = ''

let formId: string = ''
let surveyName = 'My New Survey'

test.describe('How-To', async () => {
  // try {
  test('Create an account', async ({ page }) => {

  })

  test('Add a member to your organisation', async ({ page }) => {
  })

  test('create a commitment', async ({ page }) => {
  })

  test('submit a commitment', async ({ page }) => {
  })

  test('start the reporting process', async ({ page }) => {
  })

  test('submit a report', async ({ page }) => {
  })


})