import { expect, Locator, test } from '@playwright/test'
import { Context } from '../Context.ts'
import { initializeFirebaseApp } from '../utils/initialize'
import { initializePage } from '../utils/initializePage.ts'
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
  test('Survey and Form Management', async ({ page }) => {
    const context = new Context(mainPath, page)
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(baseUrl)

    // Navigate to Survey
    await page.getByRole('link', { name: 'Survey', exact: true }).click()
    await page.waitForTimeout(1000)

    test.step('How to create a new survey', async () => {
      context.setName('creating-a-new-survey')
      // ### Step 1: Click on Create Survey button
      locator = page.getByRole('button', { name: 'New Survey' })
      await context.annotatedScreenshot(locator, 'step-1-click-new-survey')
      await locator.click()

      // ### Step 2: Give a name and description 
      await page.getByRole('textbox', { name: 'name' }).click()
      await page.getByRole('textbox', { name: 'name' }).fill(surveyName)
      await page.getByRole('textbox', { name: 'name' }).press('Tab')
      await page.getByRole('textbox', { name: 'description' }).fill('this survey will be accessible')

      locator = page.getByRole('dialog', { name: 'Create a new Survey' })
      await context.annotatedScreenshot(locator, 'step-2-fill-name-and-description')

      locator = page.getByRole('button', { name: 'Next' })
      await context.annotatedScreenshot(locator, 'step-2-press-next')
      await locator.click()

      // ### Step 3: Click Next and decide the type of Form (new form, import or create content)
      locator = page.getByRole('radiogroup')
      await context.annotatedScreenshot(locator, 'step-3-choose-type-of-form')
      await page.getByRole('textbox', { name: 'name' }).click()
      await page.getByRole('textbox', { name: 'name' }).fill('my new form')
      await page.getByRole('textbox', { name: 'name' }).press('Tab')
      await page.getByRole('textbox', { name: 'description' }).fill('a for to collect data')
      await page.getByRole('textbox', { name: 'description' }).press('Tab')
      await page.getByRole('textbox', { name: 'first page title' }).fill('Page 1')

      locator = page.getByRole('dialog', { name: 'Create a new Survey' })
      await context.annotatedScreenshot(locator, 'step-3-fill-form-details')

      locator = page.getByRole('button', { name: 'Next' })
      await context.annotatedScreenshot(locator, 'step-3-press-next')
      await locator.click()

      // ### Step 4: Confirm
      locator = page.getByRole('dialog', { name: 'Create a new Survey' })
      await context.annotatedScreenshot(locator, 'step-4-confirm')

      locator = page.getByRole('button', { name: 'Confirm' })
      await context.annotatedScreenshot(locator, 'step-4-press-confirm')
      await locator.click()
      await page.waitForTimeout(2000)

    })

    test.step('How to edit a survey', async () => {
      // ## Edit the survey
      context.setName('editing-a-survey')

      // ### Step 1: Click on the survey to edit
      await page.getByText('My New Survey').first().click()
      locator = page.locator('vaadin-grid-cell-content').filter({ hasText: 'Status Overview of main' })
      await context.annotatedScreenshot(locator, 'step-1-expand-survey-row')
      locator = page.getByRole('button', { name: 'Edit Survey' })
      await context.annotatedScreenshot(locator, 'step-1-click-edit-survey')
      await locator.click()

      // ### Step 2: Navigate to Build and the tree view
      locator = page.locator('vaadin-split-layout div').filter({ hasText: 'Overall Structure Introduction Page Form Page 1 Submit Message Thank You Page' })
      await context.annotatedScreenshot(locator, 'step-2-grid-structure')

      locator = page.locator('vaadin-grid-cell-content').filter({ hasText: 'Form' })
      await locator.click()

      const currentUrl = page.url()
      const surveyIdMatch = currentUrl.match(/\/survey\/([^/]+)\/build/)
      if (surveyIdMatch) {
        surveyId = surveyIdMatch[1]
      }
      const formIdMatch = currentUrl.match(/\/form\/([^/]+)$/)
      if (formIdMatch) {
        formId = formIdMatch[1]
      }
      expect(surveyId).toBeTruthy()
      expect(formId).toBeTruthy()


      locator = page.locator('vaadin-grid-cell-content').filter({ hasText: 'Page 1' })
      await context.annotatedScreenshot(locator, 'step-2-click-page-1')
      await locator.click()

      locator = page.locator('vaadin-split-layout div').filter({ hasText: 'Page 1 title used in the page' })
      await context.annotatedScreenshot(locator, 'step-2-page-1-title')


      // ### Step 3: Navigate the content view
      locator = page.getByRole('button', { name: 'Add Content Mode' })
      await context.annotatedScreenshot(locator, 'step-3-click-add-content-mode')
      await locator.click()
    })


    test.step.skip('How to add content to a form', async () => {
      context.setName('adding-content-to-a-form')

      // go back to the tree view / settings mode
      await page.locator('vaadin-grid-cell-content').filter({ hasText: 'Page 1' }).click()
      await page.locator('vaadin-grid-cell-content:nth-child(7) > vaadin-grid-tree-toggle > span:nth-child(2)').click()

      // ### Step 1: Activate Section
      await page.locator('vaadin-grid-cell-content').filter({ hasText: 'Section' }).dblclick()
      locator = page.locator('.app-drawer > .mdc-drawer-app-content')
      await context.annotatedScreenshot(locator, 'step-1-section-view')

      // ### Step 2: Add question
      locator = page.getByRole('button', { name: 'Add a new Question' })
      await context.annotatedScreenshot(locator, 'step-2-add-question-button')
      await locator.click()

      locator = page.getByRole('dialog', { name: 'Confirm Action' })
      await context.annotatedScreenshot(locator, 'step-2-confirm-add-question-dialog')

      locator = page.getByRole('button', { name: 'ok' })
      await context.annotatedScreenshot(locator, 'step-2-confirm-add-question-dialog-ok')
      await locator.click()

      // TODO: the locator here do not work well
      await page.locator('div:nth-child(3) > md-filled-button > lapp-icon > svg > path').click()
      await page.locator('vaadin-grid-cell-content:nth-child(8) > vaadin-grid-tree-toggle > span:nth-child(2)').click()
      await page.getByText('question label').click()
      await page.getByRole('textbox', { name: 'label' }).click()
      await page.getByRole('textbox', { name: 'label' }).press('ControlOrMeta+Shift+ArrowLeft')
      await page.getByRole('textbox', { name: 'label' }).press('ControlOrMeta+Shift+ArrowLeft')
      await page.getByRole('textbox', { name: 'label' }).fill('What is your name')
      await page.locator('vaadin-grid-cell-content').filter({ hasText: 'Section' }).click()
      await page.getByRole('button', { name: 'Add a new Question' }).click()
      await page.locator('lapp-choice-radio:nth-child(2) > .radio-field > .field > #list > lapp-choice-list-item:nth-child(3) > lapp-radio > .container > .touch-target').click()
      await page.getByRole('button', { name: 'OK' }).click()
      await page.locator('vaadin-grid-cell-content:nth-child(8) > vaadin-grid-tree-toggle > span:nth-child(2)').click()
      await page.getByText('question label').click()
      await page.getByRole('textbox', { name: 'label' }).click()
      await page.getByRole('textbox', { name: 'label' }).press('ControlOrMeta+Shift+ArrowLeft')
      await page.getByRole('textbox', { name: 'label' }).press('ControlOrMeta+Shift+ArrowLeft')
      await page.getByRole('textbox', { name: 'label' }).fill('How old are you')

    })

    test.step('How to mark a survey as favorite', async () => {
      // ## Mark as favorite
      context.setName('marking-a-survey-as-favorite')
      await page.goto(`${baseUrl}/s/workspace`)
      // ### Step 1: Click on the star icon to mark as favorite
      await page.getByText('My New Survey').first().click({
        button: 'right'
      })
      locator = page.locator('md-list-item')
        .filter({ hasText: 'star' }).getByRole('listitem')
      await context.annotatedScreenshot(locator, 'step-1-right-click-survey')

    })

    test.step('How to delete a survey', async () => {

      // ## Delete the survey
      context.setName('deleting-a-survey')
      await page.goto(`${baseUrl}/s/workspace`)
      // ### Step 1: Click on the survey to delete
      await page.getByText('My New Survey').first().click({
        button: 'right'
      })
      locator = page.locator('md-list-item')
        .filter({ hasText: 'delete survey' }).getByRole('listitem')
      await context.annotatedScreenshot(locator, 'step-1-right-click-survey')
      await locator.click()

      // ### Step 2: Confirm deletion
      locator = page.getByText('Confirm Action')
      await context.annotatedScreenshot(locator, 'step-2-confirm-deletion')

      locator = page.getByRole('button', { name: 'Confirm Action' })
      await context.annotatedScreenshot(locator, 'step-2-click-confirm-deletion')
      // we do not want to delete the survey here as we want to use it for the next steps, so we won't click on confirm, but in a real test, we would click and then verify that the survey is deleted
      // the survey is deleted at the en d of the test suite in a cleanup step
    })
    return
  })

  test('How to test a form', async ({ page }) => {
    const context = new Context(mainPath, page)
    context.setName('testing-a-form')
    await initializePage(page, a11yBaseUrl, `s/edit/survey/${satisfactionSurveyId}/build/test`)

    // ## Step 1: Navigate to the test view. This is rendering the form as a respondent would see it, 
    // but in a separate environment that allows to test the form with assistive technologies and different accessibility modes without affecting the form being edited.

    locator = page.getByRole('link', { name: 'test' })
    await locator.click()
    await page.waitForTimeout(2000)
    await context.annotatedScreenshot(locator, 'step-1-click-test-link')


    // ## Step 2: Navigate through the form as a respondent would do and test the different functionalities (e.g. logic expressions, accessibility modes, etc.)
    // use the test toolbar for this
    const toolbarButtons = [
      { name: 'test the form in different', screenshot: 'step-2-test-toolbar-language' },
      { name: 'activate read aloud', screenshot: 'step-2-test-toolbar-read-aloud' },
      { name: 'activate sign language', screenshot: 'step-2-test-toolbar-sign-language' },
      { name: 'activate Easyread emulate mode', screenshot: 'step-2-test-toolbar-easyread' },
      { name: 'activate voice recording', screenshot: 'step-2-test-toolbar-voice-recording' },
      { name: 'view all items (regardless of', screenshot: 'step-2-test-toolbar-view-all-items' },
      { name: 'adjust zoom level', screenshot: 'step-2-test-toolbar-adjust-zoom' },
      { name: 'activate edit mode', screenshot: 'step-2-test-toolbar-activate-edit-mode' },
      { name: 'View how the form data is', screenshot: 'step-2-test-toolbar-view-form-data' },
      { name: 'open accessibility menu', screenshot: 'step-2-test-toolbar-open-accessibility-menu' }
    ]
    for (const btn of toolbarButtons) {
      const button = page.getByRole('button', { name: btn.name })
      await context.annotatedScreenshot(button, btn.screenshot, 11)
    }

    // ## Step 3: Edit the form while in test mode and see the changes applied in real time in the test view
    locator = page.getByRole('button', { name: 'activate edit mode' })
    await context.annotatedScreenshot(locator, 'step-3-click-activate-edit-mode')
    await locator.click()

    locator = page.getByRole('button', { name: 'Edit Does your' })
    await context.annotatedScreenshot(locator, 'step-3-click-edit-question')
    await locator.click()

    locator = page.getByRole('dialog')
    await context.annotatedScreenshot(locator, 'step-3-edit-question-dialog')

    await page.getByRole('dialog').press('Escape')

    // ## Step 4 (optional): Share the form to other team members to get feedback
    // - build the form
    locator = page.getByRole('link', { name: 'share' })
    await context.annotatedScreenshot(locator, 'step-4-click-test-toolbar-share-link')
    await locator.click()

    locator = page.getByText('Publish', { exact: true })
    await context.annotatedScreenshot(locator, 'step-4-click-build-and-publish')
    await locator.click()

    locator = page.getByRole('button', { name: 'Create a new Version of the' })
    await context.annotatedScreenshot(locator, 'step-4-click-create-new-version')
    await locator.click()

    await page.locator('.input-wrapper').click()
    await page.getByRole('textbox', { name: 'Versioning Message' }).fill('New test version')
    locator = page.getByRole('dialog', { name: 'Build the Survey' })
    await context.annotatedScreenshot(locator, 'step-4-click-build-the-survey-dialog')
    // we need to close the dialog
    page.getByRole('button', { name: 'Cancel' }).click()

    // ## Step 5: Generate links to share the form with other team members to get feedback
    // - share the test link with other team members

    locator = page.getByText('Distribute', { exact: true })
    await context.annotatedScreenshot(locator, 'step-5-generate-links-to-share')
    await locator.click()
    locator = page.getByRole('button', { name: 'Display Link for Test' })
    await context.annotatedScreenshot(locator, 'step-5-click-display-link-for-test')
    await locator.click()

    locator = page.getByText('Displaying Test Link Use Test')
    await context.annotatedScreenshot(locator, 'step-5-display-test-link')
  })

  test('How to publish a survey', async ({ page }) => {
    const context = new Context(mainPath, page)
    context.setName('publishing-a-survey')
    await initializePage(page, a11yBaseUrl, `/s/edit/survey/${satisfactionSurveyId}/share/status`)

    // ## Step 1: Set the strategy for making the survey active (immediate, manual, scheduled)
    locator = page.getByRole('radiogroup', { name: 'Choose the strategy for' })
    await context.annotatedScreenshot(locator, 'step-1-choose-strategy-for-publishing')


    // ## Step 2: Navigate to the share view / build - build a version of the form before sharing

    locator = page.getByText('Publish', { exact: true })
    await context.annotatedScreenshot(locator, 'step-2-click-publish-link')
    await locator.click()


    locator = page.getByRole('button', { name: 'Create a new Version of the' })
    await context.annotatedScreenshot(locator, 'step-2-click-create-new-version')
    await locator.click()

    await page.locator('.input-wrapper').click()
    await page.getByRole('textbox', { name: 'Versioning Message' }).fill('A new version to share')
    locator = page.getByRole('dialog', { name: 'Build the Survey' })
    await context.annotatedScreenshot(locator, 'step-2-click-build-the-survey-dialog')
    // we need to close the dialog
    page.getByRole('button', { name: 'Cancel' }).click()


    // ## Step 3: Share the survey with other team members by generating a shareable link or by adding their email to share directly with them
    locator = page.getByText('Distribute', { exact: true })
    await context.annotatedScreenshot(locator, 'step-3-click-distribute')
    await locator.click()
    locator = page.getByRole('button', { name: 'Display Link for Production' })
    await context.annotatedScreenshot(locator, 'step-3-click-display-link-for-production')
    await locator.click()
    locator = page.getByText('Displaying Production Link Use Production Link for the real survey data')
    await context.annotatedScreenshot(locator, 'step-3-display-production-link')


    // Step 4 (Optional): Preselect accessibility modes or language for the respondents when sharing the link
    locator = page.getByRole('radiogroup', { name: 'Select a language for the' })
    await context.annotatedScreenshot(locator, 'step-4-select-language-for-sharing')
    await locator.click()
    locator = page.getByRole('radiogroup', { name: 'Select a sign language for' })
    await context.annotatedScreenshot(locator, 'step-4-select-sign-language-for-sharing')
    await locator.click()
    locator = page.getByRole('listbox', { name: 'Select accessibility modes to' })
    await context.annotatedScreenshot(locator, 'step-4-select-accessibility-modes-for-sharing')
    await locator.click()

    // Step 5: copy the link to share
    locator = page.getByRole('link', { name: 'http://localhost:7174/v2/3BBFzJneqakYoyDu02c2?' })
    await context.annotatedScreenshot(locator, 'step-5-copy-link-to-share')
    await locator.click()

  })

  test('How to add content to a form', async ({ page }) => {
    const context = new Context(mainPath, page)
    context.setName('adding-content-to-a-form')
    await initializePage(page, a11yBaseUrl, `/s/edit/survey/${satisfactionSurveyId}/build/compose`)

    // # Option A: dragging and dropping content in the `add content` mode
    // ## Step 1: Activate Add Content Mode
    locator = page.getByRole('button', { name: 'Add Content Mode' })
    await context.annotatedScreenshot(locator, 'step-A-1-click-add-content-mode')
    //await locator.click()

    // ## Step 2: Drag and drop content from the left panel to the form
    // image is a gif showing the drag and drop action,

    // # Option B: using the + buttons in the tree view to add content in specific places of the form
    // ## Step 1: right-Click on the + button in the tree view menu to add content in a specific place of the form
    await page.locator('vaadin-grid-cell-content').filter({ hasText: 'Survey habits' }).click()
    await page.locator('vaadin-grid-cell-content').filter({ hasText: 'Survey habits' }).click({
      button: 'right'
    })
    locator = page.locator('md-list-item').filter({ hasText: 'Add new Section' }).getByRole('listitem')
    // getByLabel('Add new Section').getByRole('listitem')
    await context.annotatedScreenshot(locator, 'step-B-1-right-click-add-section')
    // we do not clic to not add a new section , but we need to close the context menu
    // await locator.click()
    await page.locator('md-list-item').filter({ hasText: 'Survey habits' }).getByRole('listitem').press('Escape')

    // ## Step 2: set the details of the content (e.g. question label, options, etc.) in the pop-up dialog

    locator = page.locator('vaadin-grid-cell-content').filter({ hasText: 'Section 1' })
    await context.annotatedScreenshot(locator, 'step-B-2-click-newly-added-section-in-tree-view')
    await locator.click()
    locator = page.locator('vaadin-split-layout div').filter({ hasText: 'Section 1 Section Name for' })
    await context.annotatedScreenshot(locator, 'step-B-2-click-newly-added-section')
    await locator.click()

    // # Option C: using `add (page/section/question)` buttons in the content view to add content in a sequential way
    // ## Step 1: Activate the parent element of the content you want to add (e.g. click on a page to add a section in this page, click on a section to add a question in this section)
    locator = page.locator('vaadin-grid-cell-content').filter({ hasText: 'Form' })
    await context.annotatedScreenshot(locator, 'step-C-1-click-form-in-tree-view')
    locator.click()

    // ## Step 2: Click on the `add (page/section/question)` button that appears in the content view
    locator = page.getByRole('button', { name: 'Add a new Page' })
    await context.annotatedScreenshot(locator, 'step-C-2-click-add-new-page')
    // locator.click()

    // ## Step 3: set the details of the content (e.g. question label, options, etc.) in detail view
    locator = page.locator('vaadin-grid-cell-content').filter({ hasText: 'Survey habits' })
    await context.annotatedScreenshot(locator, 'step-C-3-click-newly-added-page')
    locator.click()
    locator = page.locator('vaadin-split-layout div').filter({ hasText: 'Survey habits title used in the' })
    await context.annotatedScreenshot(locator, 'step-C-3-click-newly-added-page-title')

  })

  test('How to provide rich formatting', async ({ page }) => {
  })

  test('How to use form logic', async ({ page }) => {

    const context = new Context(mainPath, page)
    context.setName('logic-expression')
    await initializePage(page, a11yBaseUrl, `/s/edit/survey/${satisfactionSurveyId}/build/compose`)

    // ## Step 1: Activate Visibility Mode
    locator = page.getByRole('button', { name: 'Visibility Mode' })
    await context.annotatedScreenshot(locator, 'step-1-activate-visibility-mode')
    await locator.click()

    // ## Step 2: activate the item you want to apply the logic to (by clicking on the grid cell of the item) 
    await page.locator('vaadin-grid-cell-content').filter({ hasText: 'Survey habits' }).click()
    await page.locator('vaadin-grid-cell-content').filter({ hasText: 'Section' }).click()
    await page.locator('vaadin-grid-cell-content').filter({ hasText: 'How many surveys do you run' }).click()

    // ## Step 3: create the logical expression
    locator = page.getByRole('button', { name: 'Create hidden logic' })
    await context.annotatedScreenshot(locator, 'step-2-create-logic-expression')
    await locator.click()

    // ## Step 4 (optional): lock the grid to avoid accidentally clicking on other items while creating the logic expression
    locator = page.getByRole('button', { name: 'Lock tree grid' })
    await context.annotatedScreenshot(locator, 'step-4-lock-tree-grid')

    // ## Step 5: Write the logic expression by dragging and dropping the different elements (e.g. question, answer options) and see the expression being built in real time
    // image coming from shared folder

    // ## Step 6 (optional): test the logic expression with the test tool to see if it works as expected

    await page.locator('#input').click()
    await page.locator('#input').fill('1 == 2')
    locator = page.getByRole('button', { name: 'Test the Current Expression' })
    await context.annotatedScreenshot(locator, 'step-6-test-logic-expression')

    // ## Step 7 (optional): unlock the grid after creating the logic expression or remove the logic expression if you don't need it anymore

    locator = page.getByRole('button', { name: 'Lock tree grid' })
    await context.annotatedScreenshot(locator, 'step-7-unlock-tree-grid')
    await locator.click()
    locator = page.getByRole('button', { name: 'Remove this logic expression' })
    await context.annotatedScreenshot(locator, 'step-7-remove-logic-expression')
    await locator.click()

  })

  test('How to add images to the image library', async ({ page }) => {
    const context = new Context(mainPath, page)
    context.setName('adding-images-to-library')
    await initializePage(page, a11yBaseUrl, `/s/edit/survey/${satisfactionSurveyId}/build/library`)

    // ## Step 1: Click on the "Image Library" button in the image library view
    locator = page.getByTestId('page-drawer-menu').getByText('Image Library')
    await context.annotatedScreenshot(locator, 'step-1-image-library')
    await locator.click()

    // ## Step 2: Click on the "Upload Image" button and fill the details of the image (e.g. name, description, etc.) in the pop-up dialog
    locator = page.getByRole('button', { name: 'Upload Images' })
    await context.annotatedScreenshot(locator, 'step-2-upload-image')

  })

  test('How to set access rights for forms', async ({ page }) => {
    const context = new Context(mainPath, page)
    context.setName('access-rights')
    await initializePage(page, a11yBaseUrl, `/s/edit/survey/${satisfactionSurveyId}/share/access`)

    // ## Step 1: Navigate to the access view
    locator = page.getByTestId('page-drawer-menu').getByText('Access')
    await context.annotatedScreenshot(locator, 'step-1-navigate-to-access-view')
    await locator.click()

    // ## Step 2: Set access rights for different team members by adding their email and selecting the right access level (e.g. read, write, admin)
    locator = page.getByRole('button', { name: 'Add Members' })
    await context.annotatedScreenshot(locator, 'step-2-add-members')
    await locator.click()

    locator = page.getByRole('combobox', { name: 'select user' }).locator('#label')
    await context.annotatedScreenshot(locator, 'step-2-select-user')
    await locator.click()
    await page.locator('lapp-user-name').filter({ hasText: 'Jerry' }).click()

    locator = page.getByRole('combobox', { name: 'Select Role' }).locator('#label')
    await context.annotatedScreenshot(locator, 'step-2-select-role')
    await locator.click()
    await page.locator('lapp-access-add-role').getByText('admin').click()
    // once details are set, 
    locator = page.getByRole('button', { name: 'Add Access' })
    await context.annotatedScreenshot(locator, 'step-2-add-access')
    // await locator.click()

    // ## Step 3 (Optional): Set Ownership of the survey to a specific team member
    locator = page.getByRole('button', { name: 'Modify Ownership' })
    await context.annotatedScreenshot(locator, 'step-3-modify-ownership')

  })

  test('How to share options across multiple questions', async ({ page }) => {
    const context = new Context(mainPath, page)
    context.setName('sharing-options')
    await initializePage(page, a11yBaseUrl, `/s/edit/survey/${testSurveyId}/build/compose`)

    // ## Step 1: Create a question with options that you want to share across multiple questions
    await page.getByText('Universal Health Coverage').click()
    await page.getByText('Health Situation').click()
    await page.locator('vaadin-grid-cell-content').filter({ hasText: 'How often do you visit a' }).click()
    locator = page.getByRole('textbox', { name: 'Make options shared' })
    await context.annotatedScreenshot(locator, 'step-1-add-options-to-share')
    locator.click()

    // ## Step 2: Give a name to the shared options and save them in the library to make them available for other questions
    await page.getByRole('textbox', { name: 'Make options shared' }).fill('shared frequency')
    await context.annotatedScreenshot(locator, 'step-2-add-options-give-a-name')

    // ## Step 3: Select another question where you want to reuse the options and select the shared options.
    await page.getByText('Do you have any chronic').click()
    locator = page.getByRole('combobox', { name: 'Use Shared' }).locator('#label')
    await context.annotatedScreenshot(locator, 'step-3-select-shared-options')
    await locator.click()
    await page.getByRole('option').first().press('Escape')
    await page.getByText('How often do you visit a').click()
    await page.getByRole('textbox', { name: 'Make options shared' }).click()
    await page.getByRole('textbox', { name: 'Make options shared' }).fill('')

  })

  test('How to share logical expressions accross multiple items', async ({ page }) => {
    const context = new Context(mainPath, page)
    context.setName('sharing-logical-expressions')
    await initializePage(page, a11yBaseUrl, `/s/edit/survey/${testSurveyId}/build/compose`)

    // ## Step 1: Navigate to a question with an exiting logical expression that you want to share across multiple questions
    await page.getByText('Universal Health Coverage').click()
    await page.getByText('Satisfaction Factors').click()
    await page.getByText('Management & Leadership').click()
    await page.getByText('Never visible').click()
    await page.getByRole('button', { name: 'Visibility Mode' }).click()
    await page.getByRole('textbox', { name: 'Name' }).click()
    locator = page.getByRole('textbox', { name: 'Name' })
    await locator.fill('share this')
    await context.annotatedScreenshot(locator, 'step-1-logical-expression-to-share')
    locator = page.getByRole('textbox', { name: 'Description' })
    await context.annotatedScreenshot(locator, 'step-1-logical-expression-description')

    // Step 2: Re-use the logical expression in other items 

    await page.getByText('Senior leadership effectively').click()
    locator = await page.getByRole('combobox', { name: 'Select an existing expression' })
    await context.annotatedScreenshot(locator, 'step-2-reuse-logical-expression')

    // cleanup

    await page.getByText('Never visible').click()
    await page.getByRole('textbox', { name: 'Name' }).click()
    await page.getByRole('textbox', { name: 'Name' }).press('Enter')

  })

  test('How to share content across multiple forms and surveys', async ({ page }) => {
    const context = new Context(mainPath, page)
    context.setName('sharing-content')
    await initializePage(page, a11yBaseUrl, `/s/edit/survey/${testSurveyId}/build/compose`)

    // ## Step 1: Navigate to a question with an exiting logical expression that you want to share across multiple questions

  })

  test('How to add an accessibility menu', async ({ page }) => {
  })

  test('How to activate accessibility modes', async ({ page }) => {

    const context = new Context(mainPath, page)
    context.setName('activating-accessibility-modes')
    await initializePage(page, a11yBaseUrl, `/s/edit/survey/${satisfactionSurveyId}/build/behavior`)

    // ### Step 1: Navigate to Behavior
    locator = page.getByTestId('page-drawer-menu')
    console.log('locator', locator)
    await context.annotatedScreenshot(locator, 'step-1-navigate-to-form-behaviour')

    // Step 2: Enable different accessibility modes
    locator = page.getByRole('listbox', { name: 'Modes Activated' })
    await context.annotatedScreenshot(locator, 'step-2-form-behaviour')

    // Step 3: got back to compose mode and Toggle between the different accessibility modes 
    return
  })

  test('How to use Easy Read', async ({ page }) => {
  })

  test('How to use Sign Language', async ({ page }) => {
  })

  test('How to explain complex terms', async ({ page }) => {
  })

  test('Accessibility', async ({ page }) => {

    const context = new Context(
      'app/survey/how-to',
      page
    )
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(baseUrl)

    // ## Adding accessibility menu
    context.setName('adding-an-accessibility-menu')

    // ### Step 1: Click on the accessibility menu button

    // ### Step 2: Click on the "Add Accessibility Menu" option



    return
  })

  test('Localization', async ({ page }) => {

    const context = new Context(
      'app/survey/how-to',
      page
    )
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(baseUrl)

    // ## Translate Forms
    context.setName('translate-forms')

    // ### Step 1: Activate Languages

    // ### Step 2: Run Automatic Translation

    // ### Step 3: Review and Edit translated Text

    // ### Step 4: Review Sign Language Videos

    return
  })




  test('Distribution & Data', async ({ page }) => {

    const context = new Context(
      'app/survey/how-to',
      page
    )
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(baseUrl)

    // ## Distributing the survey
    context.setName('generating-survey-link')


    // ## Alias
    context.setName('creating-alias')

    // ## Form Behaviour
    context.setName('form-behaviour')

    // ## Batches
    context.setName('using-survey-batches')

    // ## Respondent accounts
    context.setName('survey-respondent-accounts')

    // ## Redirection after completing survey
    context.setName('redirection-after-completing-survey')

    // Terms and Conditions
    context.setName('survey-terms')
    return
  })

  test('Analytics & Export', async ({ page }) => {

    const context = new Context(
      'app/survey/how-to',
      page
    )
    await page.setViewportSize({ width: 1600, height: 1080 })
    await page.goto(baseUrl)

    // ## Survey Analytics
    context.setName('survey-analytics')

    // ## Exporting Survey Data
    context.setName('exporting-survey-data')

    return
  })


  // } finally {
  //   // Delete the survey and the form
  //   if (surveyId) await db.collection('app/data/survey').doc(surveyId).delete()
  //   if (formId) await db.collection('app/data/form').doc(formId).delete()
  // }
})