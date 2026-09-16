const OWNER_EMAIL = 'plukjennaruthcaceres@gmail.com';
const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    const headers = ['Timestamp','Event','Full Name','Profession','Education','Email','Mobile','Marketing Opt-in','Score','Priority 1','Priority 2','Priority 3','Stronger Areas','Page URL'];
    if (sheet.getLastRow() === 0) sheet.appendRow(headers);

    sheet.appendRow([
      new Date(), data.eventType || '', data.name || '', data.profession || '', data.education || '',
      data.email || '', data.mobile || '', data.marketingOptIn ? 'Yes' : 'No', data.score || '',
      data.priority1 || '', data.priority2 || '', data.priority3 || '', data.strengths || '', data.pageUrl || ''
    ]);

    if (data.eventType === 'discovery_call_requested') {
      const h = Number(Utilities.formatDate(new Date(), 'Asia/Manila', 'H'));
      const timing = (h >= 10 && h < 20)
        ? 'Request received between 10 AM and 8 PM — target callback: within approximately 1 hour.'
        : 'Request received outside 10 AM–8 PM — target callback: first thing in the morning.';
      MailApp.sendEmail({
        to: OWNER_EMAIL,
        subject: '📞 New Discovery Call Request — ' + (data.name || 'New Lead'),
        htmlBody: `<h2>New Discovery Call Request</h2>
          <p><b>Name:</b> ${esc(data.name)}</p><p><b>Mobile:</b> ${esc(data.mobile)}</p><p><b>Email:</b> ${esc(data.email)}</p>
          <p><b>Profession:</b> ${esc(data.profession)}</p><p><b>Score:</b> ${esc(data.score)}/100</p>
          <p><b>Top priorities:</b> ${esc(data.priority1)} • ${esc(data.priority2)} • ${esc(data.priority3)}</p>
          <p><b>Callback:</b> ${timing}</p>`
      });
    }

    if (data.eventType === 'appointment_link_clicked') {
      MailApp.sendEmail({
        to: OWNER_EMAIL,
        subject: '📅 Calendly Opened — ' + (data.name || 'New Lead'),
        htmlBody: `<h2>A lead opened your Calendly booking page</h2>
          <p><b>Name:</b> ${esc(data.name)}</p><p><b>Mobile:</b> ${esc(data.mobile)}</p><p><b>Email:</b> ${esc(data.email)}</p>
          <p>This records the Calendly click only. Treat the appointment as booked only after Calendly sends its booking confirmation.</p>`
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}

function esc(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
