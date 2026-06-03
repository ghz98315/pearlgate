export interface QuoteFormData {
  name: string;
  email: string;
  company?: string;
  category: string;
  product: string;
  quantity: string;
  targetPrice?: string;
  details?: string;
  source?: string;
}

export interface SampleRequestData {
  fullName: string;
  company: string;
  email: string;
  whatsapp: string;
  country: string;
  targetMarket: string;
  chargingStandard: string;
  certificationsNeeded: string[];
  intendedUse: string;
  estimatedVolume: string;
  oemRequirements: string;
  message: string;
  productName: string;
  productCategory: string;
  productUrl: string;
  referenceId: string;
}

export function buildCustomerConfirmationEmail(data: QuoteFormData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1e293b;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 20px; font-weight: 700; margin: 0;">PearlGate</h1>
    <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Your Sourcing Partner in Guangdong</p>
  </div>

  <h2 style="font-size: 18px; margin-bottom: 16px;">Hi ${data.name},</h2>

  <p style="line-height: 1.6; color: #334155;">
    Thanks for reaching out! I've received your sourcing request for <strong>${data.category}</strong> and will start working on it right away.
  </p>

  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="font-size: 14px; font-weight: 600; margin: 0 0 12px;">What happens next:</p>
    <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 2;">
      <li>I review your requirements (today)</li>
      <li>I contact 3+ verified factories for quotes</li>
      <li>You receive a comparison within 48 hours</li>
    </ol>
  </div>

  <p style="line-height: 1.6; color: #334155;">
    If you have drawings, reference images, or additional specs — just reply to this email and attach them.
  </p>

  <p style="line-height: 1.6; color: #334155; margin-top: 24px;">
    Talk soon,<br>
    <strong>PearlGate Team</strong><br>
    <span style="color: #64748b; font-size: 13px;">Former BYD Technical Manager · Based in Guangdong</span>
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0 16px;">
  <p style="color: #94a3b8; font-size: 12px; text-align: center;">
    This is an automated confirmation. You can reply directly to this email.
  </p>
</body>
</html>`.trim();
}

export function buildAdminNotificationEmail(data: QuoteFormData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1e293b;">
  <h2 style="font-size: 18px; color: #dc2626; margin-bottom: 8px;">New Quote Request</h2>
  <p style="color: #64748b; font-size: 13px; margin-top: 0;">Submitted at ${new Date().toISOString()}</p>

  <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; width: 140px; color: #475569;">Name</td>
      <td style="padding: 10px 0;">${data.name}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Email</td>
      <td style="padding: 10px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
    </tr>
    ${data.company ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Company</td>
      <td style="padding: 10px 0;">${data.company}</td>
    </tr>` : ""}
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Category</td>
      <td style="padding: 10px 0;">${data.category}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Product</td>
      <td style="padding: 10px 0;">${data.product}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Quantity</td>
      <td style="padding: 10px 0;">${data.quantity}</td>
    </tr>
    ${data.targetPrice ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Target Price</td>
      <td style="padding: 10px 0;">${data.targetPrice}</td>
    </tr>` : ""}
    ${data.details ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Details</td>
      <td style="padding: 10px 0;">${data.details}</td>
    </tr>` : ""}
    ${data.source ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Source</td>
      <td style="padding: 10px 0;">${data.source}</td>
    </tr>` : ""}
  </table>

  <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 8px;">
    <p style="margin: 0; font-size: 13px; color: #92400e;">
      Reply to the customer within 24h. Their email: <strong>${data.email}</strong>
    </p>
  </div>
</body>
</html>`.trim();
}

