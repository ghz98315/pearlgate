# EVSE Supplier Verification Checklist — 弹药核心文档

> 写于: 2026-06-15
> 用途: 一份内容,四处复用 — lead magnet 引流 / Tier 1 ($490) 报告交付框架 / Reddit 技术回答 / LinkedIn 帖子素材
> 关联: [推广策略](./promotion-strategy-2026-06-15.md) · [LinkedIn-Reddit playbook](./linkedin-reddit-playbook-2026-06-15.md)
> 产品范围: portable charger / charging cable / wallbox (不含 DC 快充桩)

---

## 这份文档怎么用(给 Alex 看的运营说明)

这一份 checklist 是你整个打法的**单一弹药源**,解决两个核心问题:

1. **"没有真实案例"** — 清单展示的是**能力 / 方法论**,不是战绩。新公司完全成立,而且方法论比晒单更能建立专家形象。
2. **"需要持续内容"** — 一份清单可以拆成至少 15 条不同平台的内容(见文末"内容拆分表")。

### 一鱼四吃

| 用途 | 形态 | 怎么用这份清单 |
|---|---|---|
| **Lead magnet** | 一页 PDF "7-Point EVSE Supplier Verification Checklist" | 用下方英文本体排版成 PDF,落地页换邮箱下载 |
| **Tier 1 $490 报告交付框架** | 逐项打分的验证报告 | 7 点 × 每点评分 + 证据截图,就是 $490 报告的骨架 |
| **Reddit 技术回答** | 在问题下分享其中 1-2 点 | 见 [playbook](./linkedin-reddit-playbook-2026-06-15.md) Reddit 部分 |
| **LinkedIn 帖子** | 每点拆成 1 条 60-100 字短帖 | 7 点 = 至少 7 条帖,够发两周 |

### 为什么这份清单能撑起 $490

$490 不是卖"几小时的活",是卖"替买家规避一柜货报废 + 一趟验厂差旅"。价值塑造靠**三件看得见的东西**:

1. **逐项打分** — 买家拿到的不是一句"还行",是 7 项各自的 pass/fail/risk + 证据
2. **专业纵深** — 普通买家根本不知道要查 hipot 数据真伪、CE 是 self-declaration 还是 notified body 发的,这是你 12 年 QC 的护城河
3. **可抵扣承诺** — "$490 在后续走全程 sourcing 时 100% 抵扣",让买家零风险试水

---

## 技术细节核实状态(2026-06-15)

英文本体里的标准号已对齐站点已用口径 + 行业基础标准,所有 `[VERIFY]` 占位已清除:

- **BYD 背景**:按 about 页表述对齐(12yr NPI→Eng Mgr→QC Mgr,为 Dell/Toshiba/Lenovo 等管质量)✅
- **标准号**:UL 2594 / UL 2251 / IEC 62196 / ISO 15118(站点已在用)+ IEC 61851-1(EVSE 安全总纲)+ IEC 62752(便携 IC-CPD/漏电保护)—— 均为行业基础标准,非冷门精确值 ✅
- **hipot 参数**:已重写为"展示该核对什么"而非写死电压/时长 —— 精确实测值留作你验厂护城河,想填随时填 ✅

> ⚠️ 联网后端 2026-06-15 全天 503,以上标准号未经官网逐条复核;若要在对外 PDF / 博客正式发布前求稳,建议你用 12 年验厂经验再扫一眼,或等后端恢复我去 IEC/UL 官网补来源链接。站点口径已一致,内部使用无碍。

---

# 📄 英文本体(可直接做 PDF / 交付 / 内容)

---

## The 7-Point EVSE Supplier Verification Checklist

*For buyers sourcing portable chargers, charging cables, and wallboxes from China*

After 12 years inside BYD manufacturing — moving from NPI Engineer to Engineering Manager to Quality Manager, running quality for global brands like Dell, Toshiba, Lenovo, Huawei, Siemens, and ASUS — I've learned that most sourcing failures aren't bad luck. They're predictable, and they're catchable before you wire a single dollar.

Here are the 7 checks I run on every supplier before recommending them. Most buyers skip 5 of these.

---

### 1. Business Legitimacy — Is this a real factory, or a trading company in disguise?

**What to check:**
- Business license (营业执照) — verify the registered company name, registration number, and registered capital
- Cross-check the registration number against China's national enterprise credit system (国家企业信用信息公示系统)
- Confirm "scope of business" (经营范围) actually includes manufacturing, not just trade/wholesale

**Why it matters:**
A huge share of "factories" on B2B platforms are trading companies that subcontract to real factories you never see. You lose price control, quality control, and traceability. Nothing inherently wrong with a trader — but you must *know* which one you're dealing with.

**Red flags:**
- Registered capital suspiciously low for claimed production scale
- Business scope lists only "wholesale/retail" with no manufacturing terms
- Company name on the quote doesn't match the name on certificates or the bank account

**Can you check this yourself?** Partly — the public registry is searchable. But reading 经营范围 correctly and spotting trader-vs-factory tells takes experience.

---

