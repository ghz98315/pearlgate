# CCS1 vs CCS2: Key Differences for EV Charging Buyers

**Date**: 2026-06-08  
**Category**: EV Charging Basics  
**Read Time**: 6 min read

## Description
CCS1 and CCS2 look similar but aren't interchangeable. Understanding these standards is critical when sourcing DC fast charging equipment from China.

---

CCS (Combined Charging System) is the dominant DC fast charging standard worldwide. But "CCS" isn't one thing — there are two versions: CCS1 and CCS2. They look similar, use the same communication protocol, but are physically incompatible.

If you're sourcing EV charging equipment from China, understanding the difference is critical. Ship the wrong standard and your entire container is useless.

## CCS1 vs CCS2: The Core Difference

Both CCS1 and CCS2 use the same **DC charging protocol** (ISO 15118) and can deliver the same power levels (up to 350kW currently). The difference is the **base connector** they build on.

### CCS1 (Combo 1)

- **Base connector**: Type 1 (J1772) — the 5-pin AC connector used in North America
- **DC pins**: Two additional large pins below the Type 1 connector for DC fast charging
- **Markets**: United States, Canada, South Korea, Taiwan
- **Total pins**: 7 (5 AC + 2 DC)

### CCS2 (Combo 2)

- **Base connector**: Type 2 (Mennekes) — the 7-pin AC connector used in Europe
- **DC pins**: Two additional large pins below the Type 2 connector
- **Markets**: European Union, UK, Australia, New Zealand, China (for some vehicles), most of the rest of the world
- **Total pins**: 9 (7 AC + 2 DC)

The "Combined" in CCS means one port handles both AC (slow) and DC (fast) charging. The vehicle has one charge port; the connector shape determines which standard it uses.

## Why Two Standards Exist

This isn't planned obsolescence — it's geographical legacy. Before DC fast charging became widespread:

- North America standardized on **Type 1 (J1772)** for AC charging in the 1990s
- Europe standardized on **Type 2 (Mennekes)** in the 2000s, which supports 3-phase power (common in EU, rare in North America)

When manufacturers developed DC fast charging, they extended these existing AC standards rather than force vehicle manufacturers to add a second charge port. CCS1 builds on North America's Type 1; CCS2 builds on Europe's Type 2.

## Key Specifications

### Power Delivery (Both Standards)

- **Voltage range**: 50-1000 VDC
- **Current**: Up to 500A (liquid-cooled cables required above 200A)
- **Max power**: 350 kW (current state-of-the-art), theoretically up to 500 kW
- **Communication**: PLC (Power Line Communication) over the DC pins

### Physical Differences

**CCS1:**
- Connector dimensions: ~70mm x 90mm
- Locking mechanism: J1772 latch system
- Cable weight: typically 5-8kg for 150A cables
- Pin layout: asymmetric (prevents incorrect insertion)

**CCS2:**
- Connector dimensions: ~70mm x 105mm (slightly taller)
- Locking mechanism: Type 2 latch system
- Cable weight: typically 5-9kg for 150A cables
- Pin layout: circular (Type 2 symmetry preserved)

## Market Coverage by Standard

### CCS1 Markets

- **United States**: Dominant standard for non-Tesla DC charging (but see NACS note below)
- **Canada**: Standard for DC fast charging
- **South Korea**: CCS1 plus their domestic standard (AC3)
- **Taiwan**: Mixed CCS1 and CHAdeMO

Note: Tesla's NACS connector is becoming a competing standard in North America as of 2025-2026.

### CCS2 Markets

- **European Union**: Mandated by EU regulation (all public DC chargers must support CCS2)
- **United Kingdom**: CCS2 standard
- **China**: GB/T is the domestic standard, but CCS2 is supported by many imported vehicles (BMW, Audi, etc.)
- **Australia / New Zealand**: CCS2 standard
- **India**: Adopting CCS2 (Bharat DC standard is CCS2-compatible)
- **Latin America**: Most countries using CCS2
- **Middle East / Africa**: Mostly CCS2

CCS2 has significantly broader global adoption.

## What This Means for Sourcing from China

Chinese factories can manufacture both CCS1 and CCS2 cables and connectors. But **you must specify** which standard. Key sourcing considerations:

### 1. Specify Your Target Market Clearly

