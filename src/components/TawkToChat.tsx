'use client';

import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    // Tawk.to 配置
    const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    // 如果没有配置，不加载
    if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID) {
      console.log('Tawk.to not configured. To enable live chat:');
      console.log('1. Sign up at https://www.tawk.to/');
      console.log('2. Get your Property ID and Widget ID');
      console.log('3. Add to Vercel environment variables:');
      console.log('   NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id');
      console.log('   NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id');
      console.log('');
      console.log('Note: IDs must be lowercase alphanumeric only (no special characters)');
      return;
    }

    // 验证 ID 格式（必须是小写字母数字）
    const isValidId = (id: string) => /^[a-z0-9]+$/.test(id);

    if (!isValidId(TAWK_PROPERTY_ID)) {
      console.error('Invalid TAWK_PROPERTY_ID format. Must be lowercase alphanumeric only.');
      console.log('Current value:', TAWK_PROPERTY_ID);
      console.log('Example valid format: 5f9a1b2c3d4e5f6g7h8i9j0k');
      return;
    }

    if (!isValidId(TAWK_WIDGET_ID)) {
      console.error('Invalid TAWK_WIDGET_ID format. Must be lowercase alphanumeric only.');
      console.log('Current value:', TAWK_WIDGET_ID);
      console.log('Example valid format: default or 1a2b3c4d');
      return;
    }

    // 避免重复加载
    if ((window as any).Tawk_API) {
      return;
    }

    // 加载 Tawk.to 脚本
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    // Tawk.to API 初始化
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_LoadStart = new Date();

    // 自定义设置
    script.onload = () => {
      const Tawk_API = (window as any).Tawk_API;

      // 设置访客信息（如果有）
      Tawk_API.onLoad = function() {
        console.log('Tawk.to chat loaded successfully');
      };

      // 错误处理
      Tawk_API.onChatError = function(error: any) {
        console.error('Tawk.to error:', error);
      };
    };

    script.onerror = () => {
      console.error('Failed to load Tawk.to script. Check your Property ID and Widget ID.');
    };

    return () => {
      // 清理
      if ((window as any).Tawk_API && (window as any).Tawk_API.hideWidget) {
        (window as any).Tawk_API.hideWidget();
      }
    };
  }, []);

  return null; // 不渲染任何内容，只加载脚本
}
