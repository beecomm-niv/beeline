import ThemeWrapper from './components/theme/ThemeWrapper';
import { Assistant } from 'next/font/google';

const assistant = Assistant({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='he' dir='rtl'>
      <body className={assistant.className}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
