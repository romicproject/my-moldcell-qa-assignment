# Teste Appium pentru My Moldcell

## Cerințe

- Node.js și npm
- Android Studio cu un emulator Android care include Google Play sau un telefon Android cu USB debugging activat
- Appium cu driverul UiAutomator2 instalat
- Aplicația My Moldcell instalată din Google Play pe dispozitivul de test
- Comenzile `adb` și `appium` disponibile în `PATH`

## Instalare

Din directorul proiectului:

```powershell
npm ci
```

Instalează Appium și driverul UiAutomator2 dacă lipsesc:

```powershell
npm install --global appium
appium driver install uiautomator2
```

Dacă Android SDK nu este deja configurat în sesiunea PowerShell, setează variabilele folosind locația implicită Android Studio:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
$env:Path = "$env:ANDROID_HOME\platform-tools;$env:Path"
```

## Rulare

Pornește emulatorul sau conectează telefonul, apoi rulează toate testele cu:

```powershell
npm test
```

Datele locale din `.env` nu sunt folosite de scenariile curente; vor fi necesare când se adaugă automatizarea autentificării.

Pe un emulator pe care UiAutomator2 a fost deja instalat cu succes, rularea se poate accelera temporar astfel:

```powershell
$env:APPIUM_SKIP_SERVER_INSTALLATION = 'true'
npm test
```

Nu activa această opțiune pentru un emulator nou sau resetat; driverul trebuie să poată instala serverul pe dispozitiv.

Configurația detectează automat activitatea de pornire a pachetului `md.moldcell.selfservice` prin ADB. Dacă folosești alt dispozitiv decât `emulator-5554`, setează variabila `ANDROID_UDID` înainte de rulare. Pentru suprascrierea pachetului sau activității se pot seta `APP_PACKAGE` și `APP_ACTIVITY`.

## Rezultate

WDIO afișează rezultatul fiecărui test și assertion-urile în terminal. La eșec, hook-ul înregistrează eroarea și încearcă să salveze un screenshot în `artifacts/screenshots/`.

Suita include un scenariu pozitiv care verifică ecranul de login și elementele sale principale și un scenariu negativ cu numărul incomplet fictiv `123`. Fiecare sesiune resetează starea aplicației și parcurge alegerea limbii doar dacă ecranul de welcome este afișat. Scenariul pozitiv nu efectuează autentificarea.

## Fișiere excluse

`node_modules`, APK-urile, fișierele `.env`, logurile și artefactele de test sunt excluse prin `.gitignore`. SDK-ul Android trebuie instalat în afara proiectului; configurația folosește `adb` din `PATH` și nu include căi locale sau credențiale.