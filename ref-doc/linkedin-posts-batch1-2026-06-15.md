# LinkedIn 成稿帖 — 第一批(冷启动 5 条)

> 写于: 2026-06-15
> 用途: 直接复制发布的 LinkedIn 成稿。每条 = 英文正文(可直接发) + 中文运营备注
> 来源: [EVSE 验证清单](./evse-verification-checklist-2026-06-15.md) 的 7 点拆分
> 配套: [LinkedIn-Reddit playbook](./linkedin-reddit-playbook-2026-06-15.md)

---

## 发布前必读(运营总则)

**节奏**:第一批 5 条,**每周 2-3 条**,够发两周。不要一天全发完——LinkedIn 算法惩罚突发刷屏,稳定输出才养得起触达。

**最佳发布时间**(欧美 B2B 受众,⚠️ 待你用自己账号数据验证):
- 周二 / 周三 / 周四
- 你的目标市场时区上午(EU 上午 = 北京下午 3-5 点;US 东岸上午 = 北京晚 9-11 点)
- 避开周末和周一

**每条帖发布后 30 分钟内**:你自己回到帖子下,主动回复任何评论(哪怕只是 emoji),并去 3-5 个目标客户/同行的帖子下留有价值的评论——这是 LinkedIn 冷启动撬动触达的关键动作,不是发完就走。

**关于 CTA**:前 5 条里我**只在第 1 条和第 5 条放软 CTA**,中间几条纯给价值。原因——冷启动期 90% 给价值、10% 推自己,和 Reddit 9:1 一个道理。账号还没有信任基础时,每条都带钩子会掉触达、掉关注。

**格式规范**(LinkedIn 专属,和博客不同):
- 开头第一行就是钩子,**单独成行**(信息流里只显示前 2-3 行,得靠第一行勾住)
- 短段落,多空行,手机上才好读
- 不要堆 hashtag,结尾 3-5 个精准的就够
- 不要外链放正文(LinkedIn 压制带外链的帖)——链接放**第一条评论**里,正文引导"link in comments"

---

# 📝 第 1 条 — 开场/CTA(建议首发)

**主题**:CE 证书陷阱(来自清单第 2 点)
**为什么首发**:这是最反直觉、最有"专家揭秘"感的一条,适合立人设。带软 CTA。

---

**正文(直接复制):**

```
Most EVSE buyers think a "CE certificate" means the product is safe and compliant.

For charging equipment, that assumption can cost you an entire container.

Here's the trap:

CE comes in two very different forms.

1. Self-declaration — the manufacturer signs a piece of paper saying "we comply." No independent testing required.

2. Notified Body assessment — an accredited third party actually tested the product. You'll see a 4-digit number next to the CE mark.

For safety-critical EV charging equipment, many products legally require the Notified Body route.

But plenty of suppliers hand you a self-declared CE, printed to look identical, and let you assume the rest.

Result: it passes "inspection" on their end, then gets stopped at EU customs — or worse, fails in the field.

How to check in 30 seconds:
→ Look for a 4-digit number beside the CE mark
→ No number where one is required = self-declaration = a red flag
→ Ask for the full certificate, not a photo of the logo

I spent 12 years in manufacturing QC before moving into EVSE sourcing. This is the first thing I check on any supplier — and it's the one most buyers skip.

If you're sourcing chargers or cables from China and want a hand verifying a specific supplier's certs, my DMs are open.

#EVCharging #Sourcing #SupplyChain #EVSE #ChinaManufacturing
```

**中文运营备注:**
- 软 CTA 在倒数第二段("my DMs are open"),不强推,姿态是"帮忙"不是"卖货"
- 没有外链,纯文字,LinkedIn 最爱这种
- 钩子第一行就抛反直觉观点,信息流里勾人

---

# 📝 第 2 条 — 纯价值(无 CTA)

**主题**:100% hipot 测试 vs 抽检(来自清单第 4 点)
**定位**:展示你的 QC 护城河,纯给价值,不推销。

---

**正文(直接复制):**

