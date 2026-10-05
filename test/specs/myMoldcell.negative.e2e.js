import { browser } from '@wdio/globals'
import appPage from '../pageobjects/myMoldcell-app.page.js'
import loginPage from '../pageobjects/myMoldcell-login.page.js'

describe('My Moldcell negative scenarios', () => {
    it('does not submit an incomplete phone number', async () => {
        await appPage.openLoginScreen()

        await loginPage.phoneOrEmailInput.clearValue()
        await loginPage.phoneOrEmailInput.setValue('123')
        await loginPage.passwordInput.setValue('NotARealPassword123!')

        await browser.hideKeyboard()
        await loginPage.loginButton.click()

        await expect(
            await loginPage.phoneOrEmailInput.getAttribute('text')
        ).toBe('123')

        await expect(
            loginPage.usernameValidationMessage
        ).toBeDisplayed()

        const validationText = await loginPage.usernameValidationMessage.getText()

        expect(validationText).toContain('Numele de utilizator')
    })
})
