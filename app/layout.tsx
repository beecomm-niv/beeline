import { cookies } from 'next/headers';
import ThemeWrapper from './components/theme/ThemeWrapper';
import { Assistant } from 'next/font/google';

import api from './api/database';

const assistant = Assistant({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '700'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const coo = await cookies();
  const lang: 'he' | 'en' = (coo.get('lang')?.value as 'he' | 'en') || 'he';

  return (
    <html lang={lang} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <body className={assistant.className}>
        <ThemeWrapper lang={lang}>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
