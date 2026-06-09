import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { upsertLead, extractRequestMeta } from '@/lib/leads';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, product_interest, resource_name } = body;

    // 验证必填字段
    if (!name || !email || !resource_name) {
      return NextResponse.json(
        { error: 'Name, email, and resource_name are required' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 获取用户信息
    const userAgent = request.headers.get('user-agent') || null;
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : null;

    // 保存到数据库
    const { data, error } = await supabase
      .from('resource_downloads')
      .insert([
        {
          name,
          email,
          company: company || null,
          product_interest: product_interest || null,
          resource_name,
          user_agent: userAgent,
          ip_address: ipAddress,
        },
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save download record' },
        { status: 500 }
      );
    }

    // 同步到统一 leads 表(邮箱闭环)
    const reqMeta = extractRequestMeta(request);
    await upsertLead({
      email,
      source: 'resource_download',
      fullName: name,
      company: company || null,
      metadata: {
        resourceName: resource_name,
        productInterest: product_interest || null,
        downloadId: data[0].id,
      },
      ...reqMeta,
    });

    return NextResponse.json({
      success: true,
      downloadId: data[0].id,
    });
  } catch (error) {
    console.error('Resource download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
