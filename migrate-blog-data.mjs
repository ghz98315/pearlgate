// Migration script to import existing blog posts to Supabase
// Run this with: node migrate-blog-data.mjs

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Make sure .env.local contains:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL=...');
  console.error('  SUPABASE_SERVICE_ROLE_KEY=...');
  console.error('');
  console.error('Get the Service Role Key from:');
  console.error('Supabase Dashboard → Settings → API → service_role key');
  console.error('');
  console.error('⚠️  IMPORTANT: Never commit the Service Role Key to git!');
  process.exit(1);
}

// Use Service Role Key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Manually define posts to migrate (from posts.ts)
const posts = [
  {
    slug: "how-to-find-reliable-ev-charging-suppliers-china",
    title: "How to Find Reliable EV Charging Suppliers in China",
    description: "China manufactures 70% of the world's EV charging equipment. Here's how to identify trustworthy factories in the Pearl River Delta and avoid costly mistakes.",
    date: "2026-06-12",
    readTime: "7 min read",
    category: "Supplier Verification",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    content: `China's Pearl River Delta — specifically Dongguan, Shenzhen, and Guangzhou — produces roughly 70% of the world's EV charging equipment. If you're sourcing EV charging cables, connectors, portable chargers, or wallbox components, this region is where the manufacturing happens.

But with thousands of electronics factories claiming EV capabilities, how do you find one that actually understands automotive-grade requirements? After working with Pearl River Delta manufacturers for years, here's what I look for.

## Why the Pearl River Delta for EV Charging?

This region dominates EV charging manufacturing for specific reasons:

- **Shenzhen's electronics ecosystem**: component suppliers, cable assemblies, PCB fabrication all within 50km
- **Dongguan's injection molding cluster**: EV-grade plastics (PC, PPO, PBT) with UL94 V-0 flame ratings
- **Automotive supply chain**: nearby BYD and other EV manufacturers drive quality standards up
- **Certification infrastructure**: testing labs (TUV, UL, Intertek) with local offices for faster certification cycles

## What Makes EV Charging Manufacturing Different

EV charging equipment isn't consumer electronics. It's automotive-grade electrical equipment operating at high current for years outdoors. Key differences:

- **Cable requirements**: 10,000+ flex cycles, UV resistance, -40°C to +50°C operating range
- **Connector tolerances**: IP55 rating minimum, often IP67 for outdoor use
- **Safety certifications**: UL 2251/2594, IEC 62752, CE, TUV — not optional for Western markets
- **Temperature management**: proper conductor sizing, thermal monitoring in cables
- **Durability testing**: vibration, impact, cable retention force testing

A factory making phone chargers will fail at EV charging. The engineering requirements are fundamentally different.`
  },
  {
    slug: "ccs1-vs-ccs2-differences-ev-charging",
    title: "CCS1 vs CCS2: Key Differences for EV Charging Buyers",
    description: "CCS1 and CCS2 look similar but aren't interchangeable. Understanding these standards is critical when sourcing DC fast charging equipment from China.",
    date: "2026-06-08",
    readTime: "6 min read",
    category: "EV Charging Basics",
    image: "https://images.unsplash.com/photo-1617886322207-d1d6a8f28a19?w=800&q=80",
    content: `CCS (Combined Charging System) is the dominant DC fast charging standard worldwide. But "CCS" isn't one thing — there are two versions: CCS1 and CCS2. They look similar, use the same communication protocol, but are physically incompatible.

If you're sourcing EV charging equipment from China, understanding the difference is critical. Ship the wrong standard and your entire container is useless.`
  },
  {
    slug: "nacs-tesla-connector-ev-charging-explained",
    title: "What Is NACS? Tesla's Connector Becomes North America's Standard",
    description: "NACS (North American Charging Standard) is replacing CCS1 as the dominant EV charging connector in the US. Here's what it means for sourcing and manufacturing.",
    date: "2026-06-05",
    readTime: "7 min read",
    category: "EV Charging Basics",
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80",
    content: `In 2022, Tesla opened its proprietary charging connector design to the industry and renamed it NACS (North American Charging Standard). By 2024, Ford, GM, Rivian, Volvo, Polestar, Nissan, Mercedes, and others announced they would adopt NACS for their vehicles starting in 2025.

As of 2026, NACS is becoming the de facto charging standard in North America — displacing CCS1 (Combo 1). If you're sourcing EV charging equipment from China for the North American market, understanding NACS is now critical.`
  }
];

async function migratePosts() {
  console.log(`Starting migration of ${posts.length} blog posts...\n`);

  for (const post of posts) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .upsert({
          slug: post.slug,
          title: post.title,
          description: post.description,
          content: post.content,
          image: post.image,
          date: post.date,
          read_time: post.readTime,
          category: post.category,
          published: true,
        }, {
          onConflict: 'slug',
        });

      if (error) {
        console.error(`❌ Failed to migrate post "${post.title}":`, error.message);
      } else {
        console.log(`✓ Migrated: ${post.title}`);
      }
    } catch (err) {
      console.error(`❌ Error migrating post "${post.title}":`, err.message);
    }
  }

  console.log('\n✅ Migration complete!');
  console.log('Visit http://localhost:3000/admin/blog to manage your posts.');
}

migratePosts().catch(console.error);
