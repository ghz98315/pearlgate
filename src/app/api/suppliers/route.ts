import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function verifyApiKey(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  return auth.slice(7) === process.env.SUPPLIER_API_KEY;
}

interface SupplierInput {
  slug: string;
  name: string;
  nameZh: string;
  city: string;
  cluster: string;
  established: number;
  employees: string;
  categories: string[];
  certifications: string[];
  isDirectFactory: boolean;
  verifiedDate: string;
  cooperationRating: number;
  qualityRating: number;
  moq: string;
  priceRange: string;
  sampleLeadTime: string;
  productionLeadTime: string;
  paymentMethods: string[];
  shippingPort: string;
  images: string[];
  productImages: string[];
  contactName: string;
  contactEmail: string;
  contactWechat: string;
  description: string;
  specialties: string[];
  isFree: boolean;
}

function toDbRow(input: SupplierInput) {
  return {
    slug: input.slug,
    name: input.name,
    name_zh: input.nameZh,
    city: input.city,
    cluster: input.cluster,
    established: input.established,
    employees: input.employees,
    categories: input.categories,
    certifications: input.certifications,
    is_direct_factory: input.isDirectFactory,
    verified_date: input.verifiedDate,
    cooperation_rating: input.cooperationRating,
    quality_rating: input.qualityRating,
    moq: input.moq,
    price_range: input.priceRange,
    sample_lead_time: input.sampleLeadTime,
    production_lead_time: input.productionLeadTime,
    payment_methods: input.paymentMethods,
    shipping_port: input.shippingPort,
    images: input.images,
    product_images: input.productImages,
    contact_name: input.contactName,
    contact_email: input.contactEmail,
    contact_wechat: input.contactWechat,
    description: input.description,
    specialties: input.specialties,
    is_free: input.isFree,
  };
}
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("suppliers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ suppliers: data, count: data.length });
}

export async function POST(request: NextRequest) {
  if (!verifyApiKey(request)) return unauthorized();

  const body = await request.json();
  const items: SupplierInput[] = body.suppliers
    ? Array.isArray(body.suppliers) ? body.suppliers : [body.suppliers]
    : Array.isArray(body) ? body : [body];

  if (items.length > 100) {
    return NextResponse.json(
      { error: "Maximum 100 suppliers per request" },
      { status: 400 }
    );
  }

  const rows = items.map(toDbRow);

  const { data, error } = await supabaseAdmin
    .from("suppliers")
    .upsert(rows, { onConflict: "slug" })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: `Successfully upserted ${data.length} suppliers`, data },
    { status: 201 }
  );
}