### 2. Certification — Do you actually need it, and does the factory truly meet the standard?

This is the check most buyers get backwards. They demand "UL certified" or "CE certified" across the board — and either overpay for paperwork they don't need, or get fooled by a certificate that proves nothing.

The smarter framing is two separate questions: **(A) does your market legally require formal certification, and (B) does the factory actually meet the test requirements — with or without the certificate?**

**Reality most buyers don't know:**
Plenty of legitimate factories build to the full test standard (hipot, insulation, temperature rise, etc.) but **don't hold a live certificate**. A UL Listing or a CE Notified-Body certificate carries real recurring cost — annual fees, factory audits, re-testing — that only makes sense when amortized over volume. For a small buyer in a market that doesn't enforce it, insisting on a certified product just raises your unit price and forces a higher MOQ. **No certificate does not mean the product fails the standard.**

**So check, in order:**
1. **Does your target market / sales channel legally require it?** (e.g. a US retailer or AHJ may require a UL/ETL mark; an EU importer is liable for CE conformity; Amazon/marketplaces have their own rules.) If yes → you need the real, current certificate, and you should expect a higher price + minimum volume to amortize the cert cost.
2. **If a certificate is presented — is it genuine and current?**
   - **CE**: self-declaration vs. **Notified Body** assessment (4-digit NB number). For safety-critical EVSE parts a Notified Body is often required.
   - **UL / cUL / ETL**: verify the file number in the issuer's public database (UL Product iQ etc.).
   - Match the **certificate's model** to the model you're buying, and check the **expiry / valid-to date**.
3. **If there's no certificate — can they prove the product still meets the standard?** Ask for the **full test report** against IEC 61851-1 / IEC 62752 / UL 2594 etc., the test house, and the test date. A factory that genuinely builds to standard can show data even without a live cert.

**Real red flags (these are the dangerous ones):**
- A **forged or "borrowed" certificate** (belongs to another company / another model)
- **Neither a certificate nor any test data** — and vague answers when you ask for the report
- Certificate **expired** or model "close but not identical" to your order
- Supplier insists you need a costly certification when your market clearly doesn't — or hides that the certified price requires a much higher MOQ

**Standards to map your product against:**
- EVSE general safety (international): IEC 61851-1
- Connectors / couplers: IEC 62196 series (Type 1 / Type 2)
- Communication protocol: ISO 15118
- US wallbox / EVSE: UL 2594; connectors UL 2251
- Portable chargers (in-cable control & protection device, IC-CPD): IEC 62752

**Can you check this yourself?** The certificate databases are public. But knowing *whether your specific market even requires certification*, reading a test report to confirm a non-certified factory actually meets the standard, and judging when a certified product is worth the price premium — that's the judgment buyers pay for.

---

### 3. Production Capacity — Can they actually deliver your volume, on your timeline?

**What to check:**
- Number of production lines for your specific product type (injection / cable extrusion / PCB SMT / assembly)
- Monthly capacity vs. your order volume — and how much of that capacity is *already committed*
- Lead time honesty: ask for their last 3 months' actual on-time delivery rate, not their promise

**Why it matters:**
A factory that quotes a great price but is running at 95% capacity for existing clients will push your order to the back. "60-day lead time" becomes 110 days, and your container misses the season.

**Red flags:**
- Vague answers on current capacity utilization
- Claimed capacity wildly inconsistent with visible floor space / line count
- No willingness to show a video walk-through of the actual lines

---

### 4. Quality Control System — Do they test every unit, or sample and pray?

**What to check:**
- **Hipot (dielectric withstand) test**: is it run on 100% of units or only sampled? Ask for the test voltage and duration they use — and check it against the level required by the product's own safety standard, not an arbitrary number. A supplier who can't tell you their hipot parameters off the top of their head usually isn't running the test the way they claim.
- **Ground continuity / bonding** test on every unit
- For cables: conductor resistance, insulation resistance, pull/flex testing
- Aging / burn-in test station — present and actually used?
- Final functional test before packing

**Why it matters:**
This is the difference between a factory and a workshop. EVSE handles high current near humans — a hipot failure that ships is a fire or shock risk. Sampling instead of 100% testing is the most common cost-cutting shortcut, and it's invisible until a unit fails in the field.

**Red flags:**
- "We test samples" for any safety-critical test (should be 100%)
- Hipot test logs that look templated / identical across batches (possible fabrication)
- No aging test station, or one that's powered off during the visit
- Test equipment with no visible calibration sticker / expired calibration

**Why this is my edge:** I spent 12 years on exactly this side of manufacturing. Fabricated test data has tells — I know where to look.

---

### 5. Component & BOM Transparency — What's actually inside?

**What to check:**
- Brand and grade of safety-critical components: relays, RCD/RCBO modules, MCUs, connectors
- Cable: actual copper cross-section vs. claimed (under-spec copper is rampant)
- Plastic/enclosure: flame-retardant grade (e.g. UL94 V-0) and whether it's certified or just claimed
- Whether the BOM you're quoted is the BOM that goes into mass production (the classic "golden sample" swap)

