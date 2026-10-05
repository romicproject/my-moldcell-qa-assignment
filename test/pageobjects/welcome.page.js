import { $ } from '@wdio/globals'

class WelcomePage {
    get romanianOption () {
        return $('id=md.moldcell.selfservice:id/radio_btn_ro')
    }

    get continueButton () {
        return $('id=md.moldcell.selfservice:id/btn_change_language')
    }
}

export default new WelcomePage()