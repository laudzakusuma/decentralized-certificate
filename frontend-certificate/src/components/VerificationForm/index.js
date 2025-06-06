'use client';
import { useState } from 'react';
import styles from './VerificationForm.module.css';
import { motion } from 'framer-motion';
import { useWeb3 } from '@/context/Web3Provider';

const fetchFromIPFS = async (ipfsUrl) => {
  if (!ipfsUrl || !ipfsUrl.startsWith('ipfs://')) return null;
  const cid = ipfsUrl.substring(7);
  // Menggunakan IPFS gateway publik yang andal
  const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
  if (!response.ok) throw new Error("Gagal mengambil data dari IPFS.");
  return response.json();
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const VerificationForm = ({ setCertificateData }) => {
  const { contract, setIsLoading, showNotification, isLoading } = useWeb3();
  const [tokenId, setTokenId] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!contract) {
      showNotification("Harap hubungkan wallet Anda terlebih dahulu.");
      return;
    }
    if (!tokenId.trim()) {
      showNotification("Harap masukkan ID Token sertifikat.");
      return;
    }

    setIsLoading(true);
    try {
      const owner = await contract.ownerOf(tokenId);
      const tokenUri = await contract.tokenURI(tokenId);
      const metadata = await fetchFromIPFS(tokenUri);
      
      setCertificateData({ ...metadata, owner, tokenId });
      showNotification("Sertifikat berhasil diverifikasi!", "success");
    } catch (err) {
      showNotification("Verifikasi gagal. Pastikan ID Token benar.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className={styles.wrapper}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className={styles.title} variants={itemVariants}>
        Verifikasi Sertifikat
      </motion.h1>
      <motion.p className={styles.subtitle} variants={itemVariants}>
        Masukkan ID unik sertifikat untuk melihat detail dan keasliannya.
      </motion.p>
      <motion.form onSubmit={handleVerify} className={styles.form} variants={itemVariants}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className={styles.input}
            placeholder="Contoh: 1"
            disabled={isLoading}
          />
          <label htmlFor="tokenId" className={styles.label}>ID Token Sertifikat</label>
        </div>
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? <span className={styles.spinner}></span> : 'Verifikasi Sekarang'}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default VerificationForm;