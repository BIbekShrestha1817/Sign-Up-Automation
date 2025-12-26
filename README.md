# Sign Up Automation Test

This is an automated test for the Authorized Partner sign-up page using Cypress.

## What You Need

- Node.js (download from nodejs.org)
- npm (comes with Node.js)

## Setup

1. Open the folder in command prompt/terminal
2. Run this command:
   ```
   npm install
   npm install mailslurp-client  
   ```

3. Get a MailSlurp API key from https://app.mailslurp.com
4. In cypress.config.js add your API to
    const apiKey = 'Your_API';


## How to Run

### Option 1: Run in background (no window)
```
npx cypress run --spec "cypress/e2e/signup_automation_script.cy.js"
```

### Option 2: Run with visual interface (you can see what happens)
```
npx cypress open
```
Then click on the test file to run it.

## What the Test Does

1. Opens the sign-up page
2. Fills in personal details:
   - First Name: Testaa
   - Last Name: Testaa
   - Phone: 98670000024
   - Password: Test@123
3. Waits for OTP email to arrive
4. Automatically extracts the OTP code
5. Enters the OTP to verify email
6. Fills in agency details:
   - Agency Name: Test Agency
   - Role: Manager
   - Email: test@gmail.com
   - Website: www.testagency.com
   - Address: Kathmandu, Nepal
7. Selects region and experience level
8. Submits the form


## Files

- `cypress/e2e/signup_automation_script.cy.js` - The main test
- `cypress.config.js` - Configuration file
- `package.json` - Project info

That's it! Good luck!