**Why it matters:**
The #1 cost-down trick is the bait-and-switch: a perfect golden sample, then cheaper components in mass production. Under-spec copper in a charging cable runs hot and is a real fire risk.

**Red flags:**
- Refusal to disclose component brands ("trade secret")
- Cable weight noticeably lower than spec implies (copper is heavy — a quick proxy check)
- Golden sample arrives flawless but they resist a pre-shipment inspection of mass production

---

### 6. Compliance with Your Target Market — Right standard, right connector, right paperwork?

**What to check:**
- **Connector standard matches destination**: Type 1 / J1772 (NA), Type 2 / Mennekes (EU), GB/T (China), NACS (NA, growing)
- For cables specifically: CCS1 vs CCS2 are physically incompatible — ship the wrong one and the whole container is scrap (see my full write-up on CCS1 vs CCS2)
- Voltage/frequency: 120V/240V 60Hz (NA) vs 230V/400V 50Hz (EU)
- Plug type for portable chargers: NEMA (NA) vs Schuko/CEE (EU) vs BS1363 (UK)
- Required market paperwork: CE+UKCA (EU/UK), FCC (US), etc.

**Why it matters:**
This is the most expensive mistake because it's 100% avoidable and 100% fatal to the shipment. The product can be perfect and still be a total loss if it's the wrong standard for the destination.

**Red flags:**
- Supplier doesn't proactively ask which market you're shipping to
- "It works everywhere" (it doesn't)
- No experience exporting to your specific region

---

### 7. Communication & Responsiveness — The cheapest predictor of how the relationship will go

**What to check:**
- Response time and quality during the *quoting* stage (it only gets worse after you've paid)
- Do they answer technical questions with technical answers, or deflect?
- Is there an English-capable engineer, or only a salesperson relaying?
- Willingness to do a live video factory walk-through

**Why it matters:**
Pre-sale is a supplier's best behavior. If communication is slow, vague, or non-technical *now*, it will be far worse when there's a quality dispute and your money is already gone.

**Red flags:**
- Days of silence during quoting
- Technical questions bounced back as "our engineer will confirm" with no follow-up
- Only a salesperson, never an engineer

---

### How to use this checklist

Run all 7 before you wire a deposit. If you're stretched, the three you absolutely cannot skip are **#2 (certification authenticity)**, **#4 (QC system)**, and **#6 (market compliance)** — those are the ones that turn into total losses, not just headaches.

If you'd rather have someone who's done this for 12 years run all 7 on a specific supplier — with a documented report, a live video factory walk-through, and certification database checks — that's exactly what I do. [CTA: link / contact]

*— Alex Guan, PearlGate Sourcing*

---

# 🔪 内容拆分表(一份清单 → 15+ 条内容)

| # | 平台 | 形态 | 来源 |
|---|---|---|---|
| 1 | LinkedIn | "The CE certificate trap most EVSE buyers fall for" | 第 2 点 |
| 2 | LinkedIn | "Why I test hipot on 100% of units, not samples" | 第 4 点 |
| 3 | LinkedIn | "Under-spec copper: the bait-and-switch in charging cables" | 第 5 点 |
| 4 | LinkedIn | "Ship CCS1 to Europe and your whole container is scrap" | 第 6 点 |
| 5 | LinkedIn | "Trading company vs factory: how to tell" | 第 1 点 |
| 6 | LinkedIn | "The cheapest predictor of a bad supplier relationship" | 第 7 点 |
| 7 | LinkedIn | "Capacity utilization: the question nobody asks" | 第 3 点 |
| 8 | Reddit | 回答"how do I verify a Chinese EVSE supplier" | 全清单浓缩 |
| 9 | Reddit | 回答"is self-declared CE enough" | 第 2 点深答 |
| 10 | Reddit | 回答"CCS1 vs CCS2 sourcing question" | 第 6 点 + 博客链接 |
| 11 | Blog | 已有 CCS1 vs CCS2 文章 — 内链到 checklist | 第 6 点 |
| 12 | Blog | "7-Point Verification Checklist" 完整长文 | 全文 |
| 13 | Lead magnet | 一页 PDF | 全文精简版 |
| 14 | Tier 1 报告 | 逐项打分模板 | 全文转评分表 |
| 15 | Quora | 回答采购/验厂类问题 | 任意单点 |

---

# ✅ 下一步

1. ~~过一遍 `[VERIFY]` 标注~~ ✅ 已清除(标准号对齐站点 + 行业基础标准)
2. ~~第 1 点 BYD 描述~~ ✅ 已按 about 页表述对齐
3. **(可选)** 等联网后端恢复,我去 IEC/UL 官网给标准号补来源链接 —— 仅在对外正式发布前求稳时需要
4. **选下一个产出**:把英文本体排成 lead magnet PDF 文案 / 做成 Tier 1 报告评分模板 / 拆出前几条 LinkedIn 成稿帖

⚠️ 注意:第 6 点里引用了你已发布的 CCS1 vs CCS2 博客(真实存在),内链是对的。其余 CTA / link 占位等你定楔子产品落地页后再填。
