import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildSampleRequestConfirmationEmail,
  buildSampleRequestNotificationEmail,
  type SampleRequestData,
} from "@/lib/emails";

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

function generateReferenceId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `PG-${year}${month}${day}-${random}`;
}

async function saveToDatabase(data: SampleRequestData) {
  // TODO: 实现 Airtable 或 Notion 集成
  console.log("=== 保存到数据库 ===");
  console.log("Reference ID:", data.referenceId);
  console.log("数据:", JSON.stringify(data, null, 2));
  console.log("==========================");
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
    const referenceId = generateReferenceId();

    const emailData: SampleRequestData = {
      ...data,
      referenceId,
    };

    // 获取配置
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || "Alex.Guan@pearlgatesourcing.com";

    // 保存到数据库
    await saveToDatabase(emailData);

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
