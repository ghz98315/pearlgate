import { NextRequest, NextResponse } from "next/server";

interface RequestSampleData {
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
}

function generateReferenceId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `PG-${year}${month}${day}-${random}`;
}

async function sendNotificationEmail(data: RequestSampleData, referenceId: string) {
  const notificationBody = `
New Sample Request Received

Reference ID: ${referenceId}

CONTACT INFORMATION
Name: ${data.fullName}
Company: ${data.company}
Email: ${data.email}
WhatsApp/Phone: ${data.whatsapp || "Not provided"}
Country: ${data.country}

PROJECT DETAILS
Target Market: ${data.targetMarket}
Product: ${data.productName || "Not specified"}
Product Category: ${data.productCategory || "Not specified"}
Product URL: ${data.productUrl || "Not specified"}
Charging Standard: ${data.chargingStandard || "Not specified"}
Certifications Needed: ${data.certificationsNeeded.join(", ") || "Not specified"}
Intended Use: ${data.intendedUse || "Not specified"}
Estimated Volume: ${data.estimatedVolume || "Not specified"}
OEM Requirements: ${data.oemRequirements || "Not specified"}

MESSAGE
${data.message || "No additional message"}

---
Submitted at: ${new Date().toISOString()}
  `.trim();

  // TODO: Replace with actual email service (Resend, SendGrid, etc.)
  // For now, just log to console
  console.log("=== NOTIFICATION EMAIL ===");
  console.log(notificationBody);
  console.log("=========================");
}

async function sendConfirmationEmail(data: RequestSampleData, referenceId: string) {
  const confirmationBody = `
Dear ${data.fullName},

Thank you for your interest in our EVSE & charging cable products!

Your sample request has been received successfully.

Reference ID: ${referenceId}

We have received your inquiry for:
${data.productName || "EVSE Product"}

Our team will review your requirements and match you with 2-3 verified OEM manufacturers within 48 hours. You will receive a detailed response at ${data.email}.

In the meantime, if you have urgent questions, feel free to reach us:
- WhatsApp: [TO BE CONFIGURED]
- Email: hello@pearlgatesourcing.com
- LinkedIn: [TO BE CONFIGURED]

Best regards,
PearlGate Sourcing Team
Your EVSE & Connector Specialists
  `.trim();

  // TODO: Replace with actual email service
  console.log("=== CONFIRMATION EMAIL ===");
  console.log(`To: ${data.email}`);
  console.log(confirmationBody);
  console.log("==========================");
}

async function saveToDatabase(data: RequestSampleData, referenceId: string) {
  // TODO: Implement Airtable or Notion integration
  console.log("=== SAVING TO DATABASE ===");
  console.log("Reference ID:", referenceId);
  console.log("Data:", JSON.stringify(data, null, 2));
  console.log("==========================");
}

export async function POST(request: NextRequest) {
  try {
    const data: RequestSampleData = await request.json();

    // Validate required fields
    if (!data.fullName || !data.company || !data.email || !data.country || !data.targetMarket) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Generate reference ID
    const referenceId = generateReferenceId();

    // Process in parallel
    await Promise.all([
      sendNotificationEmail(data, referenceId),
      sendConfirmationEmail(data, referenceId),
      saveToDatabase(data, referenceId),
    ]);

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Sample request submitted successfully",
    });
  } catch (error) {
    console.error("Error processing sample request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
