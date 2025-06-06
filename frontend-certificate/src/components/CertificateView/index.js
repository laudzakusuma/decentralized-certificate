'use client';
import styles from './CertificateView.module.css';
import { motion } from 'framer-motion';

const CertificateView = ({ data, onBack }) => {
  if (!data) return null;

  const getAttribute = (key) => {
    const attr = data.attributes?.find(a => a.trait_type === key);
    return attr ? attr.value : 'N/A';
  }

  const formatAddress = (addr) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.checkIcon}>✔</span> TERVERIFIKASI
        </div>
        <button onClick={onBack} className={styles.backButton}>← Kembali</button>
      </div>
      
      <div className={styles.content}>
        <div className={styles.logo}>CertifiChain</div>
        <h1 className={styles.courseName}>{getAttribute('Kursus')}</h1>
        <p className={styles.awardedTo}>Diberikan kepada</p>
        <h2 className={styles.recipientName}>{getAttribute('Penerima')}</h2>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span>Tanggal Terbit</span>
            <strong>{getAttribute('Tanggal')}</strong>
          </div>
          <div className={styles.detailItem}>
            <span>ID Sertifikat</span>
            <strong>#{data.tokenId}</strong>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p>Pemilik Sah: {formatAddress(data.owner)}</p>
        <a 
          href={`https://amoy.polygonscan.com/token/${"0x5F3b8A1a638De722be1C521456b1915A2871e0A3"}?a=${data.tokenId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.explorerLink}
        >
          Lihat di Explorer
        </a>
      </div>
    </motion.div>
  );
};

export default CertificateView;