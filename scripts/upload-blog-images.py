# 图片上传脚本
# -*- coding: utf-8 -*-

import requests
import sys
import io
from pathlib import Path
from PIL import Image
import os

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 配置
SUPABASE_URL = "https://gbvjtamwtkosftccaeif.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdidmp0YW13dGtvc2Z0Y2NhZWlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk2ODUxNCwiZXhwIjoyMDk0NTQ0NTE0fQ.tX0hN55WE9XmwwMA122MFGAATPB-K3hgkrFCUb-n_ug"
STORAGE_BUCKET = "blog-images"

# 图片文件映射
IMAGE_DIR = r"D:\Workshop\Hermes\ObsidianVault\01-Projects\PearlGate\推广策略\_Blog_Content_Assets\blog-published\2026-06\reliable-ev-charging-suppliers-china\images"

IMAGES = {
    "featured": {
        "local_path": os.path.join(IMAGE_DIR, "featured-image-suppliers-china.png"),
        "storage_path": "ev-charging-suppliers-china/featured.jpg",
        "max_width": 1200
    },
    "comparison": {
        "local_path": os.path.join(IMAGE_DIR, "comparison-consumer-vs-automotive.png"),
        "storage_path": "ev-charging-suppliers-china/comparison.jpg",
        "max_width": 800
    },
    "checklist": {
        "local_path": os.path.join(IMAGE_DIR, "factory-audit-checklist.png"),
        "storage_path": "ev-charging-suppliers-china/checklist.jpg",
        "max_width": 800
    },
    "red-flags": {
        "local_path": os.path.join(IMAGE_DIR, "red-flags-suppliers.png"),
        "storage_path": "ev-charging-suppliers-china/red-flags.jpg",
        "max_width": 800
    }
}

def compress_image(input_path, max_width=1200, quality=85):
    """压缩图片"""
    print(f"  压缩图片: {input_path}")

    img = Image.open(input_path)

    # 转换为 RGB（如果是 PNG）
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
        img = background

    # 调整尺寸
    if img.width > max_width:
        ratio = max_width / img.width
        new_height = int(img.height * ratio)
        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        print(f"  调整尺寸: {img.width}x{img.height}")

    # 保存为 JPEG
    output = io.BytesIO()
    img.save(output, format='JPEG', quality=quality, optimize=True)
    output.seek(0)

    size_kb = len(output.getvalue()) / 1024
    print(f"  压缩后大小: {size_kb:.1f} KB")

    return output.getvalue()

def upload_to_supabase(image_data, storage_path):
    """上传到 Supabase Storage"""
    url = f"{SUPABASE_URL}/storage/v1/object/{STORAGE_BUCKET}/{storage_path}"

    headers = {
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "image/jpeg"
    }

    response = requests.post(url, data=image_data, headers=headers)

    if response.status_code in [200, 201]:
        public_url = f"{SUPABASE_URL}/storage/v1/object/public/{STORAGE_BUCKET}/{storage_path}"
        return public_url
    else:
        raise Exception(f"上传失败: {response.status_code} - {response.text}")

def main():
    print("=" * 60)
    print("博客图片上传工具")
    print("=" * 60)
    print()

    uploaded_urls = {}

    for key, config in IMAGES.items():
        local_path = config['local_path']

        if not os.path.exists(local_path):
            print(f"⚠️  跳过 {key}: 文件不存在 ({local_path})")
            continue

        print(f"📸 处理 {key}:")
        print(f"  本地路径: {local_path}")

        try:
            # 压缩
            compressed = compress_image(local_path, config['max_width'])

            # 上传
            print(f"  上传到: {config['storage_path']}")
            public_url = upload_to_supabase(compressed, config['storage_path'])

            uploaded_urls[key] = public_url
            print(f"  ✅ 成功: {public_url}")
            print()

        except Exception as e:
            print(f"  ❌ 失败: {str(e)}")
            print()

    print("=" * 60)
    print("上传完成！")
    print("=" * 60)
    print()
    print("图片 URL：")
    for key, url in uploaded_urls.items():
        print(f"{key}: {url}")
    print()
    print("下一步：在文章 Markdown 中使用这些 URL")

if __name__ == "__main__":
    # 检查依赖
    try:
        from PIL import Image
    except ImportError:
        print("错误：请先安装 Pillow")
        print("运行: pip install Pillow")
        sys.exit(1)

    main()
