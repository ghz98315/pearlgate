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
    id: "yangjiang-kingstar",
    name: "Kingstar Knife Industry Co., Ltd",
    nameZh: "阳江金星刀具实业有限公司",
    city: "Yangjiang",
    cluster: "Knives & Hand Tools",
    established: 2008,
    employees: "200-500",
    categories: ["Kitchen Knives", "Chef Knives", "Knife Sets", "Scissors"],
    certifications: ["ISO 9001", "LFGB", "FDA", "SGS"],
    isDirectFactory: true,
    verifiedDate: "2026-03-15",
    cooperationRating: 5,
    qualityRating: 4,
    moq: "500 pieces",
    priceRange: "$3-12 per unit",
    sampleLeadTime: "5-7 days",
    productionLeadTime: "20-30 days",
    paymentMethods: ["T/T", "PayPal", "L/C"],
    shippingPort: "Guangzhou Port",
    images: ["https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80"],
    productImages: ["https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80"],
    contactName: "David Chen",
    contactEmail: "david@kingstarknife.com",
    contactWechat: "kingstar_david",
    description: "Established in 2008, Kingstar is a leading knife manufacturer in Yangjiang with over 15 years of export experience. Specializing in high-carbon stainless steel kitchen knives, they supply major brands across Europe and North America. Their factory covers 8,000 sqm with 6 production lines and strict QC at every stage.",
    specialties: ["High-carbon stainless steel", "Damascus pattern blades", "Custom handle materials", "OEM/ODM for major brands"],
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
