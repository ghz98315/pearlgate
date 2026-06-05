# 发布文章脚本
# -*- coding: utf-8 -*-

import requests
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 配置
API_URL = "https://www.pearlgatesourcing.com/api/blog/f9f64b00-66e0-4452-abd6-89283c7deb22"
ADMIN_TOKEN = "pearlgate-admin-2026-secure-token"

# 更新为已发布状态
payload = {
    "status": "published",
    "published_at": "2026-06-05T15:00:00Z"
}

print("正在发布文章...")
print(f"API: {API_URL}")
print()

try:
    response = requests.put(
        API_URL,
        json=payload,
        headers={
            "Authorization": f"Bearer {ADMIN_TOKEN}",
            "Content-Type": "application/json"
        },
        timeout=30
    )

    if response.status_code == 200:
        result = response.json()
        print("发布成功！")
        print(f"Post ID: {result.get('postId')}")
        print(f"Status: {result.get('status')}")
        print()
        print(f"访问: https://www.pearlgatesourcing.com/blog/reliable-ev-charging-suppliers-china")
    else:
        print(f"发布失败 (HTTP {response.status_code})")
        print(f"错误信息: {response.text}")

except Exception as e:
    print(f"请求出错: {str(e)}")
