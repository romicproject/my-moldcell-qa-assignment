# Defects

## BUG-01 - Online Shop content remains in Romanian after switching the application language to English

**Severity:** Medium  
**Priority:** Medium

### Environment

- Device: Realme 6
- Android: 11
- Application: my moldcell
- App version: 1.43.1 (12524)
- Initial language: Romanian
- Selected language: English

### Preconditions

- my moldcell is installed and launched.
- Romanian is selected as the application language.

### Steps to reproduce

1. Launch my moldcell.
2. Verify that the application language is Romanian.
3. Open the application settings.
4. Change the language from Romanian to English.
5. Verify that the main application UI changes to English.
6. Open Online Shop.
7. Check the language of the Online Shop content.
8. Force Stop the application.
9. Relaunch it.
10. Verify that English is still selected.
11. Open Online Shop again.

### Actual result

The main application UI is displayed in English, but Online Shop content remains in Romanian. The issue is still reproducible after Force Stop and relaunch.

### Expected result

Online Shop content should be displayed in English when English is selected as the application language.

### Reproducibility

Reproducible.

### Evidence

`evidence/BUG-01_online-shop-language.png`

---

## BUG-02 - Email validation error state is not cleared after correcting an invalid email address

**Severity:** Low  
**Priority:** Medium

### Environment

- Device: Realme 6
- Android: 11
- Application: my moldcell
- App version: 1.43.1 (12524)
- Registration method: Email

### Preconditions

- my moldcell is launched.
- The email registration form is open.

### Steps to reproduce

1. Open the registration flow.
2. Select registration with email.
3. Enter an invalid email address.
4. Enter a valid password and confirm it.
5. Trigger validation so that the email field is highlighted in red.
6. Replace the invalid email with a valid email address.
7. Complete the remaining required fields and consent.
8. Observe the email field and the Confirm button.
9. Tap Confirm.

### Actual result

The email field remains highlighted in red after the value is corrected, although the Confirm button becomes enabled and the user can continue.

### Expected result

Once the email address is corrected to a valid value, the validation error state should be cleared and the field should no longer be highlighted in red.

### Reproducibility

Reproducible.

### Evidence

`evidence/BUG-02_email-validation-state.png`
