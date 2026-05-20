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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyApiKey(request)) return unauthorized();

  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = {};
  const fieldMap: Record<string, string> = {
    slug: "slug",
    name: "name",
    nameZh: "name_zh",
    city: "city",
    cluster: "cluster",
    established: "established",
    employees: "employees",
    categories: "categories",
    certifications: "certifications",
    isDirectFactory: "is_direct_factory",
    verifiedDate: "verified_date",
    cooperationRating: "cooperation_rating",
    qualityRating: "quality_rating",
    moq: "moq",
    priceRange: "price_range",
    sampleLeadTime: "sample_lead_time",
    productionLeadTime: "production_lead_time",
    paymentMethods: "payment_methods",
    shippingPort: "shipping_port",
    images: "images",
    productImages: "product_images",
    contactName: "contact_name",
    contactEmail: "contact_email",
    contactWechat: "contact_wechat",
    description: "description",
    specialties: "specialties",
    isFree: "is_free",
  };

  for (const [camel, snake] of Object.entries(fieldMap)) {
    if (camel in body) {
      updateData[snake] = body[camel];
    }
  }

  const { data, error } = await supabaseAdmin
    .from("suppliers")
    .update(updateData)
    .eq("slug", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Updated", data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyApiKey(request)) return unauthorized();

  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("suppliers")
    .delete()
    .eq("slug", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: `Deleted supplier: ${id}` });
}
