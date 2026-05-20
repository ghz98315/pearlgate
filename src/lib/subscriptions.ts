import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscriptions.json");

export type PlanType = "free" | "pro" | "agency";

export interface Subscription {
  userId: string;
  email: string;
  plan: PlanType;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodEnd?: string;
  createdAt: string;
}

async function readSubscriptions(): Promise<Subscription[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSubscriptions(subs: Subscription[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(subs, null, 2));
}

export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  const subs = await readSubscriptions();
  return subs.find((s) => s.userId === userId) || null;
}

export async function getUserPlan(userId: string): Promise<PlanType> {
  const sub = await getUserSubscription(userId);
  if (!sub) return "free";
  if (sub.currentPeriodEnd && new Date(sub.currentPeriodEnd) < new Date()) return "free";
  return sub.plan;
}

export async function upsertSubscription(data: Partial<Subscription> & { userId: string; email: string }): Promise<void> {
  const subs = await readSubscriptions();
  const index = subs.findIndex((s) => s.userId === data.userId);

  if (index >= 0) {
    subs[index] = { ...subs[index], ...data };
  } else {
    subs.push({
      plan: "free",
      createdAt: new Date().toISOString(),
      ...data,
    } as Subscription);
  }

  await writeSubscriptions(subs);
}