```
"We test our chargers" sounds reassuring.

Then you ask one follow-up question and the whole thing falls apart:

"Do you hipot-test every unit, or a sample?"

Here's why that question matters.

A hipot (dielectric withstand) test checks whether the insulation can handle high voltage without breaking down. On EV charging equipment — which sits between the grid and a human — this isn't optional. A unit that fails hipot in the field is a shock or fire risk.

The cost-cutting shortcut: test a few units per batch instead of every unit. It's invisible. The samples pass. The paperwork looks clean. And the one defective unit in the batch ships anyway.

In 12 years of manufacturing QC, this was one of the most common corners I saw cut — and one of the easiest to hide.

What a serious factory does:
→ 100% hipot on every single unit (not a sample)
→ Calibrated equipment with a current calibration sticker
→ Test logs that vary unit-to-unit (identical logs across a batch = a red flag for fabricated data)

When you tour a factory, don't just ask "do you test?"

Ask "show me the hipot station running, and show me yesterday's logs."

The answer to that tells you more than any certificate.
```

**中文运营备注:**
- **无 CTA**,纯价值,这是养信任的一条
- "identical logs = fabricated data" 这种细节是你 12 年经验的真实护城河,普通 sourcing agent 写不出来
- 结尾给了一句可操作的话术("show me the hipot station running"),读者会觉得"学到了"→ 收藏/转发

---

# 📝 第 3 条 — 纯价值(无 CTA)

**主题**:充电线缆偷铜(来自清单第 5 点)
**定位**:具体、可验证、有画面感的偷工减料,最易引发评论。

---

**正文(直接复制):**

```
There's a fire risk hiding in cheap EV charging cables, and you can catch it with a kitchen scale.

The trick is called under-spec copper.

A charging cable is quoted with a certain conductor cross-section — say 6mm². That copper is what carries the current. It's also the single most expensive material in the cable.

So it's the first thing a cost-cutting supplier shaves.

You get a cable labeled 6mm² that's actually running 4.5mm² inside. It looks identical. It plugs in fine. The sample you approved was the real thing.

Then mass production quietly switches to thinner copper.

Under-spec copper runs hotter than it should under load. On a cable carrying 32A for hours, "hotter than it should" is not a small problem.

How to sanity-check without a lab:
→ Copper is heavy. Weigh the cable. A cable with the right copper has a predictable weight — significantly under it is a flag.
→ Ask for the conductor cross-section in writing, on the spec sheet AND the invoice.
→ For anything serious, cut a sample and measure the actual conductor (this is standard at incoming QC for a reason).

The golden-sample-then-swap is the oldest trick in sourcing. Copper is where it hits you hardest in EVSE.
```

**中文运营备注:**
- "用厨房秤就能查"这个钩子有反差感、有画面,转发率高
- 偷铜是真实且普遍的问题,你说得出"称重"这种土办法,显得务实可信
- 无 CTA

---

# 📝 第 4 条 — 纯价值(无 CTA)

**主题**:CCS1 发去欧洲 = 整柜报废(来自清单第 6 点)
**定位**:引用你**已发布的真实博客**,把帖子和站内内容串起来。

---

**正文(直接复制):**

```
The most expensive sourcing mistake in EV charging isn't a quality defect.

It's shipping the right product with the wrong connector.

CCS1 and CCS2 look almost identical. Same communication protocol. Same power levels. They are physically incompatible.

CCS1 → North America, Korea
CCS2 → Europe, UK, Australia, most of the world

Ship a container of CCS1 cables to a European buyer and you don't have a quality problem. You have scrap. The product can be flawless and it's still a total loss.

What makes this dangerous:
→ It's 100% avoidable, so nobody double-checks it
→ A supplier focused on the US market may default to CCS1 without asking your destination
→ "It works everywhere" is a sentence that should end the conversation

The fix is boring and it works:
Confirm the connector standard, in writing, against the destination market — before the deposit, not after the container ships.

I wrote a full breakdown of CCS1 vs CCS2 (pins, markets, why two standards exist) — link in the comments.
```

