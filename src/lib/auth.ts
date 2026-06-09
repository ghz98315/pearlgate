import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "./supabase";

const BCRYPT_ROUNDS = 10;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<AuthUser | null> {
  const normalized = normalizeEmail(email);
  const supabase = getSupabaseAdmin();

  const { data: existing, error: selErr } = await supabase
    .from("auth_users")
    .select("id")
    .eq("email", normalized)
    .maybeSingle();

  if (selErr) {
    console.error("[auth] createUser select 失败:", selErr);
    return null;
  }
  if (existing) return null;

  const password_hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const { data: inserted, error: insErr } = await supabase
    .from("auth_users")
    .insert([{ email: normalized, password_hash, name }])
    .select("id, email, name")
    .single();

  if (insErr || !inserted) {
    console.error("[auth] createUser insert 失败:", insErr);
    return null;
  }

  return {
    id: inserted.id as string,
    email: inserted.email as string,
    name: inserted.name as string,
  };
}

async function verifyCredentials(
  email: string,
  password: string
): Promise<AuthUser | null> {
  const normalized = normalizeEmail(email);
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("auth_users")
    .select("id, email, name, password_hash")
    .eq("email", normalized)
    .maybeSingle();

  if (error) {
    console.error("[auth] verify select 失败:", error);
    return null;
  }
  if (!data) return null;

  const ok = await bcrypt.compare(password, data.password_hash as string);
  if (!ok) return null;

  // 异步更新 last_login_at,失败不影响登录
  void supabase
    .from("auth_users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", data.id as string)
    .then(({ error: updErr }) => {
      if (updErr) console.error("[auth] last_login_at 更新失败:", updErr);
    });

  return {
    id: data.id as string,
    email: data.email as string,
    name: data.name as string,
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        return verifyCredentials(
          String(credentials.email),
          String(credentials.password)
        );
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
