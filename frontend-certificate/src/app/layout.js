import { Inter } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/context/Web3Provider';
import Notification from '@/components/Notification';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CertifiChain - Verifikasi Sertifikat',
  description: 'Platform verifikasi sertifikat digital terdesentralisasi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          {children}
          <Notification />
        </Web3Provider>
      </body>
    </html>
  );
}