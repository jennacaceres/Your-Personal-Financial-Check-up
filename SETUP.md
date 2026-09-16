# One-time Google Sheets + email notification setup

## 1. Create the lead tracker
1. In Google Sheets, create a blank spreadsheet named **Kumusta Pera Mo - Leads**.
2. Open **Extensions > Apps Script**.
3. Delete the sample code and paste everything from `Code.gs` in this package.
4. Click **Save**.

## 2. Deploy the Apps Script
1. In Apps Script, click **Deploy > New deployment**.
2. Select **Web app**.
3. Execute as: **Me**.
4. Who has access: **Anyone**.
5. Click **Deploy** and authorize the requested Google permissions.
6. Copy the Web App URL ending in `/exec`.

## 3. Connect the website
1. Open `index.html`.
2. Find: `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`
3. Replace it with your copied `/exec` URL. Keep the single quotes around it.
4. Commit/upload the updated `index.html` to your existing GitHub repository.
5. Vercel will redeploy automatically.

## What happens
- When a visitor reveals their Financial Snapshot, their details and result are added to the **Leads** tab.
- If they request a Discovery Call, an email alert is sent to **plukjennaruthcaceres@gmail.com**.
- If they click Schedule an Appointment, the click is logged and an email alert is sent. The actual confirmed booking should be verified through Calendly's own booking confirmation email.

## Test before sharing publicly
Complete one assessment yourself, confirm a new row appears in the Sheet, request a Discovery Call, and confirm the alert reaches the owner email.
