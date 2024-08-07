import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CRUD App',
  description:
    'CRUD app made with Next.js, Node.js, Express, MongoDB and Docker. Hosted with Serverless and AWS ECS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex min-h-screen flex-col items-center justify-between p-10 lg:p-24'>
          <div className='container mx-auto'>{children}</div>
        </main>
      </body>
    </html>
  );
}
