# My Moldcell QA Assignment

This repository contains the manual testing results and Appium UI automation for the **my moldcell** Android application.

## Project Structure

```text
manual/
  checklist.md
  bugs.md
  summary.md
  evidence/

test/
  pageobjects/
  specs/

wdio.conf.js
package.json
package-lock.json
.env.example
```

## Requirements

- Node.js and npm
- Android Studio with:
  - an Android emulator with Google Play, or
  - a physical Android device with USB debugging enabled
- Appium with the UiAutomator2 driver installed
- **my moldcell** installed from Google Play on the test device
- `adb` and `appium` available in `PATH`

## Installation

From the project root:

```powershell
npm ci
```

Install Appium and the UiAutomator2 driver if they are not already installed:

```powershell
npm install --global appium
appium driver install uiautomator2
```

If the Android SDK is not already configured in the current PowerShell session, set the required environment variables:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path = "$env:ANDROID_HOME\platform-tools;$env:Path"
```

## Running the Automation Tests

Start the emulator or connect the Android device, then run the full automation suite with:

```powershell
npm test
```

The current test suite contains two independent scenarios:

- **Positive scenario** — verifies that the application launches successfully and that the main login screen elements are displayed.
- **Negative scenario** — enters the incomplete test value `123` and verifies the validation response.

The positive scenario does not perform a real authentication.

Each Appium session resets the application state. The test flow handles the language/welcome screen only when it is displayed.

## Optional Environment Variables

The configuration detects the launch activity for the package:

```text
md.moldcell.selfservice
```

If the connected device is not `emulator-5554`, set the device UDID before running the tests:

```powershell
$env:ANDROID_UDID = "your-device-udid"
```

The application package and activity can also be overridden if needed:

```powershell
$env:APP_PACKAGE = "package.name"
$env:APP_ACTIVITY = "activity.name"
```

Local values stored in `.env` are not used by the current scenarios. They are reserved for possible future authenticated test flows.

## UiAutomator2 Server Reuse

If UiAutomator2 is already installed and working on the current emulator, test startup can be temporarily accelerated with:

```powershell
$env:APPIUM_SKIP_SERVER_INSTALLATION = 'true'
npm test
```

Do not use this option on a new or reset emulator, because the driver must be able to install its server components on the device.

## Test Results

WebdriverIO reports the result of each test and assertion in the terminal.

If a test fails, the `afterTest` hook logs the failure and attempts to save a screenshot under:

```text
artifacts/screenshots/
```

## Manual Testing

Manual testing results are available under:

```text
manual/checklist.md
manual/bugs.md
manual/summary.md
```

Supporting screenshots should be stored under:

```text
manual/evidence/
```

The manual scope focuses on the unauthenticated and partially accessible areas of the application, including:

- application launch
- registration
- field validation
- password recovery
- navigation
- localization
- OTP-related behavior
- usability and responsive UI checks

## Test Limitations

- No active Moldcell subscriber number was available.
- Subscriber-specific authenticated scenarios were not fully covered.
- OTP validation was partially blocked because the verification code was not received.
- Network loss/recovery testing was not completed within the manual testing time limit.

## Excluded Files

The following are excluded through `.gitignore`:

- `node_modules/`
- APK files
- `.env`
- logs
- generated test artifacts
- local IDE/system files

The Android SDK must be installed outside the project.

No secrets, credentials, local SDK paths, or dependencies are committed to the repository.
