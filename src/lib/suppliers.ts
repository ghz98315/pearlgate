import { supabaseAdmin } from "./supabase";

export interface Supplier {
  id: string;
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

function rowToSupplier(row: Record<string, unknown>): Supplier {
  return {
    id: row.slug as string,
    name: row.name as string,
    nameZh: row.name_zh as string,
    city: row.city as string,
    cluster: row.cluster as string,
    established: row.established as number,
    employees: row.employees as string,
    categories: row.categories as string[],
    certifications: row.certifications as string[],
    isDirectFactory: row.is_direct_factory as boolean,
    verifiedDate: row.verified_date as string,
    cooperationRating: row.cooperation_rating as number,
    qualityRating: row.quality_rating as number,
    moq: row.moq as string,
    priceRange: row.price_range as string,
    sampleLeadTime: row.sample_lead_time as string,
    productionLeadTime: row.production_lead_time as string,
    paymentMethods: row.payment_methods as string[],
    shippingPort: row.shipping_port as string,
    images: row.images as string[],
    productImages: row.product_images as string[],
    contactName: row.contact_name as string,
    contactEmail: row.contact_email as string,
    contactWechat: row.contact_wechat as string,
    description: row.description as string,
    specialties: row.specialties as string[],
    isFree: row.is_free as boolean,
  };
}
const FALLBACK_SUPPLIERS: Supplier[] = [
  {
    id: "dongguan-xinghe-precision",
    name: "Dongguan Xinghe Precision Technology Co., Ltd.",
    nameZh: "东莞星河精密技术股份有限公司",
    city: "Dongguan",
    cluster: "Precision Die Casting & Molds",
    established: 1998,
    employees: "200-500",
    categories: ["Aluminum Die Casting", "Zinc Die Casting", "Magnesium Die Casting", "Connectors", "Auto Parts"],
    certifications: ["ISO 9001", "ISO 14001", "IATF 16949", "ISO 45001", "ISO 27001"],
    isDirectFactory: true,
    verifiedDate: "2026-05-20",
    cooperationRating: 5,
    qualityRating: 5,
    moq: "500 pcs / 1 set (molds)",
    priceRange: "$0.5-50 per part / $3000-30000 per mold",
    sampleLeadTime: "7-10 days",
    productionLeadTime: "25-45 days",
    paymentMethods: ["T/T", "L/C"],
    shippingPort: "Shenzhen Yantian Port",
    images: ["/suppliers/xinghe-factory.jpg"],
    productImages: ["/suppliers/xinghe-product.jpg", "/suppliers/xinghe-product-02.png"],
    contactName: "Sales Dept",
    contactEmail: "info@xinghecast.com",
    contactWechat: "xinghe_sales",
    description: "Founded in 1998, Xinghe is a publicly-structured precision die casting manufacturer with 26 years of experience. Specializing in aluminum, zinc, and magnesium alloy die casting for automotive, optical communication, and connector industries.",
    specialties: ["Multi-alloy die casting (Al/Zn/Mg)", "Automotive components", "Optical communication parts", "Metal stamping & plastic injection"],
    isFree: true,
  },
];

export async function getAllSuppliers(): Promise<Supplier[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const { data, error } = await supabaseAdmin
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false })
      .abortSignal(controller.signal);

    clearTimeout(timeout);

    if (error || !data || data.length === 0) {
      return FALLBACK_SUPPLIERS;
    }

    return data.map(rowToSupplier);
  } catch {
    return FALLBACK_SUPPLIERS;
  }
}

export async function getSupplierById(id: string): Promise<Supplier | undefined> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const { data, error } = await supabaseAdmin
      .from("suppliers")
      .select("*")
      .eq("slug", id)
      .abortSignal(controller.signal)
      .single();

    clearTimeout(timeout);

    if (error || !data) {
      return FALLBACK_SUPPLIERS.find((s) => s.id === id);
    }

    return rowToSupplier(data);
  } catch {
    return FALLBACK_SUPPLIERS.find((s) => s.id === id);
  }
}

export async function getFreeSuppliers(): Promise<Supplier[]> {
  const all = await getAllSuppliers();
  return all.filter((s) => s.isFree);
}

export async function getLockedSuppliers(): Promise<Supplier[]> {
  const all = await getAllSuppliers();
  return all.filter((s) => !s.isFree);
}