**第一条评论(发完帖立刻自己评论):**
```
Full CCS1 vs CCS2 breakdown here: [填你的博客 URL: /blog/ccs1-vs-ccs2-...]
```

**中文运营备注:**
- 这条把外链放**第一条评论**(正文说 "link in comments"),规避 LinkedIn 对外链帖的压制
- 引流到你**真实已发布**的 CCS1/CCS2 博客 → 博客又有站内 CTA → 闭环
- ⚠️ 发布前去站内确认博客的真实 slug,填进评论

---

# 📝 第 5 条 — 收尾/CTA

**主题**:贸易公司 vs 工厂(来自清单第 1 点)+ 引出验证服务
**定位**:第二个带 CTA 的帖,这次更明确地引出你的服务。

---

**正文(直接复制):**

```
You found a great "factory" on a B2B platform. Good price, fast replies, photos of a production line.

There's a decent chance it's not a factory at all.

A large share of "manufacturers" on sourcing platforms are trading companies. They take your order, subcontract to a real factory you never see, and mark it up.

Nothing illegal about that. But it changes everything:
→ You lose price control (there's a middleman margin you can't see)
→ You lose quality control (you can't audit a factory you don't know exists)
→ You lose traceability when something goes wrong

How to tell the difference:
→ Read the business license scope (经营范围). "Manufacturing" terms vs. only "wholesale/retail."
→ Check registered capital against claimed production scale — a tiny number behind a big factory is a flag.
→ Does the company name on the quote match the name on the certificates and the bank account? Mismatches are common with traders.

None of this means "never work with a trader." Sometimes that's the right call.

It means: know which one you're dealing with, and price accordingly.

After 12 years in Chinese manufacturing, telling factories from traders is almost reflex for me. If you've got a supplier you're unsure about, I run a 7-point verification on a specific factory — license, certs, capacity, QC, the lot. Happy to talk through it.

#EVCharging #Sourcing #ChinaManufacturing #SupplyChain #EVSE
```

**中文运营备注:**
- 第二个 CTA,比第 1 条更明确提到"7-point verification"服务,但仍是顾问姿态
- 这里第一次在 LinkedIn 公开提"7 点验证",和你的 Tier 1 ($490) 服务挂钩,为后续转化铺垫
- 没放价格——LinkedIn 帖不谈价,价格在 1:1 对话里谈

---

# 🔁 发布顺序与节奏总表

| 顺序 | 帖 | 主题 | CTA | 建议发布 |
|---|---|---|---|---|
| 1 | 第 1 条 | CE 证书陷阱 | 软 CTA | Week 1 周二 |
| 2 | 第 2 条 | 100% hipot | 无 | Week 1 周四 |
| 3 | 第 3 条 | 偷铜 | 无 | Week 2 周二 |
| 4 | 第 4 条 | CCS1/CCS2(带博客链接)| 评论区链接 | Week 2 周四 |
| 5 | 第 5 条 | 贸易公司 vs 工厂 | CTA | Week 3 周二 |

**比例核对**:5 条里 2 条带 CTA、3 条纯价值 = 给价值为主,符合冷启动期原则。

---

# ⚠️ 发布前 checklist

- [ ] 确认 LinkedIn 个人页资料已优化(headline / about,见 memory 里的 linkedin-optimization 方案)
- [ ] 第 4 条的博客真实 slug 填进评论草稿
- [ ] 第 1 / 第 5 条的"DMs open"——确认你能及时看到并回复 DM
- [ ] 想好被问"how much"时的回答(楔子产品话术,Tier 1 $490,首单可免费换案例)
- [ ] ⚠️ 最佳发布时间用你自己账号的 analytics 验证后调整

---

# 下一步

这 5 条够发到第 3 周。期间:
1. 看哪条互动最好 → 那个主题深挖,出第二批
2. 接到第一个 DM 咨询 → 用 [playbook](./linkedin-reddit-playbook-2026-06-15.md) 的对话→楔子产品话术
3. 同步可做:**B(Tier 1 报告评分模板)**,接单即用;或剩余 2 条(capacity / communication)补成第二批

第 1 条可以今天就发。
