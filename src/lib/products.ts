export interface Product {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: {
    current: string;
    voltage: string;
    cableLength: string;
    connector: string;
    cooling: string;
    certification: string[];
  };
  priceRange: {
    min: number;
    max: number;
    currency: string;
    moq: string;
  };
  suppliers: {
    name: string;
    location: string;
    moq: string;
    leadTime: string;
    certifications: string[];
    priceLevel: "Budget" | "Mid-range" | "Premium";
  }[];
  technicalDetails: string;
  commonMistakes: string[];
  redFlags: string[];
}

export const products: Product[] = [
  {
    slug: "ccs1-cable",
    name: "CCS1 DC Fast Charging Cable",
    category: "DC Fast Charging",
    description: "Combined Charging System 1 (CCS1) cables for the North American market. Type 1 (J1772) base with DC pins for fast charging up to 350kW.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80",
    specs: {
      current: "150A-250A (air-cooled), 250A-500A (liquid-cooled)",
      voltage: "50-1000V DC",
      cableLength: "3m-5m standard (custom available)",
      connector: "CCS1 (Type 1 base + 2 DC pins)",
      cooling: "Air-cooled or liquid-cooled",
      certification: ["UL 2251", "UL 2594", "FCC Part 15"],
    },
    priceRange: {
      min: 180,
      max: 450,
      currency: "USD",
      moq: "500 units",
    },
    suppliers: [
      {
        name: "Dongguan Xinghe Precision",
        location: "Dongguan, Guangdong",
        moq: "500 units",
        leadTime: "25-35 days",
        certifications: ["UL 2251", "UL 2594"],
        priceLevel: "Mid-range",
      },
      {
        name: "Shenzhen EV Power Tech",
        location: "Shenzhen, Guangdong",
        moq: "1000 units",
        leadTime: "30-40 days",
        certifications: ["UL 2251", "UL 2594", "FCC"],
        priceLevel: "Premium",
      },
    ],
    technicalDetails: `CCS1 cables are designed for the North American EV charging market. The connector combines a Type 1 (J1772) AC charging interface with two additional DC pins for high-power fast charging.

**Key Technical Requirements:**
- Conductor sizing must match rated current (10 AWG for 32A, 6 AWG for 50A+)
- TPE or TPU jacket material (NOT PVC - fails in cold weather)
- Embedded temperature monitoring (Type K thermocouple)
- Flex rating minimum 10,000 cycles per IEC 62893-3-3
- Operating temperature: -40°C to +50°C
- IP55 rating minimum for connectors

**Liquid Cooling:** Required above 200A continuous current. Coolant circulates through channels in the cable to remove heat. Adds significant cost but necessary for high-power charging.`,
    commonMistakes: [
      "Ordering CCS2 instead of CCS1 - they are NOT interchangeable",
      "Accepting certificates without verifying in UL database",
      "Undersized conductors for rated current (fire hazard)",
      "PVC insulation instead of TPE/TPU (cracks in cold)",
      "No temperature monitoring capability",
    ],
    redFlags: [
      "Factory can't explain difference between CCS1 and CCS2",
      "Pricing 40%+ below market (likely using inferior materials)",
      "Certificate from unknown testing lab (not UL/Intertek/TUV)",
      "Can't provide cable construction drawings",
      "Claims liquid cooling not needed for 250A+ cables",
    ],
  },
  {
    slug: "ccs2-cable",
    name: "CCS2 DC Fast Charging Cable",
    category: "DC Fast Charging",
    description: "Combined Charging System 2 (CCS2) cables for European, Australian, and global markets. Type 2 (Mennekes) base with DC pins for fast charging up to 350kW.",
    image: "https://images.unsplash.com/photo-1617886322207-d1d6a8f28a19?w=1200&q=80",
    specs: {
      current: "150A-250A (air-cooled), 250A-500A (liquid-cooled)",
      voltage: "50-1000V DC",
      cableLength: "3m-5m standard (custom available)",
      connector: "CCS2 (Type 2 base + 2 DC pins)",
      cooling: "Air-cooled or liquid-cooled",
      certification: ["IEC 62196-3", "IEC 62752", "CE (LVD, EMC)", "TUV"],
    },
    priceRange: {
      min: 160,
      max: 420,
      currency: "USD",
      moq: "500 units",
    },
    suppliers: [
      {
        name: "Dongguan Xinghe Precision",
        location: "Dongguan, Guangdong",
        moq: "500 units",
        leadTime: "25-35 days",
        certifications: ["IEC 62196-3", "CE", "TUV"],
        priceLevel: "Mid-range",
      },
      {
        name: "Guangzhou Charging Solutions",
        location: "Guangzhou, Guangdong",
        moq: "500 units",
        leadTime: "20-30 days",
        certifications: ["IEC 62196-3", "CE"],
        priceLevel: "Budget",
      },
    ],
    technicalDetails: `CCS2 is the dominant DC fast charging standard globally (except North America). It combines a Type 2 (Mennekes) AC connector with two DC pins.

**Key Technical Requirements:**
- Proper conductor sizing for rated current
- TPE/TPU jacket (cold weather performance)
- Temperature monitoring embedded in cable and connector
- Minimum 10,000 flex cycles
- Operating temperature: -40°C to +50°C
- IP55 rating minimum (IP67 for outdoor installations)

**Certification Differences vs CCS1:**
- IEC standards instead of UL
- CE marking required for EU market
- TUV certification common for premium tier`,
    commonMistakes: [
      "Confusing CCS2 with CCS1 - physically incompatible",
      "Accepting CE certificates without checking notified body",
      "Not verifying 3-phase AC capability (Type 2 feature)",
      "Inadequate strain relief at cable entry points",
    ],
    redFlags: [
      "Factory claims CCS1 and CCS2 are interchangeable",
      "CE marking without notified body number",
      "Can't explain Type 2 pin layout and 3-phase support",
      "Pricing significantly below market without explanation",
    ],
  },
  {
    slug: "nacs-cable",
    name: "NACS (Tesla) Charging Cable",
    category: "DC/AC Charging",
    description: "North American Charging Standard (NACS) cables, formerly Tesla connector. Becoming the dominant standard in North America for both AC and DC charging.",
    image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1200&q=80",
    specs: {
      current: "Up to 250A (air-cooled), 250A-500A (liquid-cooled)",
      voltage: "0-1000V DC, 120V/240V AC",
      cableLength: "2m-7.5m (depends on application)",
      connector: "NACS (5-pin unified design)",
      cooling: "Air-cooled or liquid-cooled for high-power",
      certification: ["SAE J3400", "UL 2251", "UL 2594 (in development)"],
    },
    priceRange: {
      min: 200,
      max: 520,
      currency: "USD",
      moq: "500-1000 units",
    },
    suppliers: [
      {
        name: "Shenzhen EV Power Tech",
        location: "Shenzhen, Guangdong",
        moq: "1000 units",
        leadTime: "30-40 days",
        certifications: ["SAE J3400 compliant", "UL (in process)"],
        priceLevel: "Premium",
      },
    ],
    technicalDetails: `NACS (North American Charging Standard) is Tesla's connector design, opened to the industry in 2022. As of 2025-2026, most major automakers have adopted it for North American vehicles.

**Key Advantages:**
- Smaller, lighter than CCS1 (easier to handle)
- Same connector for AC and DC (no separate pins)
- Higher theoretical power limit (1 MW vs 350 kW)
- Simpler mechanical design (fewer failure points)

**Technical Requirements:**
- Precision manufacturing (tighter tolerances than CCS)
- SAE J3400 compliance (published 2024)
- UL certification developing (adapted from UL 2251/2594)
- Compatible with Tesla Supercharger protocol

**Supply Chain Note:** NACS manufacturing is still maturing in China. Verify factory has actual production experience, not just prototypes.`,
    commonMistakes: [
      "Assuming NACS and CCS1 are compatible (they're not)",
      "Ordering before verifying SAE J3400 compliance",
      "Not checking connector latch mechanism quality",
      "Expecting same pricing as mature CCS cables",
    ],
    redFlags: [
      "Factory claims years of NACS experience (only ramped up 2024-2025)",
      "No mention of SAE J3400 standard",
      "Can't explain NACS vs CCS1 differences",
      "Passive adapter claims (NACS-CCS requires active electronics)",
    ],
  },
  {
    slug: "type2-cable",
    name: "Type 2 AC Charging Cable",
    category: "AC Charging",
    description: "Type 2 (Mennekes) AC charging cables for European and global markets. Supports single-phase and three-phase charging up to 43kW.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    specs: {
      current: "16A, 32A, or 63A",
      voltage: "230V (single-phase) or 400V (three-phase)",
      cableLength: "3m-10m standard",
      connector: "Type 2 (Mennekes) both ends or Type 2 to Type 1",
      cooling: "Air-cooled (AC doesn't require liquid cooling)",
      certification: ["IEC 62196-2", "CE (LVD, EMC)", "TUV"],
    },
    priceRange: {
      min: 28,
      max: 85,
      currency: "USD",
      moq: "1000 units",
    },
    suppliers: [
      {
        name: "Dongguan Xinghe Precision",
        location: "Dongguan, Guangdong",
        moq: "1000 units",
        leadTime: "20-30 days",
        certifications: ["IEC 62196-2", "CE", "TUV"],
        priceLevel: "Mid-range",
      },
      {
        name: "Guangzhou Charging Solutions",
        location: "Guangzhou, Guangdong",
        moq: "500 units",
        leadTime: "15-25 days",
        certifications: ["IEC 62196-2", "CE"],
        priceLevel: "Budget",
      },
    ],
    technicalDetails: `Type 2 (Mennekes) is the standard AC charging connector in Europe and most global markets (except North America and Japan).

**Key Features:**
- 7-pin design supports 3-phase power
- Single-phase: 230V, 16A-32A (3.7-7.4 kW)
- Three-phase: 400V, 16A-63A (11-43 kW)
- Locking mechanism for secure connection

**Common Configurations:**
- Type 2 to Type 2 (portable cable for public charging)
- Type 2 to Type 1 (adapt EU chargers for older EVs)
- Fixed Type 2 socket (wallbox installations)

**Technical Requirements:**
- Proper conductor sizing for rated current
- IP44 minimum for connectors (IP54 recommended)
- Locking mechanism must meet IEC 62196-2 retention force
- Temperature range: -30°C to +50°C`,
    commonMistakes: [
      "Confusing Type 2 with Type 1 (incompatible)",
      "Not specifying single-phase vs three-phase capability",
      "Inadequate IP rating for outdoor use",
      "Wrong cable length for application",
    ],
    redFlags: [
      "Factory doesn't understand 3-phase vs single-phase",
      "Pricing too low (likely using undersized conductors)",
      "No IP rating specified",
      "Can't provide conductor sizing documentation",
    ],
  },
  {
    slug: "portable-evse",
    name: "Portable EV Charger (Mobile EVSE)",
    category: "AC Charging Equipment",
    description: "Portable Level 1/2 EVSE (Electric Vehicle Supply Equipment) for home and travel charging. Includes control box with safety features and swappable plug adapters.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80",
    specs: {
      current: "12A-40A adjustable",
      voltage: "120V (Level 1) and/or 240V (Level 2)",
      cableLength: "20-25 feet typical",
      connector: "J1772, NACS, or Type 2 vehicle connector",
      cooling: "Air-cooled (built-in ventilation)",
      certification: ["UL 2594", "UL 2251", "IEC 62752", "FCC Part 15"],
    },
    priceRange: {
      min: 55,
      max: 140,
      currency: "USD",
      moq: "500 units",
    },
    suppliers: [
      {
        name: "Guangzhou Charging Solutions",
        location: "Guangzhou, Guangdong",
        moq: "500 units",
        leadTime: "25-35 days",
        certifications: ["UL 2594", "FCC"],
        priceLevel: "Mid-range",
      },
    ],
    technicalDetails: `Portable EVSEs are the "chargers" drivers keep in their trunk. They plug into standard outlets and convert AC power safely for EV charging.

**Key Components:**
- Control box with GFCI protection
- Temperature monitoring (cable + connector)
- Pilot signal generation (PWM communication)
- LED status indicators
- Swappable plug adapters (NEMA 5-15, 14-50, etc.)

**Safety Features Required:**
- GFCI protection (20mA trip threshold)
- Over-temperature protection
- Over-current protection
- Ground fault detection
- Pilot signal monitoring

**Quality Issues to Watch:**
- Undersized cable conductors (overheating)
- Fake or missing GFCI
- Poor thermal management in control box
- Weak cable strain relief
- Water ingress (inadequate IP rating)`,
    commonMistakes: [
      "Accepting certificates without UL verification",
      "Not testing GFCI functionality",
      "Inadequate cable conductor sizing",
      "Missing temperature sensors",
      "No IP rating for outdoor use",
    ],
    redFlags: [
      "GFCI test button doesn't actually cut power",
      "Control box overheats during sustained charging",
      "Cable feels stiff at room temperature",
      "Factory claims certification but can't produce test reports",
      "Pricing significantly below market",
    ],
  },
  {
    slug: "connectors",
    name: "EV Charging Connectors & Adapters",
    category: "Components",
    description: "EV charging connectors (CCS, NACS, Type 1/2) and adapters for compatibility between different charging standards. Critical components requiring precision manufacturing.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    specs: {
      current: "Varies by type (16A-500A)",
      voltage: "Up to 1000V DC, 120-400V AC",
      cableLength: "N/A (connectors only)",
      connector: "CCS1, CCS2, NACS, Type 1, Type 2, GB/T",
      cooling: "Air-cooled (liquid-cooled for high-power)",
      certification: ["UL", "IEC 62196", "SAE J3400"],
    },
    priceRange: {
      min: 18,
      max: 180,
      currency: "USD",
      moq: "500-1000 units",
    },
    suppliers: [
      {
        name: "Shenzhen EV Power Tech",
        location: "Shenzhen, Guangdong",
        moq: "1000 units",
        leadTime: "30-40 days",
        certifications: ["UL", "IEC", "SAE compliant"],
        priceLevel: "Premium",
      },
      {
        name: "Dongguan Xinghe Precision",
        location: "Dongguan, Guangdong",
        moq: "500 units",
        leadTime: "25-35 days",
        certifications: ["IEC 62196", "CE"],
        priceLevel: "Mid-range",
      },
    ],
    technicalDetails: `EV charging connectors are precision components requiring tight tolerances and high-quality materials.

**Connector Types:**
- **CCS1/CCS2:** DC fast charging connectors
- **NACS:** Tesla/North American standard
- **Type 1 (J1772):** North American AC standard
- **Type 2 (Mennekes):** European AC standard
- **GB/T:** Chinese domestic standard

**Adapter Categories:**
- **CCS1 ↔ CCS2:** Requires active electronics (not passive)
- **NACS ↔ CCS:** Requires protocol translation
- **Type 1 ↔ Type 2:** AC adapter (simpler)

**Quality Factors:**
- Contact pin material (silver-plated copper)
- Housing material (UL94 V-0 flame rating)
- Locking mechanism reliability
- IP rating (dust and water ingress)
- Temperature sensor integration

**Supply Chain:**
- Premium brands: Phoenix Contact, ITT Cannon, Huber+Suhner
- Chinese manufacturers: DOSTAR, YONGGUI, Kangni
- Price difference: 30-50% (Chinese vs European brands)`,
    commonMistakes: [
      "Assuming passive adapters work for CCS/NACS (need active electronics)",
      "Not verifying connector brand/supplier",
      "Ignoring IP rating requirements",
      "Accepting connectors without temperature sensors",
      "Not checking locking mechanism retention force",
    ],
    redFlags: [
      "Factory claims passive NACS-to-CCS adapter (impossible)",
      "Connectors wobble when mated (poor tolerances)",
      "No brand marking on connectors",
      "Pricing 50%+ below market without explanation",
      "Can't explain pin layout or protocol differences",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}
