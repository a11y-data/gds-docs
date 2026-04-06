import { type Locator, test } from '@playwright/test'
import { getAuth } from "firebase-admin/auth"
import { Context } from '../Context.ts'
import { pushState } from '../utils/historyState.ts'
import { initializeFirebaseApp } from '../utils/initialize'
const db = initializeFirebaseApp().db


let locator: Locator

let userId = ''
let organisationId = ''

const port = process.env.PLAYWRIGHT_PORT || '7173'
const root = `http://localhost:${port}`
const howToRoot = 'docs/how-to'
const newUserEmail = 'playwright-create-account@preignition.org'
test.describe('How-To', async () => {
  test('Create an account', async ({ page }) => {
    const context = new Context(`${howToRoot}`, page)
    context.setName('create-account')
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(`${root}`)
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'app settings' }).click()
    await page.getByRole('button', { name: 'Sign out' }).click()
    await pushState(page, 'space/ok/welcome')

    // Step 1: Click on "Create an account" link on the welcome page of the app
    locator = await page.getByRole('link', { name: 'Start Submitting Commitments' })
    await context.annotatedScreenshot(locator, 'step-1-start-submitting-commitments')
    await locator.click()
    locator = await page.getByRole('link', { name: 'Create an account' })
    await context.annotatedScreenshot(locator, 'step-1-create-account')
    await locator.click()

    // Step 2: fill the form with valid data to create a new user 
    locator = await page.getByRole('textbox', { name: 'e-mail' })
    await context.annotatedScreenshot(locator, 'step-2-fill-create-account-form-email')
    await locator.fill(newUserEmail)
    locator = await page.getByRole('textbox', { name: 'password' })
    await context.annotatedScreenshot(locator, 'step-2-fill-create-account-form-password')
    await locator.fill('cmoila2')
    locator = await page.getByRole('textbox', { name: 'first name' })
    await context.annotatedScreenshot(locator, 'step-2-fill-create-account-form-first-name')
    await locator.fill('christophe')
    locator = await page.getByRole('button', { name: 'Create Account' })
    await context.annotatedScreenshot(locator, 'step-2-Click Next')
    await locator.click()

    // Step 3: Set New Organisation Details

    locator = await page.getByRole('button', { name: 'Set details for new' })
    await context.annotatedScreenshot(locator, 'step-3-set-new-organisation-details')
    await locator.click()

    locator = await page.getByRole('textbox', { name: 'Name' })
    await context.annotatedScreenshot(locator, 'step-3-set-new-organisation-details-name')
    await locator.fill('My Organisation Name')
    locator = await page.getByRole('combobox', { name: 'Type' })
    await context.annotatedScreenshot(locator, 'step-3-set-new-organisation-details-type')
    await locator.press('ArrowDown')
    await page.getByText('INGO').click()
    locator = await page.locator('textarea')
    await context.annotatedScreenshot(locator, 'step-3-set-new-organisation-details-description')
    await locator.fill('Description of my organisation')
    locator = await page.getByRole('button', { name: 'Next' })
    await context.annotatedScreenshot(locator, 'step-3-set-new-organisation-details-next')
    await locator.click()


    // Step 4: Verify your email address : go to your email inbox and click on the verification link 
    await getAuth().getUserByEmail(newUserEmail)
      .then((userRecord) => {
        userId = userRecord.uid
        console.info('User ID:', userId)
        return getAuth().updateUser(userId, {
          emailVerified: true,
        })
          .then(() => {
            console.log('User ID:', userId)
          })
      })
    // Step 5: Agree to terms and conditions
    locator = await page.getByRole('checkbox', { name: 'Yes, I agree to the terms gds' })
    await context.annotatedScreenshot(locator, 'step-5-agree-to-terms')
    await locator.check()
    await page.getByRole('button', { name: 'Next' }).click()

    // Step 6: You are all set ! Click on "Access GDS Commitment Portal" button and you will be redirected to the welcome page of your space.
    locator = await page.getByRole('link', { name: 'Access GDS commitments Portal' })
    await context.annotatedScreenshot(locator, 'step-6-access-commitment-portal')
    await locator.click()

    // extract organisation id from url
    const url = page.url()
    const regex = /space\/([^\/]+)\/ok/
    const match = url.match(regex)
    if (match && match[1]) {
      organisationId = match[1]
      console.log('Organisation ID:', organisationId)
    }

    // delete the user and the organisation created during the test to avoid polluting the database
    if (userId) {
      await getAuth().deleteUser(userId)
      await db.collection('user').doc(userId).delete()
    }
    if (organisationId) {
      await db.collection('app/gds/organisations').doc(organisationId).delete()
    }

  })

  test('Add a member to your organisation', async ({ page }) => {
    const context = new Context(`${howToRoot}`, page)
    context.setName('add-member')
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(`${root}`)
    await pushState(page, 'space/ok/team')
    await page.waitForTimeout(1000)

    // Step 1: Click on "My Space" in the header and then on "Team" in the left menu
    await page.getByText('Team', { exact: true }).click()
    locator = await page.getByRole('button', { name: 'Add Members' })
    await context.annotatedScreenshot(locator, 'step-1-click-add-members')
    await locator.click()


    // Step 2: Click on "Add Member" button and fill the form with the email of the new member you want to add to your organisation
    // fill the exact email address of the user you want to add to your organisation to make sure the user appears in the dropdown list (the user needs to have an account in the app before being added to an organisation)
    locator = await page.getByRole('combobox', { name: 'Search or Invite Users' }).getByRole('textbox')
    await context.annotatedScreenshot(locator, 'step-2-search-new-member')
    await locator.click()
    await locator.fill('playwright@preignition.org')

    // select the user in the dropdown list
    locator = await page.getByRole('option').getByText('CG christophe g playwright@')
    // locator = await page.getByRole('option').getByText('playwright preignition')
    await context.annotatedScreenshot(locator, 'step-2-select-new-member')
    await locator.click()

    locator = await page.getByRole('combobox', { name: 'Select Role' }).locator('#label')
    await context.annotatedScreenshot(locator, 'step-2-select-role')
    await locator.click()
    await page.getByText('editor', { exact: true }).click()
    locator = await page.getByRole('button', { name: 'Add Access' })
    await context.annotatedScreenshot(locator, 'step-2-click-add-access')



  })

  test('create a commitment', async ({ page }) => {
    const context = new Context(`${howToRoot}`, page)
    context.setName('create-commitment')
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(`${root}`)
    await page.waitForTimeout(1000)
  })

  test('submit a commitment - coming soon', async ({ page }) => {
    const context = new Context(`${howToRoot}`, page)
    context.setName('submit-commitment')
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(`${root}`)
    await page.waitForTimeout(1000)
  })

  test('start the reporting process', async ({ page }) => {
    const context = new Context(`${howToRoot}`, page)
    context.setName('start-reporting-process')
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(`${root}`)
    await page.waitForTimeout(1000)
  })

  test('submit a report', async ({ page }) => {
    const context = new Context(`${howToRoot}`, page)
    context.setName('submit-report')
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(`${root}`)
    await page.waitForTimeout(1000)
  })


})