Don't just say "CCS cable." Say:
- "CCS1 for US market" or
- "CCS2 for EU market"

Many Pearl River Delta factories default to CCS2 because it has larger global market share. If you're targeting North America, you must explicitly specify CCS1.

### 2. Verify Connector Supplier

Quality CCS connectors come from established suppliers:
- **Phoenix Contact** (Germany) — premium tier
- **ITT Cannon** (US) — used by many OEMs
- **Rema** (Norway) — Scandinavia favorite
- **Huber+Suhner** (Switzerland) — high-power applications

Chinese connector manufacturers (e.g., YONGGUI, DOSTAR) also produce CCS connectors — typically 30-40% cheaper but verify certification status carefully.

Ask your cable manufacturer: "Who supplies your CCS connectors?" If they're vague, that's a red flag.

### 3. Certification Requirements Differ by Standard

**For CCS1 (US market):**
- UL 2251 (personnel protection for EV supply equipment)
- UL 2594 (EV charging station equipment)
- FCC Part 15 (EMC compliance)

**For CCS2 (EU market):**
- IEC 62196-3 (plugs, socket-outlets, vehicle connectors)
- IEC 62752 (in-cable control and protection device)
- CE marking (LVD and EMC directives)

These certifications are expensive ($20,000-50,000 per product model) and take 6-12 months. A factory claiming to "support both standards" should have test reports for both. If they don't have them in hand, they haven't actually certified the products yet.

### 4. Verify Cable Specifications Match

CCS cables need:
- Conductor sizing for rated current (e.g., 95mm² for 200A DC charging)
- Proper shielding (DC charging creates EMI)
- Temperature monitoring (Type K thermocouple embedded in cable)
- Flex rating (10,000+ cycles minimum)
- Operating temperature range: -40°C to +50°C

Request a cable construction drawing. It should show conductor size, insulation materials (TPE/TPU, not PVC), shield construction, and any embedded monitoring wires.

## Common Mistakes When Sourcing

### "We'll Just Use an Adapter"

CCS1 and CCS2 are not electrically compatible via a simple passive adapter. The AC pin layouts are different, the locking mechanisms are different, and the communication protocols expect different base connector pin assignments.

Adapters do exist but they're expensive ($300-800), bulky, and often require active electronics. Don't plan your business around adapters — source the correct standard.

### Mixing AC and DC Standards

Some buyers incorrectly think:
- "We use CCS1, so we need Type 1 cables for AC charging" ✓ Correct
- "We use CCS2, so we need Type 2 cables for AC charging" ✓ Correct

But the confusion happens when:
- "Can we get CCS1 DC cables with Type 2 AC cables?" ✗ Wrong

The AC standard must match the DC standard. CCS1 vehicles have Type 1 ports. CCS2 vehicles have Type 2 ports. Don't mix them.

### Not Asking About Liquid Cooling

Above 200A continuous current, cables generate significant heat. High-power CCS cables (250A+) use **liquid cooling** — coolant circulates through channels in the cable to remove heat.

If your factory quotes a 350A cable without mentioning liquid cooling, they don't understand the requirements. Liquid-cooled cables cost 2-3× more than standard cables and require coolant circulation systems in the charger.

## Typical Pricing (FOB China, 2026)

**CCS1 cables:**
- 150A, 5m, air-cooled: $180-280 per unit (500 pcs)
- 200A, 5m, liquid-cooled: $320-450 per unit (500 pcs)

**CCS2 cables:**
- 150A, 5m, air-cooled: $160-250 per unit (500 pcs)
- 200A, 5m, liquid-cooled: $300-420 per unit (500 pcs)

CCS2 is typically slightly cheaper because Chinese factories produce higher volumes for the global market.

Add 10-15% for certified connectors from European/US brands. Add $15,000-40,000 for UL/IEC certification costs if you need certified products.

## How I Can Help

I work exclusively with EV charging supply chain in the Pearl River Delta. My factory verification service includes:

- Confirm the factory understands the CCS1/CCS2 difference (you'd be surprised how many don't)
- Verify they have appropriate connector suppliers
- Check they have the cable extrusion capability (not just assembly)
- Review test data for temperature rise, flex cycles, insulation resistance
- Arrange samples for your target market standard

First consultation is free. Send me your specs — I'll identify qualified CCS cable factories within 48 hours.
