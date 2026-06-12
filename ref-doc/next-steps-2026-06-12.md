# PearlGate 下一步计划与需求清单

> 写于: 2026-06-12
> 上次会话最终 commit: `001c9d4`
> 关联文档: [3erp.com 学习笔记](./landing-page-3erp-lessons.md) · [产品页样品入口设计](./sample-type.md) · [摄影需求清单](./photography-brief-2026-06-12.md)

按 4 个维度切：**还没收尾的 / 卡在你这边的 / 下一阶段做的 / 长期 backlog**。
每条都标了优先级和依赖关系。

---

## 📌 一、立即收尾（≤1 天，无需新输入）

| # | 项 | 工作量 | 阻塞谁 |
|---|---|---|---|
| 1 | 跑 product_interest 历史回填 SQL（Supabase 跑一次） | 5 分钟 | admin 数据完整性 |
| 2 | 生产环境**手机端**走查（Hero / Meet Alex / BYD logo 条） | 10 分钟 | 真实 UX 验证 |
| 3 | `test-vercel-token.sh` 加进 `.gitignore`（debug 临时文件不入库） | 1 分钟 | 工作树清洁 |
| 4 | `ref-doc/sample-type.md` 决定要不要做（见 §3） | 决策 | 下一步路径 |

### 历史 product_interest 回填 SQL（参考）

```sql
UPDATE leads l
SET product_interest = sub.pi
FROM (
  SELECT DISTINCT ON (e.lead_id)
    e.lead_id,
    CASE
      WHEN e.metadata ? 'productCategory' AND e.metadata ? 'productName'
        THEN trim(both ' -' FROM
          coalesce(e.metadata->>'productCategory','') || ' - ' || coalesce(e.metadata->>'productName',''))
      WHEN e.metadata ? 'category' AND e.metadata ? 'product'
        THEN trim(both ' -' FROM
          coalesce(e.metadata->>'category','') || ' - ' || coalesce(e.metadata->>'product',''))
      WHEN e.metadata ? 'productInterest' THEN e.metadata->>'productInterest'
      WHEN e.metadata ? 'productName' THEN e.metadata->>'productName'
      WHEN e.metadata ? 'product' THEN e.metadata->>'product'
      ELSE NULL
    END AS pi
  FROM lead_events e
  WHERE e.metadata IS NOT NULL
  ORDER BY e.lead_id, e.occurred_at ASC
) sub
WHERE l.id = sub.lead_id
  AND sub.pi IS NOT NULL
  AND nullif(trim(sub.pi), '') IS NOT NULL
  AND l.product_interest IS NULL;
```

---

## 🔑 二、卡在你这边的关键输入（决定后续路径）

| 决策点 | 选项 | 影响 |
|---|---|---|
| **摄影素材** | A. 找产品摄影师在合作 OEM 工厂拍一天<br>B. 用手机自己拍（够用即可）<br>C. 暂时不动 | 决定 P3 / Hero 替换 / Meet Alex editorial split 能否启动<br>具体拍什么见 [photography-brief-2026-06-12.md](./photography-brief-2026-06-12.md)<br>**注意**: 主推 portable / cable / wallbox,不是 DC 快充桩 |
| **GA 数据** | 你看下 GA → Engagement → Pages → 首页：滚动深度 / 跳出率 / 各 section 停留 | 决定下一步该砍掉哪些 section、哪些 CTA 该加强 |
| **sample-type.md 产品页样品入口** | 要做 / 暂缓 | 这是一条独立大动作，影响产品页结构 |
| **CCS/NACS 技术专长**怎么放 | chip 里加回 / 放对比表 / 单做 capability 卡片 | chip 改版后这个核心专长没显眼锚点了 |
| **Alex 在 BYD 实际离开年份** | 2024 / 2025 | 现在按 2024 锁了 12 年。如果是 2025 年初离开，应该是 13 年 |

---

## 🎯 三、下一阶段（按可行性 + ROI 排）

### 🟢 立即可做（不依赖摄影）

**T1 — landing 中段加暗色 CTA banner**（参考 3erp 模式）
- 位置：Services 之后 / Process 之前
- 内容："Need to verify a specific EVSE supplier? Start verification"
- 用 Unsplash 充电桩夜景图做底（Hero 已用一张，找张不同的）
- 工作量：1-2 小时
- 价值：Hero 之后中段 CTA 强度断崖式下降的问题修复

