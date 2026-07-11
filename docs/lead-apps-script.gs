/**
 * Madhavbaug Landing-Page Lead Handler (Google Apps Script)
 * ---------------------------------------------------------
 * Receives lead form submissions from the website, appends a row to the
 * Google Sheet, and emails a notification to danish@healthus.ai.
 *
 * SHEET: https://docs.google.com/spreadsheets/d/1AUTnCIF_z3taArCmKGwf-lR8KK38srAGO-DI83oXBbY/edit
 *
 * ── SETUP ────────────────────────────────────────────────────────────────
 * 1. Open the Google Sheet above.
 * 2. Extensions ▸ Apps Script. Paste this whole file (replace any default code).
 * 3. Deploy ▸ New deployment ▸ type "Web app".
 *      - Execute as:  Me
 *      - Who has access:  Anyone
 *    Click Deploy, authorise access when prompted, and COPY the Web app URL
 *    (looks like https://script.google.com/macros/s/XXXX/exec).
 * 4. In the Next.js app, set the env var:
 *      LEAD_WEBHOOK_URL = <the Web app URL you copied>
 *    (add it to .env.local locally and to the hosting provider's env in prod),
 *    then restart / redeploy.
 *
 * The website posts JSON: { name, phone, message, source, submittedAt }
 */

var SHEET_ID = "1AUTnCIF_z3taArCmKGwf-lR8KK38srAGO-DI83oXBbY";
var SHEET_NAME = "Sheet1"; // change if your tab has a different name
var NOTIFY_EMAIL = "danish@healthus.ai";

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    var name = String(data.name || "").trim();
    var phone = String(data.phone || "").trim();
    var pin = String(data.pin || "").trim();
    var source = String(data.source || "Landing Page").trim();
    var when = data.submittedAt ? new Date(data.submittedAt) : new Date();

    // 1) Append to the sheet
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "PIN Code", "Source"]);
    }
    sheet.appendRow([when, name, phone, pin, source]);

    // 2) Email notification
    var body =
      "New lead from the Madhavbaug landing page:\n\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "PIN Code: " + (pin || "-") + "\n" +
      "Source: " + source + "\n" +
      "Time: " + when + "\n";
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New Lead - " + source + " - " + name,
      body: body,
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, service: "Madhavbaug lead handler" });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
