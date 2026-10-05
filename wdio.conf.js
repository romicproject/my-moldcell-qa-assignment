import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { browser } from '@wdio/globals'

if (fs.existsSync('.env')) {
    process.loadEnvFile('.env')
}

const appPackage = process.env.APP_PACKAGE || 'md.moldcell.selfservice'

function resolveAppActivity () {
    if (process.env.APP_ACTIVITY) {
        return process.env.APP_ACTIVITY
    }

    let activityOutput

    try {
        activityOutput = execFileSync(
            'adb',
            [
                'shell',
                'cmd',
                'package',
                'resolve-activity',
                '--brief',
                appPackage
            ],
            { encoding: 'utf8' }
        )
    } catch (error) {
        throw new Error(
            `Could not resolve ${appPackage} launch activity. ` +
            `Install the app and connect an Android device, or set APP_ACTIVITY. ` +
            error.message
        )
    }

    const component = activityOutput
        .split(/\r?\n/)
        .map(line => line.trim())
        .find(line => line.startsWith(`${appPackage}/`))

    if (!component) {
        throw new Error(
            `No launch activity found for ${appPackage}. ` +
            `Install the app from Google Play or set APP_ACTIVITY.`
        )
    }

    return component.slice(appPackage.length + 1)
}

export const config = {
    runner: 'local',
    port: 4723,

    specs: [
        './test/specs/**/*.js'
    ],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
        'appium:udid': process.env.ANDROID_UDID || 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:skipServerInstallation':
            process.env.APPIUM_SKIP_SERVER_INSTALLATION === 'true',
        'appium:disableWindowAnimation': true,
        'appium:noReset': false,
        'appium:appPackage': appPackage,
        'appium:appActivity': resolveAppActivity(),
        'appium:appWaitActivity': process.env.APP_WAIT_ACTIVITY || '*'
    }],

    logLevel: 'warn',

    bail: 0,

    waitforTimeout: 10000,
    connectionRetryTimeout: 30000,
    connectionRetryCount: 1,

    services: [
        ['appium', {
            command: 'appium'
        }]
    ],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 90000
    },

    before: async function () {
        await browser.updateSettings({
            waitForIdleTimeout: 1000
        })
    },

    afterTest: async function (test, context, { error }) {
        if (!error) {
            return
        }

        const screenshotDirectory = path.resolve(
            'artifacts',
            'screenshots'
        )

        const screenshotName =
            `${Date.now()}-${test.title.replace(/[^a-z0-9-_]/gi, '_')}.png`

        const screenshotPath = path.join(
            screenshotDirectory,
            screenshotName
        )

        fs.mkdirSync(screenshotDirectory, {
            recursive: true
        })

        console.error(
            `Test failed: ${test.title}\n${error.stack || error.message}`
        )

        try {
            await browser.saveScreenshot(screenshotPath)
            console.error(`Screenshot: ${screenshotPath}`)
        } catch (screenshotError) {
            console.error(
                `Could not save screenshot: ${screenshotError.message}`
            )
        }
    }
}