**T2 — 案例研究 / Recent Projects 模块**（首页新增）
- 3 张卡：客户类型脱敏 + 规格 + 交付时间线
- 例："EU 充电桩运营商 / CCS2 22kW IEC 61851 / 验厂 5 天 + 样品 2 周 + 量产 60 天"
- 工作量：4-6 小时（含内容撰写）
- 价值：抽象的"我能做" → 具体的"我做过"，转化率最高的信任建立模式
- ⚠️ 前提：你能给我 2-3 个真实项目（可脱敏）

**T3 — 修两处残留的 "BYD charging infrastructure" 不准确表述**
- `WhyPearlGate.tsx:39` 对比表
- `supplier-match/page.tsx:327` Expert Guidance 卡
- 改成 "BYD manufacturing background, now specialising in EVSE"
- 工作量：5 分钟

### 🟡 等摄影素材到位后做（解锁条件: §2 决策 1）

**T4 — Hero 背景图换真实 EVSE / 充电站**
- 当前 Unsplash `photo-1565043589221`（通用工厂）→ 真实充电桩 / OEM 车间
- 立刻提升首屏可信度

**T5 — P3 能力卡片黑底实拍化**
- 5 张黑底实拍代替 lucide 图标
- 详见 [landing-page-3erp-lessons.md](./landing-page-3erp-lessons.md)

**T6 — Meet Alex editorial split**
- 大照片 + 深色 bullet 条，3erp 同款布局
- 需要你在工厂的真实工作照

### 🔵 等数据到位后做（解锁条件: §2 决策 2）

**T7 — 基于 GA drop-off 砍 / 加 section**
- 如果 70% 用户在 PainPoints 之前离开，BlogPreview / Process 等远端 section 都该砍
- 如果 sticky CTA 转化率高，复制到更多场景

---

## 📚 四、长期 backlog（≥2 周，战略级）

| 项 | 描述 | 触发条件 |
|---|---|---|
| **Lead 跟进自动化** | leads 闭环建好了，但新 lead 写入后没有自动通知 / 跟进序列。考虑 Resend 自动 follow-up 邮件 | leads 月新增 ≥ 20 后启动 |
| **Admin 邮件日报** | 每天 / 每周一封新 leads 摘要 | 同上 |
| **博客发布节奏** | 现有 6 篇，目标稳定每月 2-4 篇高质量长文 | 持续 |
| **LinkedIn 内容** | memory 里有 LinkedIn 资料优化方案，未启动 | 你判断时机 |
| **付费广告测试** | memory 里有 marketing-strategy 文档 | 内容沉淀够后 |
| **技术资源页** | 类似 3erp "Digital Manufacturing Resources"，把博客 + 下载资源整合 | 资源库 ≥ 5 个 |
| **多语言** | 主要市场是 EU / NA，但 LATAM / SEA 也是机会 | 流量稳定后 |

---

## 🎬 推荐的下周节奏

```
周一    → §1.1 + §1.2     跑回填 SQL + 手机端 QA
周二    → §3.T3            修残留文案（5 分钟）+ 反馈摄影方案
周三-四 → §3.T1            暗色 CTA banner 上线
周五    → §3.T2            案例模块（如能给到 2-3 个真实项目）
下周末  → 看 GA 数据,决定下下周方向
```

如果摄影本周内能落实，T4-T6 可以并行往后推。
如果短期不行，**T1 + T2 + T3** 是不依赖摄影也能拿到的最大收益组合。

---

## 上次会话最终落地清单（参考）

| 域 | 改动 | Commit |
|---|---|---|
| 邮件采集闭环 | leads 表加 `product_interest`，3 个有产品上下文的入口写入，admin 可见 | `e5e8b7d` |
| 首页 Why* 三块合并 | 删 WhyChooseMe / WhyGuangdong / Trust，合成 WhyPearlGate | `8d699bb` |
| 首页广东证据条删除 | 24h 工厂访问救成 chip 后整段删 | `89abc50` |
| 文档：3erp 学习笔记 | landing-page-3erp-lessons.md | `37d862b` |
| 首页 BYD 客户 logo 条 | BYDExperienceLogos（Dell/Toshiba/Lenovo/Huawei/Siemens/ASUS） | `dfdaf41` |
| 首页国旗段删除 + logo 条尺寸 | SocialProof 简化为 3 个数字，logo 条调大 | `3d3110d` |
| About 页 Meet Alex 改版 | eyebrow + 三行分行标题 + 两段简介 + Career Timeline + 4 chips | `d1b6870` |
| 全站年份对齐 | 修 BYD 任职年份与 timeline 一致 | `7c71ae9` |
| 全站 11→12 年统一 | 6 文件 13 处对齐 2012-2024 口径 | `001c9d4` |

本地 checkpoint tag: `checkpoint/2026-06-12-landing-byd-logo`
