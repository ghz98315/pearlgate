'use client';

import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    // Tawk.to 配置
    const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

    // 如果没有配置，不加载
    if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID) {
      console.log('Tawk.to not configured. Add NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID to environment variables.');
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
        // 可以在这里设置访客属性
        // Tawk_API.setAttributes({
        //   'name': 'Visitor Name',
        //   'email': 'visitor@email.com',
        // });
      };

      // 自定义欢迎消息
      Tawk_API.onChatMaximized = function() {
        // 聊天窗口打开时的行为
      };
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
