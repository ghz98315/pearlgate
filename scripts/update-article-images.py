# 更新文章内容（添加图片）
# -*- coding: utf-8 -*-

import requests
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 配置
API_URL = "https://www.pearlgatesourcing.com/api/blog/f9f64b00-66e0-4452-abd6-89283c7deb22"
ADMIN_TOKEN = "pearlgate-admin-2026-secure-token"

# 图片 URL
IMAGES = {
    'comparison': 'https://gbvjtamwtkosftccaeif.supabase.co/storage/v1/object/public/blog-images/ev-charging-suppliers-china/comparison.jpg',
    'checklist': 'https://gbvjtamwtkosftccaeif.supabase.co/storage/v1/object/public/blog-images/ev-charging-suppliers-china/checklist.jpg',
    'redflags': 'https://gbvjtamwtkosftccaeif.supabase.co/storage/v1/object/public/blog-images/ev-charging-suppliers-china/red-flags.jpg'
}

print("正在获取文章...")
response = requests.get(API_URL)
data = response.json()
content = data['content']

print(f"原始内容长度: {len(content)} 字符")
print()

# 插入图片
lines = content.split('\n')
new_lines = []

for line in lines:
    new_lines.append(line)

    # 在标题后插入图片
    if line.strip() == '### Consumer Electronics vs Automotive-Grade EV Charging':
        new_lines.append('')
        new_lines.append(f'![Consumer vs Automotive Standards]({IMAGES["comparison"]})')
        new_lines.append('*Key differences between consumer electronics and automotive-grade EV charging requirements*')
        new_lines.append('')
        print("✅ 插入对比图")

    elif line.strip() == '## Red Flags When Evaluating Suppliers':
        new_lines.append('')
        new_lines.append(f'![Red Flags to Watch]({IMAGES["redflags"]})')
        new_lines.append('*Warning signs that indicate a supplier may not meet automotive-grade standards*')
        new_lines.append('')
        print("✅ 插入红旗图")

    elif line.strip() == '## The Factory Audit Checklist':
        new_lines.append('')
        new_lines.append(f'![Factory Audit Checklist]({IMAGES["checklist"]})')
        new_lines.append('*Essential items to verify during your factory visit*')
        new_lines.append('')
        print("✅ 插入检查清单图")

new_content = '\n'.join(new_lines)
print()
print(f"更新后内容长度: {len(new_content)} 字符")
print()

# 更新文章
print("正在更新文章...")
response = requests.put(
    API_URL,
    json={'content': new_content},
    headers={'Authorization': f'Bearer {ADMIN_TOKEN}'},
    timeout=30
)

if response.status_code == 200:
    print("✅ 更新成功！")
    print()
    print("3 张图片已添加到文章中：")
    print("1. 对比图 - Consumer Electronics vs Automotive-Grade 章节")
    print("2. 红旗图 - Red Flags When Evaluating Suppliers 章节")
    print("3. 检查清单图 - The Factory Audit Checklist 章节")
    print()
    print("访问: https://www.pearlgatesourcing.com/blog/reliable-ev-charging-suppliers-china")
else:
    print(f"❌ 更新失败: {response.status_code}")
    print(f"错误: {response.text}")
