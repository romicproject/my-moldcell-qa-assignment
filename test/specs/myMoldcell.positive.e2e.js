import appPage from '../pageobjects/myMoldcell-app.page.js'
import loginPage from '../pageobjects/myMoldcell-login.page.js'

describe('My Moldcell positive scenarios', () => {
    it('opens the login screen with its key elements', async () => {
        await appPage.openLoginScreen()

        await expect(loginPage.welcomeTitle).toBeDisplayed()
        await expect(loginPage.welcomeSubtitle).toBeDisplayed()
        await expect(loginPage.phoneOrEmailInput).toBeDisplayed()
        await expect(loginPage.passwordInput).toBeDisplayed()
        await expect(loginPage.loginButton).toBeDisplayed()
    })
})