# Manual Testing Summary

## Environment

- Device: Realme 6
- Android: 11
- Application: my moldcell
- App version: 1.43.1 (12524)
- Access: No active Moldcell number

## What was tested

Manual testing focused on the unauthenticated and partially accessible areas of the application:

- application launch
- language switching and persistence
- registration method navigation
- email and password validation
- consent handling
- email registration up to the OTP step
- password recovery
- invalid Moldcell phone number validation
- Back navigation and state handling
- basic usability, accessibility and responsive layout

## Test result

13 checks were included in the final checklist:

- 8 Passed
- 3 Failed
- 1 Blocked
- 1 Not run

The OTP validation/resend flow was blocked because the verification email/code was not received. The network loss/recovery scenario was not executed because the manual testing time limit was reached.

## Defects and risks

Two defects were selected for formal reporting:

1. **BUG-01:** Online Shop remains in Romanian after the application language is changed to English.
2. **BUG-02:** The email field can remain visually marked as invalid after the email is corrected, while Confirm becomes enabled.

Additional exploratory observations:

- some screens were not fully responsive on the tested device;
- localization was not fully consistent, especially in Russian, where mixed Romanian/Russian content was observed on some screens.

These additional observations were kept as product risks rather than separate formal defects because the assignment limits the defect report to the most relevant findings.

## What I would test next with one additional working day

I would focus first on the areas where testing already showed higher risk:

- broader localization checks across Romanian, English and Russian;
- responsive UI checks using different screen sizes, font sizes and display scaling;
- network loss, recovery and unstable-connection behavior during launch, registration and confirmation flows;
- additional registration/validation edge cases, especially state transitions such as invalid -> valid -> invalid input;
- OTP resend, expiry and old-code behavior if the verification code becomes available;
- authenticated/subscriber-specific flows if a dedicated Moldcell test number/account is provided;
- a second Android device/version for the highest-risk scenarios.

## Time spent

- Manual testing: 120 min
- Automation: ~ 180 min
  (Automation took longer than planned mainly due to environment and stability troubleshooting. I had limited previous hands-on experience with Appium/WebdriverIO, and part of the time was spent resolving Appium port/process    conflicts, stabilizing application startup between sessions, improving selectors and assertions, and rerunning the suite to verify that both scenarios were reliable.)
- Report/documentation: 20 min
- Total: 320 min
