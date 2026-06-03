import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateSEOMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  author = 'PearlGate',
  tags = [],
}: SEOProps): Metadata {
  const siteName = 'PearlGate';
  const defaultImage = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80';
  const imageUrl = image || defaultImage;
  const fullUrl = `https://pearlgate.com${url}`;

  return {
    title: `${title} — ${siteName}`,
    description,
    keywords: tags.join(', '),
    authors: [{ name: author }],
    openGraph: {
      type: type,
      locale: 'en_US',
      url: fullUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && publishedTime
        ? {
            publishedTime,
            authors: [author],
            tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@pearlgate',
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
