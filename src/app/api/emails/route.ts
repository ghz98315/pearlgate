import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "emails.json");

interface EmailEntry {
  email: string;
  source: string;
  timestamp: string;
}

async function readEmails(): Promise<EmailEntry[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeEmails(emails: EmailEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(emails, null, 2));
}

export async function POST(request: NextRequest) {
  const { email, source } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const emails = await readEmails();
  const exists = emails.some((e) => e.email === email);

  if (!exists) {
    emails.push({
      email,
      source: source || "unknown",
      timestamp: new Date().toISOString(),
    });
    await writeEmails(emails);
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const emails = await readEmails();
  return NextResponse.json(emails);
}
