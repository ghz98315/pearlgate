import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import {
  buildSampleRequestConfirmationEmail,
  buildSampleRequestNotificationEmail,
  type SampleRequestData,
} from "@/lib/emails";
import { upsertLead, extractRequestMeta } from "@/lib/leads";

interface RequestSampleData {
  fullName: string;
  company: string;
  email: string;
  whatsapp: string;
  country: string;
  targetMarket: string;
  chargingStandard: string;
  certificationsNeeded: string[];
  intendedUse: string;
  estimatedVolume: string;
  oemRequirements: string;
  message: string;
  productName: string;
  productCategory: string;
  productUrl: string;
}

async function generateReferenceId(): Promise<string> {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const dateStr = `${year}${month}${day}`;
  const timeStr = `${hours}${minutes}${seconds}`;

  // 查询今天这个时间戳已有的最大编号
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // 如果没有数据库，默认使用 001
    return `PG-${dateStr}-${timeStr}001`;
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 查询今天这个时间的最大编号
    const { data, error } = await supabase
      .from("sample_requests")
      .select("reference_id")
      .like("reference_id", `PG-${dateStr}-${timeStr}%`)
      .order("reference_id", { ascending: false })
      .limit(1);

    if (error) {
      console.error("查询 Reference ID 失败:", error);
      return `PG-${dateStr}-${timeStr}001`;
    }

    // 计算下一个编号
    let nextNumber = 1;
    if (data && data.length > 0) {
      const lastId = data[0].reference_id;
      // 提取最后3位数字
      const lastNumberStr = lastId.slice(-3);
      const lastNumber = parseInt(lastNumberStr, 10);
      nextNumber = lastNumber + 1;
    }

    const numberStr = String(nextNumber).padStart(3, "0");
    return `PG-${dateStr}-${timeStr}${numberStr}`;
  } catch (error) {
    console.error("生成 Reference ID 出错:", error);
    // 后备方案
    return `PG-${dateStr}-${timeStr}001`;
  }
}

async function saveToDatabase(data: SampleRequestData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log("⚠️  Supabase 未配置，跳过数据库保存");
    console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "已配置" : "未配置");
    console.log("SUPABASE_SERVICE_ROLE_KEY:", supabaseKey ? "已配置" : "未配置");
    return;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("🔄 正在保存到 Supabase...");
    console.log("Reference ID:", data.referenceId);

    const { data: result, error } = await supabase
      .from("sample_requests")
      .insert([
        {
          reference_id: data.referenceId,
          full_name: data.fullName,
          company: data.company,
          email: data.email,
          whatsapp: data.whatsapp || null,
          country: data.country,
          target_market: data.targetMarket,
          product_name: data.productName,
          product_category: data.productCategory,
          product_url: data.productUrl || null,
          charging_standard: data.chargingStandard || null,
          certifications_needed: data.certificationsNeeded || [],
          intended_use: data.intendedUse || null,
          estimated_volume: data.estimatedVolume || null,
          oem_requirements: data.oemRequirements || null,
          message: data.message || null,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("❌ Supabase 保存失败:");
      console.error("错误代码:", error.code);
      console.error("错误消息:", error.message);
      console.error("错误详情:", error.details);
      throw error;
    }

    console.log("✅ 成功保存到 Supabase!");
    console.log("记录 ID:", result?.[0]?.id);
    return result;
  } catch (error) {
    console.error("❌ 保存到数据库时出错:");
    console.error(error);
    // 不抛出错误，继续处理（邮件仍会发送）
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: RequestSampleData = await request.json();

    // 验证必填字段
    if (!data.fullName || !data.company || !data.email || !data.country || !data.targetMarket) {
      return NextResponse.json(
        { error: "缺少必填字段" },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "邮箱格式无效" },
        { status: 400 }
      );
    }

    // 生成 Reference ID
    const referenceId = await generateReferenceId();

    const emailData: SampleRequestData = {
      ...data,
      referenceId,
    };

    // 获取配置
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || "Alex.Guan@pearlgatesourcing.com";

    // 保存到数据库
    await saveToDatabase(emailData);

    // 同步到统一 leads 表(邮箱闭环)
    const reqMeta = extractRequestMeta(request);
    await upsertLead({
      email: data.email,
      source: "sample_request",
      fullName: data.fullName,
      company: data.company,
      country: data.country,
      whatsapp: data.whatsapp || null,
      metadata: {
        referenceId,
        productName: data.productName,
        productCategory: data.productCategory,
        productUrl: data.productUrl || null,
        targetMarket: data.targetMarket,
        chargingStandard: data.chargingStandard || null,
        certificationsNeeded: data.certificationsNeeded || [],
        intendedUse: data.intendedUse || null,
        estimatedVolume: data.estimatedVolume || null,
        oemRequirements: data.oemRequirements || null,
      },
      ...reqMeta,
    });

    // 如果没有 API Key，只保存数据库，不发送邮件
    if (!apiKey) {
      console.log("⚠️  未配置 RESEND_API_KEY，跳过邮件发送");
      return NextResponse.json({
        success: true,
        referenceId,
        emailSent: false,
        message: "请求已接收，但邮件服务未配置",
      });
    }

    const resend = new Resend(apiKey);

    // 并行发送确认邮件和通知邮件
    try {
      await Promise.all([
        // 发送给客户的确认邮件
        resend.emails.send({
          from: "PearlGate <Alex.Guan@pearlgatesourcing.com>",
          to: data.email,
          subject: "Sample Request Confirmation — PearlGate",
          html: buildSampleRequestConfirmationEmail(emailData),
        }),
        // 发送给管理员的通知邮件
        resend.emails.send({
          from: "PearlGate Samples <samples@pearlgatesourcing.com>",
          to: adminEmail,
          subject: `[New Sample Request] ${data.productName} — ${data.fullName}`,
          html: buildSampleRequestNotificationEmail(emailData),
          replyTo: data.email,
        }),
      ]);

      return NextResponse.json({
        success: true,
        referenceId,
        emailSent: true,
        message: "样品请求已提交成功",
      });
    } catch (emailError) {
      console.error("邮件发送失败:", emailError);

      // 即使邮件失败，也返回成功（因为数据已保存）
      return NextResponse.json({
        success: true,
        referenceId,
        emailSent: false,
        message: "请求已保存，但邮件发送失败",
      });
    }
  } catch (error) {
    console.error("处理样品请求时出错:", error);
    return NextResponse.json(
      { error: "内部服务器错误" },
      { status: 500 }
    );
  }
}
