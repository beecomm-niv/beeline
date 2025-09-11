import ThemeWrapper from '../components/theme/ThemeWrapper';
import { Assistant } from 'next/font/google';
import { Locale } from '../models/locales';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const assistant = Assistant({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '700'],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <body className={assistant.className}>
        <AppRouterCacheProvider>
          <ThemeWrapper lang={locale}>{children}</ThemeWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
