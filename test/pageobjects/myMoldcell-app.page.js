import { browser } from '@wdio/globals'
import permissionsPage from './permissions.page.js'
import welcomePage from './welcome.page.js'

class MyMoldcellAppPage {
    async openLoginScreen () {
        await browser.waitUntil(
            async () => {
                const pageSource = await browser.getPageSource().catch(() => '')
                const promptDismissed = await permissionsPage.dismissNotificationPromptIfPresent(pageSource)

                if (promptDismissed) {
                    return false
                }

                return pageSource.includes('resource-id="login_input"') ||
                    pageSource.includes('resource-id="md.moldcell.selfservice:id/activity_welcome"')
            },
            {
                timeout: 45000,
                interval: 1000,
                timeoutMsg: 'Neither the welcome nor login screen appeared'
            }
        )

        const currentPageSource = await browser.getPageSource()
        if (currentPageSource.includes('resource-id="md.moldcell.selfservice:id/activity_welcome"')) {
            await welcomePage.romanianOption.click()
            await welcomePage.continueButton.click()
            await browser.waitUntil(
                async () => (await browser.getPageSource()).includes('resource-id="login_input"'),
                {
                    timeout: 45000,
                    interval: 1000,
                    timeoutMsg: 'Login screen did not appear after continuing from welcome'
                }
            )
        }
    }
}

export default new MyMoldcellAppPage()