# Landing Page 优化方向 — 3erp.com 学习笔记

> 来源参考: https://www.3erp.com/
> 评估对象: PearlGate (EVSE / 充电线 sourcing 服务,中国 → 海外 B2B)
> 写于: 2026-06-11

3erp 是「中国制造商对欧美 B2B 技术买家」赛道里视觉可信度做得最干净的样本之一。
它在我们这条赛道里的位置 ≈ Stripe 在支付赛道的位置 — 不一定最大,但视觉教科书。

---

## 一、3erp 做对了什么(按对 PearlGate 启发度排序)

### 1. 真实产品摄影 > 任何图库图

- Hero 右边是真实 CNC 加工件的平铺图: 黑色外壳、白色件、黄色件,深色背景,
  工业平面布光。一眼能看出"这是他们做的东西"
- 整页几乎没有 Unsplash 那种通用工厂图 — 全是真实车间、真实零件、真实测量场景

**当前 PearlGate 的问题**: Hero 用 Unsplash `photo-1565043589221`(通用工厂),
WhyPearlGate B 块用 Unsplash `photo-1593941707882`(公共 DC 充电桩,**与产品定位不符** —
PearlGate 主推便携充电器/线缆/wallbox,不涉及大型充电桩)。这是当前最大的可信度短板。

---

### 2. Hero 之后立刻是大牌客户 logo 墙

3erp 的做法:
> "Trusted by companies like:" + Honeywell · ABB · BMW · TESLA · Lamborghini · Bombardier · ZF
- 一行排开,灰度/单色处理,不抢戏但极有压迫感

**对 PearlGate**:
- about 页已经声明: BYD 期间管过 Dell / Toshiba / Lenovo / Huawei / Siemens / ASUS 项目质量
- 这个素材在首页**完全没用上**
- 可做成 "Quality experience gained at BYD on projects for" + 一行 logo 墙
- 必须注明历史身份(at BYD),避免误导成"PearlGate 直接客户"

---

### 3. 能力卡片用「黑底实拍 + 白字」而非图标

3erp "Our manufacturing capabilities" 一排 5 张卡:
- CNC Machining
- Injection Molding
- Sheet Metal Fabrication
- Custom Anodizing
- Vacuum Casting Services

每张是一张深色工厂实拍(CNC 转动、注塑机、钣金折弯、阳极氧化、真空铸造),
上面叠白字标签。视觉签名极强 — 完全不用图标库。

**对 PearlGate**:
当前 Services / Capabilities 全是 lucide 图标。可换成 5 张黑底实拍:
- UL/IEC 证书核查(手翻 test report 特写)
- CCS/NACS 接头特写(端子细节)
- 充电线液冷截面
- 工厂车间航拍
- 样品评估测试台

这一组到位后,整站气质会跳一档。

---

### 4. Trust 区用「左大照片 + 右深色文字块」editorial split

3erp 的 "Why you can trust 3ERP":
- 左侧: CNC 车间真实大图,能看见橙色工服员工
- 右侧: navy 深色块 + 白字 + 5 条带数字的 bullets
  ("20+ Years Experience", "20+ Projects Delivered" 等)

**对 PearlGate**:
当前 WhyPearlGate A 块是「圆形头像 + 文字」,更像个人简历样式。
可借这个 editorial split:
- 左侧: Alex 在工厂里的真人工作照(BYD 时期 / 某次工厂访问实拍)
- 右侧: navy 深色块叠 bullets

**前提**: 必须有真实工厂访问的工作照。否则不要做。

---

### 5. Case Studies 是首页板块,不是子页

3erp 首页直接有具体项目卡:
> "Precision CNC Machining for Aluminum Racing Wheel Hubs" + 实物大图

抽象的"我能做" → 具体的"我做过"。

**对 PearlGate**:
当前首页没有任何具体项目。可加 "Recent EVSE Sourcing Projects" 3 张卡,每张:
- 客户类型(脱敏,如 "EU 充电桩运营商" 或 "北美 wallbox 品牌商" — 按真实买家类型)
- 规格(CCS2 + 22kW + IEC 61851)
- 交付时间线(验厂周期 / 样品周期 / 量产周期)
- 一张该类型设备的图

---

### 6. 暗色 banner 反复打 CTA

3erp 在页面中段、底部各打一次:
> "Get your parts into production today"
- 整宽深色工厂背景图 + 一个橙色按钮

这个 pattern 在页面里出现至少 2-3 次。

