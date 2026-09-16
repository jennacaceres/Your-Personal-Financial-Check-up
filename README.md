# Kumusta Pera Mo? — Premium V2 (Lead Mapping Fix)

Upload/replace these files in the SAME GitHub repository connected to Vercel.

Fixed website → Apps Script field mapping:
- name → fullName
- mobile → contactNumber
- eventType → action

The Google Apps Script endpoint remains unchanged.

After GitHub commit and Vercel redeploy, submit a NEW test response.
The new Google Sheets row should populate Full Name and Contact Number.
Discovery Call requests should also use the `action` field expected by Apps Script.
