// Google Analytics 事件追踪工具
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

// 预定义的事件类型
export const GA_EVENTS = {
  // 表单提交
  FORM_SUBMIT: 'form_submit',
  QUOTE_REQUEST: 'quote_request',
  SAMPLE_REQUEST: 'sample_request',
  EMAIL_CAPTURE: 'email_capture',

  // 用户交互
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',
  SEARCH: 'search',
  FILTER: 'filter',

  // 页面交互
  PAGE_VIEW: 'page_view',
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',

  // 内容交互
  SUPPLIER_VIEW: 'supplier_view',
  PRODUCT_VIEW: 'product_view',
  BLOG_READ: 'blog_read',

  // 下载
  FILE_DOWNLOAD: 'file_download',

  // 导航
  NAV_CLICK: 'navigation_click',
  CTA_CLICK: 'cta_click',
};

// 常用事件追踪函数
export const analytics = {
  // 表单提交
  trackFormSubmit: (formName: string, formData?: Record<string, any>) => {
    trackEvent(GA_EVENTS.FORM_SUBMIT, {
      form_name: formName,
      ...formData,
    });
  },

  // 询盘请求
  trackQuoteRequest: (details?: Record<string, any>) => {
    trackEvent(GA_EVENTS.QUOTE_REQUEST, {
      event_category: 'engagement',
      event_label: 'Quote Request Submitted',
      value: 1,
      ...details,
    });
  },

  // 样品申请
  trackSampleRequest: (supplierId?: string) => {
    trackEvent(GA_EVENTS.SAMPLE_REQUEST, {
      event_category: 'engagement',
      event_label: 'Sample Request',
      supplier_id: supplierId,
      value: 1,
    });
  },

  // 邮件订阅
  trackEmailCapture: (source?: string) => {
    trackEvent(GA_EVENTS.EMAIL_CAPTURE, {
      event_category: 'engagement',
      event_label: 'Email Captured',
      source: source,
      value: 1,
    });
  },

  // 按钮点击
  trackButtonClick: (buttonName: string, location?: string) => {
    trackEvent(GA_EVENTS.BUTTON_CLICK, {
      event_category: 'engagement',
      button_name: buttonName,
      location: location,
    });
  },

  // 搜索
  trackSearch: (searchTerm: string, resultCount?: number) => {
    trackEvent(GA_EVENTS.SEARCH, {
      search_term: searchTerm,
      result_count: resultCount,
    });
  },

  // 筛选
  trackFilter: (filterType: string, filterValue: string) => {
    trackEvent(GA_EVENTS.FILTER, {
      filter_type: filterType,
      filter_value: filterValue,
    });
  },

  // 供应商查看
  trackSupplierView: (supplierId: string, supplierName: string) => {
    trackEvent(GA_EVENTS.SUPPLIER_VIEW, {
      event_category: 'engagement',
      supplier_id: supplierId,
      supplier_name: supplierName,
    });
  },

  // 产品查看
  trackProductView: (productId: string, productName: string) => {
    trackEvent(GA_EVENTS.PRODUCT_VIEW, {
      event_category: 'engagement',
      product_id: productId,
      product_name: productName,
    });
  },

  // 博客阅读
  trackBlogRead: (blogSlug: string, blogTitle: string, scrollDepth?: number) => {
    trackEvent(GA_EVENTS.BLOG_READ, {
      event_category: 'engagement',
      blog_slug: blogSlug,
      blog_title: blogTitle,
      scroll_depth: scrollDepth,
    });
  },

  // 滚动深度
  trackScrollDepth: (depth: number, page: string) => {
    trackEvent(GA_EVENTS.SCROLL_DEPTH, {
      scroll_depth: depth,
      page_path: page,
    });
  },

  // CTA 点击
  trackCTAClick: (ctaName: string, location: string) => {
    trackEvent(GA_EVENTS.CTA_CLICK, {
      event_category: 'cta',
      cta_name: ctaName,
      location: location,
      value: 1,
    });
  },

  // 文件下载
  trackFileDownload: (fileName: string, fileType: string) => {
    trackEvent(GA_EVENTS.FILE_DOWNLOAD, {
      event_category: 'engagement',
      file_name: fileName,
      file_type: fileType,
    });
  },
};

// 自动追踪外部链接点击
export const initAutoTracking = () => {
  if (typeof window === 'undefined') return;

  // 追踪外部链接
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');

    if (link && link.href) {
      const url = new URL(link.href, window.location.href);

      // 外部链接
      if (url.hostname !== window.location.hostname) {
        trackEvent(GA_EVENTS.LINK_CLICK, {
          event_category: 'outbound',
          link_url: link.href,
          link_text: link.textContent,
        });
      }
    }
  });

  // 追踪滚动深度
  let maxScroll = 0;
  const scrollDepths = [25, 50, 75, 90];
  let trackedDepths: number[] = [];

  window.addEventListener('scroll', () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;
    }

    scrollDepths.forEach((depth) => {
      if (scrollPercentage >= depth && !trackedDepths.includes(depth)) {
        trackedDepths.push(depth);
        analytics.trackScrollDepth(depth, window.location.pathname);
      }
    });
  });
};
