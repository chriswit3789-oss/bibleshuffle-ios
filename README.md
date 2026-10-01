# BibleShuffle iOS Build Kit (No Mac Required)

This kit turns your published BibleShuffle web app into a real iOS app and builds
it entirely in GitHub's cloud. You never touch Xcode or a Mac. Everything runs on
GitHub's macOS runners from your Windows PC.

## What's in here

- `capacitor.config.ts` — wraps your published Base44 web app in a native iOS shell
- `.github/workflows/build-ios.yml` — the cloud build: signs, archives, exports an IPA, uploads to TestFlight
- `ExportOptions.plist` — tells the build tool this is an App Store/TestFlight build
- `www/index.html` — an offline fallback page (one verse + a "you're offline" note)
- `README.md` — this guide

## One-time setup (about 45 minutes, all from a browser)

### 1. Publish BibleShuffle on Base44
Open BibleShuffle in the Base44 editor and click Publish. Copy the published URL.
You'll paste it into `capacitor.config.ts` (replace `YOUR-BIBLESHUFFLE-URL.base44.app`).

### 2. Enroll in the Apple Developer Program
https://developer.apple.com/programs — $99 USD per year. You can do this from any
browser. After enrollment, note your **Team ID** (App Store Connect > Users and
Access > view your team details).

### 3. Create the app record in App Store Connect
- App Store Connect > My Apps > "+" > New App
- Platform: iOS. Name: BibleShuffle. Language: English.
- Bundle ID: create one, e.g. `com.chriswitowski.bibleshuffle` (must be unique).
- Use that exact bundle ID in `capacitor.config.ts` (`appId`).

### 4. Create an App Store Connect API key
- App Store Connect > Users and Access > Integrations (or Keys) > "+" 
- Role: **App Manager** (enough for signing + TestFlight).
- Download the `.p8` file, note the **Key ID** and **Issuer ID** shown on the page.
- Base64-encode the .p8 file. On Windows PowerShell:
  `[Convert]::ToBase64String([IO.File.ReadAllBytes("AuthKey_XXXXXXXXXX.p8"))`
  Copy that whole string.

### 5. Put this folder in a GitHub repository
Create a repo on GitHub (make it **public** if you're on a free plan — GitHub's
macOS runners cost 10x minutes on private repos). Push all these files to the
`main` branch (GitHub's website lets you upload files in the browser, no git
commands needed).

### 6. Add four secrets to the repo
GitHub repo > Settings > Secrets and variables > Actions > New repository secret:

| Secret name | Value |
|---|---|
| `ASC_KEY_ID` | the Key ID from step 4 |
| `ASC_ISSUER_ID` | the Issuer ID from step 4 |
| `ASC_KEY_CONTENT` | the base64 string you copied in step 4 |
| (none needed) | Team ID goes in `ExportOptions.plist`, not a secret |

Also edit `ExportOptions.plist` and replace `YOUR_TEAM_ID`, and edit
`capacitor.config.ts` with your real bundle ID and published URL. Commit those
edits (can be done in the GitHub web editor).

## Build it

Repo > Actions > "iOS Build (no Mac needed)" > Run workflow.
~15-25 minutes later:
- **Artifacts**: a signed `BibleShuffle.ipa`
- **TestFlight**: the build appears in App Store Connect > TestFlight

Install the free TestFlight app on your iPhone, and your build is right there
to install. That also solves your screenshots problem: install the build on your
iPhone and screenshot the real app directly (Apple accepts device screenshots).

## Getting on the App Store

Once the build is in TestFlight: App Store Connect > your app > App Store tab —
paste in your promo text (170 chars) and description, add the screenshots,
submit for review.

## Important: Apple's minimum-functionality rule (4.2)

Apple sometimes rejects apps that are just a website wrapped in a shell. This kit
mitigates it with an offline fallback page, but before submitting for real review
you should add native-feeling features. Good candidates (all buildable in Base44):
- Store the verse database in the app itself so it fully works offline
- Save/favorite verses
- Share verse as image
- Widget or daily verse notification

Each of those makes the app feel like an app, and they're also great "growing
over time" features for your listing.

## Costs

- Apple Developer Program: $99/year
- GitHub Actions: free on public repos; on private repos, macOS minutes bill at
  ~10x Linux rate (a ~20 min build ≈ 200 billed minutes)
- Base44: whatever plan you're already on
