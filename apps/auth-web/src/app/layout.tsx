import './globals.css';
import type { Metadata } from 'next';
import { AuthInitializer } from 'src/provider/AuthProvider';

export const metadata: Metadata = {
  title: 'Taxidi Authentication',
  description: 'Authentication for Taxidi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthInitializer>{children}</AuthInitializer>
      </body>
    </html>
  );
}
