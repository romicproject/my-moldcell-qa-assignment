import { $ } from '@wdio/globals'

class MyMoldcellLoginPage {
    get welcomeTitle () {
        return $('android=new UiSelector().resourceIdMatches(".*login_title_first")')
    }

    get welcomeSubtitle () {
        return $('android=new UiSelector().resourceIdMatches(".*login_title_second")')
    }

    get phoneOrEmailInput () {
        return $('android=new UiSelector().resourceIdMatches(".*login_input")')
    }

    get passwordInput () {
        return $('android=new UiSelector().resourceIdMatches(".*password_input")')
    }

    get loginButton () {
        return $('android=new UiSelector().resourceIdMatches(".*login_button")')
    }

    get usernameValidationMessage () {
        return $('android=new UiSelector().textContains("Numele de utilizator")')
    }

}

export default new MyMoldcellLoginPage()