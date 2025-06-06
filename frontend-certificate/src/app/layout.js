import { Inter } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/context/Web3Provider';
import Notification from '@/components/Notification';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CertifiChain - Sistem Verifikasi Sertifikat',
  description: 'Platform verifikasi sertifikat digital terdesentralisasi',
};

// Buat file `src/app/layout.module.css` untuk styling layout
const BackgroundAnimation = () => (
  <div className={styles.bgAnimation}>
    <div className={styles.floatingShapes}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
    </div>
  </div>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundAnimation />
        <Web3Provider>
          {children}
          <Notification />
        </Web3Provider>
      </body>
    </html>
  );
}