export function buildSampleRequestConfirmationEmail(data: SampleRequestData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1e293b;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="font-size: 20px; font-weight: 700; margin: 0;">PearlGate</h1>
    <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Your EVSE & Connector Specialists</p>
  </div>

  <h2 style="font-size: 18px; margin-bottom: 16px;">Hi ${data.fullName},</h2>

  <p style="line-height: 1.6; color: #334155;">
    Thank you for your interest in our EVSE & charging cable products!
  </p>

  <div style="background: #fff7ed; border: 2px solid #fb923c; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
    <p style="font-size: 14px; font-weight: 600; color: #9a3412; margin: 0 0 8px;">Your Reference ID</p>
    <p style="font-size: 24px; font-weight: 700; color: #ea580c; margin: 0;">${data.referenceId}</p>
  </div>

  <p style="line-height: 1.6; color: #334155;">
    We have received your inquiry for: <strong>${data.productName}</strong>
  </p>

  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="font-size: 14px; font-weight: 600; margin: 0 0 12px;">What happens next:</p>
    <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 2;">
      <li>Confirmation email sent (now)</li>
      <li>We verify certifications and match you with 2-3 suitable OEMs</li>
      <li>You receive detailed response within 48 hours</li>
    </ol>
  </div>

  <div style="background: #f0fdfa; border: 1px solid #5eead4; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="font-size: 14px; font-weight: 600; margin: 0 0 12px; color: #115e59;">Need to reach us sooner?</p>
    <p style="margin: 0; color: #0f766e; font-size: 14px; line-height: 1.8;">
      📧 Email: Alex.Guan@pearlgatesourcing.com<br>
      💬 WhatsApp: [配置中]<br>
      🔗 LinkedIn: [配置中]
    </p>
  </div>

  <p style="line-height: 1.6; color: #334155; margin-top: 24px;">
    Best regards,<br>
    <strong>PearlGate Sourcing Team</strong><br>
    <span style="color: #64748b; font-size: 13px;">Your EVSE & Connector Specialists</span>
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0 16px;">
  <p style="color: #94a3b8; font-size: 12px; text-align: center;">
    This is an automated confirmation. You can reply directly to this email.
  </p>
</body>
</html>`.trim();
}

export function buildSampleRequestNotificationEmail(data: SampleRequestData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1e293b;">
  <h2 style="font-size: 18px; color: #ea580c; margin-bottom: 8px;">New Sample Request</h2>
  <p style="color: #64748b; font-size: 13px; margin-top: 0;">Reference: <strong>${data.referenceId}</strong> · Submitted at ${new Date().toISOString()}</p>

  <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; table-layout: fixed;">
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; width: 180px; color: #475569;">Full Name</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.fullName}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Company</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.company}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Email</td>
      <td style="padding: 10px 0; word-break: break-word;"><a href="mailto:${data.email}">${data.email}</a></td>
    </tr>
    ${data.whatsapp ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">WhatsApp/Phone</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.whatsapp}</td>
    </tr>` : ""}
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Country</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.country}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Target Market</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.targetMarket}</td>
    </tr>
  </table>

  <h3 style="font-size: 16px; margin-top: 24px; margin-bottom: 12px; color: #0f172a;">Product Details</h3>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px; table-layout: fixed;">
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; width: 180px; color: #475569;">Product</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.productName}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Category</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.productCategory}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Product URL</td>
      <td style="padding: 10px 0; word-break: break-all;"><a href="${data.productUrl}">${data.productUrl}</a></td>
    </tr>
    ${data.chargingStandard ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Charging Standard</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.chargingStandard}</td>
    </tr>` : ""}
    ${data.certificationsNeeded.length > 0 ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Certifications</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.certificationsNeeded.join(", ")}</td>
    </tr>` : ""}
    ${data.intendedUse ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Intended Use</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.intendedUse}</td>
    </tr>` : ""}
    ${data.estimatedVolume ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Estimated Volume</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.estimatedVolume}</td>
    </tr>` : ""}
    ${data.oemRequirements ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">OEM Requirements</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.oemRequirements}</td>
    </tr>` : ""}
    ${data.message ? `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 0; font-weight: 600; color: #475569;">Message</td>
      <td style="padding: 10px 0; word-break: break-word;">${data.message}</td>
    </tr>` : ""}
  </table>

  <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border-radius: 8px;">
    <p style="margin: 0; font-size: 13px; color: #92400e;">
      Reply to the customer within 48h. Their email: <strong>${data.email}</strong>
    </p>
  </div>
</body>
</html>`.trim();
}
