import { $, browser } from '@wdio/globals'

class PermissionsPage {
    get denyNotificationsButton () {
        return $('id=com.android.permissioncontroller:id/permission_deny_button')
    }

    async dismissNotificationPromptIfPresent (pageSource) {
        const source = pageSource ?? await browser.getPageSource().catch(() => '')
        if (!source.includes('com.android.permissioncontroller:id/permission_deny_button')) {
            return false
        }

        const denyButton = this.denyNotificationsButton
        await denyButton.click()
        await denyButton.waitForDisplayed({ reverse: true, timeout: 3000 })
        return true
    }
}

export default new PermissionsPage()