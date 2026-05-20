import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const seedData = [
  {
    slug: "yangjiang-kingstar",
    name: "Kingstar Knife Industry Co., Ltd",
    name_zh: "阳江金星刀具实业有限公司",
    city: "Yangjiang",
    cluster: "Knives & Hand Tools",
    established: 2008,
    employees: "200-500",
    categories: ["Kitchen Knives", "Chef Knives", "Knife Sets", "Scissors"],
    certifications: ["ISO 9001", "LFGB", "FDA", "SGS"],
    is_direct_factory: true,
    verified_date: "2026-03-15",
    cooperation_rating: 5,
    quality_rating: 4,
    moq: "500 pieces",
    price_range: "$3-12 per unit",
    sample_lead_time: "5-7 days",
    production_lead_time: "20-30 days",
    payment_methods: ["T/T", "PayPal", "L/C"],
    shipping_port: "Guangzhou Port",
    images: ["https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80"],
    product_images: ["https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80"],
    contact_name: "David Chen",
    contact_email: "david@kingstarknife.com",
    contact_wechat: "kingstar_david",
    description: "Established in 2008, Kingstar is a leading knife manufacturer in Yangjiang with over 15 years of export experience.",
    specialties: ["High-carbon stainless steel", "Damascus pattern blades", "Custom handle materials", "OEM/ODM for major brands"],
    is_free: true,
  },
  {
    slug: "dongguan-precision-tech",
    name: "Dongguan Precision Tech Manufacturing",
    name_zh: "东莞精密科技制造有限公司",
    city: "Dongguan",
    cluster: "Precision Parts & OEM",
    established: 2012,
    employees: "100-200",
    categories: ["CNC Machining", "Stamping", "Die Casting", "Surface Treatment"],
    certifications: ["ISO 9001", "ISO 14001", "IATF 16949"],
    is_direct_factory: true,
    verified_date: "2026-04-02",
    cooperation_rating: 5,
    quality_rating: 5,
    moq: "100 pieces",
    price_range: "$2-50 per unit (complexity dependent)",
    sample_lead_time: "3-5 days",
    production_lead_time: "15-25 days",
    payment_methods: ["T/T", "PayPal"],
    shipping_port: "Shenzhen Port",
    images: ["https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"],
    product_images: ["https://images.unsplash.com/photo-1586864387789-628af9feed72?w=600&q=80"],
    contact_name: "Jason Liu",
    contact_email: "jason@dgprecisiontech.com",
    contact_wechat: "jason_precision",
    description: "A precision CNC machining specialist running Mazak and DMG Mori 5-axis machines.",
    specialties: ["5-axis CNC machining", "Tight tolerance ±0.01mm", "Rapid prototyping (3-day)", "Automotive-grade quality"],
    is_free: true,
  },
  {
    slug: "foshan-alumax",
    name: "Foshan Alumax Building Materials",
    name_zh: "佛山铝美建材有限公司",
    city: "Foshan",
    cluster: "Aluminum & Building Hardware",
    established: 2005,
    employees: "500-1000",
    categories: ["Aluminum Extrusion", "Curtain Wall", "Window Profiles", "Industrial Profiles"],
    certifications: ["ISO 9001", "CE", "AS2047", "AAMA"],
    is_direct_factory: true,
    verified_date: "2026-02-20",
    cooperation_rating: 4,
    quality_rating: 4,
    moq: "1 ton (per profile)",
    price_range: "$2,800-3,500 per ton",
    sample_lead_time: "7-10 days",
    production_lead_time: "15-20 days",
    payment_methods: ["T/T", "L/C"],
    shipping_port: "Guangzhou Port",
    images: ["https://images.unsplash.com/photo-1504917595217-d4dc5ebb6571?w=800&q=80"],
    product_images: ["https://images.unsplash.com/photo-1504917595217-d4dc5ebb6571?w=600&q=80"],
    contact_name: "Michelle Wang",
    contact_email: "michelle@alumaxfs.com",
    contact_wechat: "alumax_michelle",
    description: "One of Foshan's largest aluminum extrusion manufacturers with 12 extrusion lines.",
    specialties: ["Custom profile design", "Anodizing & powder coating", "Large-scale architectural projects", "Australian standard compliance"],
    is_free: true,
  },
  {
    slug: "guangzhou-uniforms-pro",
    name: "Guangzhou UniformsPro Garment Co.",
    name_zh: "广州优制服装有限公司",
    city: "Guangzhou",
    cluster: "Workwear & Corporate Uniforms",
    established: 2010,
    employees: "300-500",
    categories: ["Work Uniforms", "Safety Wear", "Corporate Apparel", "Hi-Vis Clothing"],
    certifications: ["ISO 9001", "BSCI", "OEKO-TEX"],
    is_direct_factory: true,
    verified_date: "2026-03-28",
    cooperation_rating: 4,
    quality_rating: 4,
    moq: "300 pieces per style",
    price_range: "$8-35 per piece",
    sample_lead_time: "7-10 days",
    production_lead_time: "25-35 days",
    payment_methods: ["T/T", "PayPal", "Western Union"],
    shipping_port: "Guangzhou Port",
    images: ["https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"],
    product_images: ["https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80"],
    contact_name: "Linda Zhang",
    contact_email: "linda@uniformspro.cn",
    contact_wechat: "uniformspro_linda",
    description: "Specializing in B2B workwear and corporate uniforms for international brands.",
    specialties: ["Hi-vis & FR workwear", "Custom embroidery & printing", "EN ISO 20471 compliance", "Flexible first-order MOQ"],
    is_free: false,
  },
  {
    slug: "yangjiang-garden-master",
    name: "Yangjiang Garden Master Tools",
    name_zh: "阳江园艺大师工具有限公司",
    city: "Yangjiang",
    cluster: "Knives & Hand Tools",
    established: 2003,
    employees: "100-200",
    categories: ["Garden Shears", "Pruning Tools", "Hedge Trimmers", "Hand Tools"],
    certifications: ["ISO 9001", "GS", "CE"],
    is_direct_factory: true,
    verified_date: "2026-04-10",
    cooperation_rating: 5,
    quality_rating: 5,
    moq: "1000 pieces",
    price_range: "$2-15 per unit",
    sample_lead_time: "5-7 days",
    production_lead_time: "20-30 days",
    payment_methods: ["T/T", "PayPal"],
    shipping_port: "Guangzhou Port",
    images: ["https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=800&q=80"],
    product_images: ["https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=600&q=80"],
    contact_name: "Tom Wu",
    contact_email: "tom@gardenmaster.cn",
    contact_wechat: "gardenmaster_tom",
    description: "A 20+ year veteran in garden tool manufacturing.",
    specialties: ["Ergonomic handle design", "SK5 steel blades", "German market specialist", "Private label for EU brands"],
    is_free: false,
  },
];

async function seed() {
  console.log("Seeding suppliers...");

  const { data, error } = await supabase
    .from("suppliers")
    .upsert(seedData, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data.length} suppliers.`);
}

seed();
