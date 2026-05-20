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
