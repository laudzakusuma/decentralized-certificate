'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { AnimatePresence, motion } from 'framer-motion';

// Impor semua komponen yang diperlukan
import Header from '@/components/Header';
import WalletStatus from '@/components/WalletStatus';
import HomeSection from '@/components/HomeSection';
import AdminPanel from '@/components/AdminPanel';
import VerificationForm from '@/components/VerificationForm';
import AboutSection from '@/components/AboutSection';
import CertificateView from '@/components/CertificateView';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [certificateData, setCertificateData] = useState(null);

  const renderSection = () => {
    // Jika ada data sertifikat, tampilkan view sertifikat
    if (certificateData) {
      return <CertificateView data={certificateData} onBack={() => setCertificateData(null)} />;
    }

    // Jika tidak, tampilkan section yang aktif
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'admin':
        return <AdminPanel />;
      case 'verify':
        return <VerificationForm setCertificateData={setCertificateData} />;
      case 'about':
        return <AboutSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <>
      <WalletStatus />
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection + (certificateData ? 'cert' : 'no-cert')}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}