**对 PearlGate**:
Hero 之后 CTA 强度断崖式下降,要等到底部 EmailCapture 才再来一次。
中段缺一个 "Need to verify a specific EVSE supplier? — Start verification" 暗色 banner。

---

### 7. Resources / Blog 用真实零件照做缩略图

3erp 不用文字框做博客卡,用真实零件照做缩略图。

**对 PearlGate**:
当前 BlogPreview 文字主导。如果博客文章配图换成行业相关实拍,这部分质感能提升。

---

## 二、PearlGate 的优先级排序(P1 / P2 / P3)

按 ROI 排,不要全做。

### 🥇 P1: 补真实 EVSE 摄影素材

**这步不做,P3 全部白搭**。摄影是 3erp 视觉杠杆的核心。

**必拍清单**(详见 [photography-brief-2026-06-12.md](./photography-brief-2026-06-12.md)):
- CCS1 / CCS2 / NACS / Type2 接头各一张特写(黑底专业打光)
- 便携充电器整机 1-2 张(产品平铺 + 平视)
- Wallbox 整机 1-2 张(正面 + 侧面 + 安装背面)
- 充电线缆截面或弯曲特写(液冷线最好)
- Alex 在工厂的工作照 1-2 张(替换 about 页半身照,用于 editorial split)
- 测试报告 / 证书纸面特写(手翻 UL 报告 / 实验室仪器)

**重要修正**: PearlGate 主推 portable / cable / wallbox 三类产品,
**不涉及**大型 DC 快充桩或公共充电站立柱。早期版本里建议的"充电桩整机(落地式+壁挂式)"
与产品定位不符,已在摄影详细 brief 里修正。

**预算**: 找产品摄影师可在合作 OEM 工厂现场拍,半天-1 天搞定。

---

### 🥈 P2: Hero 后加 BYD 客户 logo 条

素材已经有(about 页声明的客户名),纯矢量 logo + 文字,不需要拍摄。
**半天就能上线**。

实现要点:
- 文案: "Quality experience gained at BYD on global brand projects"(必须有 at BYD)
- Logos: Dell / Toshiba / Lenovo / Huawei / Siemens / ASUS
- 灰度处理、淡色背景、间距宽松
- 位置: SocialProof 之后,WhoShouldWorkWithMe 之前

---

### 🥉 P3: 能力卡片从图标改成黑底实拍

依赖 P1 摄影到位。否则继续用 Unsplash 没意义。

---

## 三、不要照搬的部分

3erp 有几个地方未必适合 PearlGate:

| 3erp 做法 | 不照搬原因 |
|---|---|
| 5 大能力卡片密度 | 我们聚焦 EVSE,2-3 张能力卡足够 |
| 即时 Quote 报价 | 他们按件加工能秒报;我们是 sourcing 服务,主 CTA 保留 "Request Sample / Verification" |
| 暗色 CTA banner 高频出现 | B2B sourcing 显得催促,2 次足够 |
| Hero 用产品平铺图 | 我们 Hero 已用工厂场景,如改产品平铺需统一 EVSE 实拍素材后再说 |

---

## 四、决策路径

执行顺序由"摄影素材能否搞到"决定:

```
能拿到真实 EVSE 摄影素材?
├── 能 → P2 → P1 → P3 → editorial split 改造 → case studies
└── 不能 → 只做 P2(纯 logo 条)
              ↓
         其它等素材到位再做
```

不建议在没有真实素材的情况下硬上 P3 — 用更好看的 Unsplash 替换现在的 Unsplash,
对可信度毫无加成,只是换皮。

---

## 五、执行该文档时的注意点

- **真人摄影 > 一切图库**: 这是 3erp 启示的核心,任何决策不能违背
- **logo 条必须标"at BYD"**: 法律 / 诚信底线,不能让客户误以为是 PearlGate 直接客户
- **不要一次全改**: P1 摄影是周期性投入,P2 可以独立先上,不要等 P1 完成再动
- **现在已合并的 WhyPearlGate**: 先不要拆,等真人工厂照到位后再考虑改 editorial split

---

## 六、关联记录

- 已合并: WhyChooseMe / WhyGuangdong / Trust → WhyPearlGate
  (commit `8d699bb`, 2026-06-11)
- 待提交: 删除广东证据条 + 24h chip + LinkedIn 修复
  (本地工作树,2026-06-11)
- 已部署: 邮件采集闭环 + product_interest 字段
  (commit `e5e8b7d`, 2026-06-11)
- 数据回填待跑: leads.product_interest 历史回填 SQL(见上次对话)
