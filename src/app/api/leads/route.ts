import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appendLead, type NewLead } from "@/lib/leads-store";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Persist to the leads store (survives redeploys when LEADS_DATA_DIR points
    // at a persistent volume). Email is sent regardless, so a failed write here
    // never loses the lead.
    const { record, persisted } = await appendLead(data as NewLead);
    if (!persisted) {
      console.warn("[leads] Not persisted to disk — delivering via email only.");
    }
    console.log("New Lead Captured:", record.id, record.formType);

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const emailFrom = process.env.EMAIL_FROM || "noreply@goldenlandproperty.com.ua";
    const emailTo = process.env.EMAIL_TO || "info@goldenlandproperty.com.ua";
    
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: sanitizeHeader(`New Lead: ${data.formType || "Inquiry"} - ${data.name || "Anonymous"}`),
      text: formatEmailText(data),
      html: formatEmailHtml(data),
    };

    let previewUrl: string | null = null;

    if (smtpUser && smtpPass) {
      // Real inbox delivery (production / configured Gmail).
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for port 465, false for other ports
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully to:", emailTo);
    } else {
      // Demo mode: no real SMTP configured. Send to a disposable Ethereal test
      // inbox so the email can be previewed without any account. This proves the
      // pipeline works; production behaves identically but lands in the real inbox.
      try {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: { user: testAccount.user, pass: testAccount.pass },
        });
        const info = await transporter.sendMail({ ...mailOptions, from: `"Golden Land (demo)" <${testAccount.user}>` });
        previewUrl = nodemailer.getTestMessageUrl(info) || null;
        console.log("Demo email preview URL:", previewUrl);
      } catch (mailErr) {
        console.warn("Demo email failed (offline?). Lead still saved to store.", mailErr);
      }
    }

    return NextResponse.json({ success: true, previewUrl });
  } catch (error) {
    console.error("Error in leads API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/** Escape HTML-special chars so user input can't inject markup into the email. */
function esc(value: unknown): string {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so user input can't inject additional email headers via the subject. */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function formatEmailText(data: any): string {
  const { formType, name, phone, email, interest, message, format, propertyTitle, propertyId, lang } = data;
  let text = `New Lead Captured from Golden Land website:\n\n`;
  text += `Form: ${formType || "N/A"}\n`;
  text += `Name: ${name || "N/A"}\n`;
  text += `Phone: ${phone || "N/A"}\n`;
  text += `Email: ${email || "N/A"}\n`;
  if (interest) text += `Interest: ${interest}\n`;
  if (format) text += `Contact Format: ${format}\n`;
  if (propertyTitle) text += `Property: ${propertyTitle} (ID: ${propertyId || "N/A"})\n`;
  if (message) text += `Message:\n${message}\n`;
  text += `Language: ${lang || "N/A"}\n`;
  text += `Time: ${new Date().toLocaleString("en-US", { timeZone: "Europe/Kiev" })} Kyiv Time\n`;
  return text;
}

function formatEmailHtml(data: any): string {
  const { formType, name, phone, email, interest, message, format, propertyTitle, propertyId, lang } = data;
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; padding: 20px; background-color: #ffffff;">
      <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">🌟 New Lead Captured</h2>
      <p>A new lead has been submitted on the <strong>Golden Land Property</strong> website:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; border: 1px solid #eaeaea; width: 35%;">Form Type</td>
          <td style="padding: 8px; border: 1px solid #eaeaea;">${esc(formType) || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; border: 1px solid #eaeaea;">Name</td>
          <td style="padding: 8px; border: 1px solid #eaeaea;">${esc(name) || "N/A"}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; border: 1px solid #eaeaea;">Phone / WhatsApp</td>
          <td style="padding: 8px; border: 1px solid #eaeaea;">${esc(phone) || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; border: 1px solid #eaeaea;">Email</td>
          <td style="padding: 8px; border: 1px solid #eaeaea;">${esc(email) || "N/A"}</td>
        </tr>
        ${interest ? `
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; border: 1px solid #eaeaea;">Interest Area</td>
          <td style="padding: 8px; border: 1px solid #eaeaea;">${esc(interest)}</td>
        </tr>` : ""}
        ${format ? `
        <tr>
          <td style="padding: 8px; font-weight: bold; border: 1px solid #eaeaea;">Meeting Format</td>
          <td style="padding: 8px; border: 1px solid #eaeaea;">${esc(format)}</td>
        </tr>` : ""}
        ${propertyTitle ? `
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; border: 1px solid #eaeaea;">Property</td>
          <td style="padding: 8px; border: 1px solid #eaeaea;">${esc(propertyTitle)} (${esc(propertyId)})</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px; font-weight: bold; border: 1px solid #eaeaea;">Selected Language</td>
          <td style="padding: 8px; border: 1px solid #eaeaea;">${lang ? esc(String(lang).toUpperCase()) : "N/A"}</td>
        </tr>
      </table>

      ${message ? `
      <div style="margin-top: 20px; background-color: #f5f5f5; padding: 15px; border-left: 4px solid #D4AF37;">
        <h4 style="margin-top: 0; margin-bottom: 10px;">User Message:</h4>
        <p style="margin: 0; white-space: pre-wrap;">${esc(message)}</p>
      </div>` : ""}

      <p style="font-size: 12px; color: #888888; margin-top: 25px; text-align: center; border-top: 1px solid #eaeaea; padding-top: 15px;">
        Sent automatically from Golden Land Property server.
      </p>
    </div>
  `;
}
