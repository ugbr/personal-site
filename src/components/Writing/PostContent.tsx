'use client';

import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <Markdown
      options={{
        overrides: {
          img: {
            component: ({ alt, src }: { alt?: string; src?: string }) => {
              if (!src) {
                return null;
              }

              return (
                <Image
                  src={src}
                  alt={alt || ''}
                  width={1200}
                  height={630}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              );
            },
          },
          // Wide tables need their own scroll container so the page body
          // never scrolls sideways on narrow screens.
          table: {
            component: ({ children }: { children?: ReactNode }) => (
              <div className="prose-table-scroll">
                <table>{children}</table>
              </div>
            ),
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
}
