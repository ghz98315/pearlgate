#!/usr/bin/env node

/**
 * PearlGate 全业务自动化测试脚本
 *
 * 测试内容：
 * 1. Request Sample API (邮件 + 数据库)
 * 2. Quote API (邮件)
 * 3. 页面可访问性
 * 4. Supabase 数据验证
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'blue');
  console.log('='.repeat(60));
}

// 测试结果收集
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  tests: [],
};

function recordTest(name, passed, details = '') {
  results.total++;
  if (passed) {
    results.passed++;
    log(`✓ ${name}`, 'green');
  } else {
    results.failed++;
    log(`✗ ${name}`, 'red');
    if (details) log(`  ${details}`, 'gray');
  }
  results.tests.push({ name, passed, details });
}

// 1. 测试 Request Sample API
async function testRequestSampleAPI() {
  logSection('测试 1: Request Sample API');

  const testData = {
    fullName: 'Test User ' + Date.now(),
    company: 'Test Company',
    email: 'test@example.com',
    whatsapp: '+86 138 0000 0000',
    country: 'China',
    targetMarket: 'North America',
    chargingStandard: 'CCS1',
    certificationsNeeded: ['UL', 'FCC'],
    intendedUse: 'Commercial Testing',
    estimatedVolume: '1000 units/month',
    oemRequirements: 'Custom branding for testing',
    message: 'This is an automated test submission',
    productName: 'Test Product',
    productCategory: 'Test Category',
    productUrl: `${BASE_URL}/test`,
  };

  try {
    const response = await fetch(`${BASE_URL}/api/request-sample`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });

    const data = await response.json();

    // 检查响应状态
    recordTest(
      'Request Sample API 响应成功',
      response.ok,
      response.ok ? '' : `状态码: ${response.status}`
    );

    // 检查返回数据
    if (response.ok) {
      recordTest('返回 success: true', data.success === true);
      recordTest('返回 Reference ID', !!data.referenceId, data.referenceId);
      recordTest(
        'Reference ID 格式正确 (PG-YYYYMMDD-HHMMSS)',
        /^PG-\d{8}-\d{6}$/.test(data.referenceId || ''),
        data.referenceId
      );
      recordTest('邮件发送状态', data.emailSent !== undefined, `emailSent: ${data.emailSent}`);

      return { success: true, referenceId: data.referenceId };
    }

    return { success: false };
  } catch (error) {
    recordTest('Request Sample API 连接', false, error.message);
    return { success: false };
  }
}

// 2. 测试 Quote API
async function testQuoteAPI() {
  logSection('测试 2: Quote API (旧表单)');

  const testData = {
    name: 'Test User ' + Date.now(),
    company: 'Test Company',
    email: 'test@example.com',
    category: 'EV Charging Cables',
    product: 'CCS1 Cable',
    quantity: '1000 units',
    targetPrice: '$100',
    details: 'Automated test submission',
  };

  try {
    const response = await fetch(`${BASE_URL}/api/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });

    const data = await response.json();

    recordTest(
      'Quote API 响应成功',
      response.ok,
      response.ok ? '' : `状态码: ${response.status}`
    );

    if (response.ok) {
      recordTest('返回 success: true', data.success === true);
      recordTest('邮件发送状态', data.emailSent !== undefined, `emailSent: ${data.emailSent}`);
    }
  } catch (error) {
    recordTest('Quote API 连接', false, error.message);
  }
}

// 3. 测试页面可访问性
async function testPageAccessibility() {
  logSection('测试 3: 页面可访问性');

  const pages = [
    { path: '/', name: '首页' },
    { path: '/about', name: 'About 页面' },
    { path: '/blog', name: 'Blog 页面' },
    { path: '/products/portable-ev-chargers', name: '便携式充电器分类页' },
    { path: '/products/ev-charging-cables', name: '充电线缆分类页' },
    { path: '/products/ev-charging-adapters', name: '充电适配器分类页' },
    { path: '/products/ev-connectors', name: '连接器分类页' },
    { path: '/supplier-match', name: 'OEM Match 页面' },
    { path: '/factory-verification', name: 'Factory Verification 页面' },
    { path: '/thank-you', name: 'Thank You 页面' },
  ];

  for (const page of pages) {
    try {
      const response = await fetch(`${BASE_URL}${page.path}`);
      recordTest(
        `${page.name} 可访问`,
        response.ok,
        response.ok ? '' : `状态码: ${response.status}`
      );
    } catch (error) {
      recordTest(`${page.name} 可访问`, false, error.message);
    }
  }
}

// 4. 测试 Supabase 连接（可选）
async function testSupabaseConnection() {
  logSection('测试 4: Supabase 数据库连接');

  try {
    const { createClient } = await import('@supabase/supabase-js');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      recordTest('Supabase 环境变量配置', false, '缺少 SUPABASE_URL 或 SERVICE_ROLE_KEY');
      return;
    }

    recordTest('Supabase 环境变量配置', true);

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 测试查询
    const { data, error } = await supabase
      .from('sample_requests')
      .select('count')
      .limit(1);

    if (error) {
      recordTest('Supabase 数据库连接', false, error.message);
    } else {
      recordTest('Supabase 数据库连接', true);
      recordTest('sample_requests 表可访问', true);
    }
  } catch (error) {
    recordTest('Supabase 测试', false, error.message);
  }
}

// 5. 测试 Resend API Key
async function testResendConfig() {
  logSection('测试 5: Resend 配置');

  const resendKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  recordTest(
    'RESEND_API_KEY 已配置',
    !!resendKey && resendKey !== 're_your_api_key_here',
    resendKey ? '已配置' : '未配置或使用占位符'
  );

  recordTest(
    'ADMIN_EMAIL 已配置',
    !!adminEmail,
    adminEmail || '未配置'
  );
}

// 主测试函数
async function runAllTests() {
  log('\n🚀 开始 PearlGate 全业务自动化测试\n', 'blue');
  log(`测试环境: ${BASE_URL}\n`, 'gray');

  // 运行所有测试
  await testResendConfig();
  await testSupabaseConnection();
  await testPageAccessibility();
  await testRequestSampleAPI();
  await testQuoteAPI();

  // 输出测试报告
  logSection('测试报告');
  log(`总测试数: ${results.total}`, 'blue');
  log(`通过: ${results.passed}`, 'green');
  log(`失败: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
  log(`通过率: ${((results.passed / results.total) * 100).toFixed(1)}%`, 'blue');

  if (results.failed > 0) {
    log('\n失败的测试:', 'red');
    results.tests
      .filter(t => !t.passed)
      .forEach(t => {
        log(`  • ${t.name}`, 'red');
        if (t.details) log(`    ${t.details}`, 'gray');
      });
  }

  log('\n✨ 测试完成\n', 'blue');

  // 退出码
  process.exit(results.failed > 0 ? 1 : 0);
}

// 执行测试
runAllTests().catch(error => {
  log(`\n❌ 测试执行出错: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
