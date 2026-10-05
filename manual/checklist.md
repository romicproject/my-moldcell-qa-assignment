# Manual Test Checklist

**Application:** my moldcell  
**Device:** Realme 6  
**Android:** 11  
**App version:** [fill in before submission]  
**Access limitation:** No active Moldcell number

| ID | Check | Priority | Result | Comment |
|---|---|---|---|---|
| TC-01 | Cold launch / startup flow | High | Passed | App started normally after Force Stop and reached the first usable screen. |
| TC-02 | Language switch and persistence | Medium | Failed | Main UI switched to English, but Online Shop remained in Romanian after Force Stop and relaunch. See BUG-01. |
| TC-03 | Registration method navigation | High | Passed | Both registration methods were reachable; email registration did not require a Moldcell number. |
| TC-04 | Required fields and invalid email validation | High | Failed | Invalid email values were rejected, but the visual error state could remain after correcting the email. See BUG-02. |
| TC-05 | Password and confirmation validation | High | Passed | Password validation and mismatch handling worked as expected. |
| TC-06 | Consent required before registration | Medium | Passed | Registration could not continue until the required consent was selected. |
| TC-07 | Valid email registration reaches OTP | High | Passed | Registration reached the OTP screen and displayed the expected email address. |
| TC-08 | OTP validation and resend behavior | High | Blocked | OTP screen was reached, but the verification email/code was not received. Full OTP validation and resend checks could not be completed. |
| TC-09 | Forgot Password / password recovery | High | Passed | Password recovery flow was executed successfully, including valid and invalid input checks. |
| TC-10 | No network / unstable network / recovery | High | Not run | Not executed due to the manual testing time limit. Network loss and recovery scenarios would be covered next. |
| TC-11 | Back navigation and state recovery | High | Passed | Back navigation and form state behaved consistently during the executed checks. |
| TC-12 | Login: invalid Moldcell phone number validation | High | Passed | Empty, incomplete and unsupported phone number formats were rejected. |
| TC-13 | Basic usability / accessibility / responsive UI | Medium | Failed | Some screens did not adapt correctly to the device size. Kept as an additional product risk rather than a separate formal bug. |

## Result Summary

- Passed: 8
- Failed: 3
- Blocked: 1
- Not run: 1
- Total: 13
