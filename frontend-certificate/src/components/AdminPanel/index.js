'use client';
import { useState } from 'react';
import styles from './AdminPanel.module.css';
import { motion } from 'framer-motion';
import { useWeb3 } from '@/context/Web3Provider';

// Placeholder untuk upload ke IPFS. Dalam proyek nyata,
// ini akan menggunakan Pinata SDK atau API Infura.
const uploadToIPFS = async (recipientName, courseName) => {
  // Ini hanya simulasi. Seharusnya ada proses pembuatan gambar
  // dan upload file JSON & gambar ke IPFS.
  const metadata = {
    name: `Sertifikat untuk ${recipientName}`,
    description: `Sertifikat ini diberikan atas penyelesaian kursus: ${courseName}.`,
    image: "ipfs://QmZ4Y.../placeholder.png", // Ganti dengan CID gambar sertifikat asli
    attributes: [
      { trait_type: "Penerima", value: recipientName },
      { trait_type: "Kursus", value: courseName },
      { trait_type: "Tanggal", value: new Date().toLocaleDateString() },
    ],
  };
  // Simulasi upload, mengembalikan URI palsu
  const simulatedCID = 'QmXo7b...Z4fV'; // Contoh CID
  console.log("Simulasi upload metadata ke IPFS:", metadata);
  return `ipfs://${simulatedCID}`;
};


const AdminPanel = () => {
  const { contract, setIsLoading, showNotification, isLoading } = useWeb3();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [courseName, setCourseName] = useState('');

  const handleMint = async (e) => {
    e.preventDefault();
    if (!contract) {
      showNotification("Harap hubungkan wallet Anda terlebih dahulu.");
      return;
    }
    if (!recipientAddress.trim() || !recipientName.trim() || !courseName.trim()) {
      showNotification("Harap lengkapi semua field.");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Upload metadata ke IPFS
      const tokenURI = await uploadToIPFS(recipientName, courseName);
      if (!tokenURI) throw new Error("Gagal mengunggah metadata ke IPFS.");
      
      // 2. Panggil fungsi mint di smart contract
      const tx = await contract.safeMint(recipientAddress, tokenURI);
      
      showNotification("Memproses transaksi... Mohon tunggu.", "success");
      await tx.wait(); // Menunggu transaksi selesai
      
      showNotification(`Sertifikat berhasil diterbitkan! Tx: ${tx.hash.substring(0,10)}...`, "success");
      // Reset form
      setRecipientAddress('');
      setRecipientName('');
      setCourseName('');

    } catch (err) {
      showNotification("Gagal menerbitkan sertifikat.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={styles.title}>Admin Panel</h1>
      <p className={styles.subtitle}>Terbitkan sertifikat baru untuk pengguna.</p>
      <form onSubmit={handleMint} className={styles.form}>
        <div className={styles.inputGroup}>
          <input type="text" id="recipientAddress" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} className={styles.input} placeholder=" " disabled={isLoading} />
          <label htmlFor="recipientAddress" className={styles.label}>Alamat Wallet Penerima</label>
        </div>
        <div className={styles.inputGroup}>
          <input type="text" id="recipientName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className={styles.input} placeholder=" " disabled={isLoading} />
          <label htmlFor="recipientName" className={styles.label}>Nama Lengkap Penerima</label>
        </div>
        <div className={styles.inputGroup}>
          <input type="text" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} className={styles.input} placeholder=" " disabled={isLoading} />
          <label htmlFor="courseName" className={styles.label}>Nama Kursus/Pelatihan</label>
        </div>
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? <span className={styles.spinner}></span> : 'Terbitkan Sertifikat'}
        </button>
      </form>
    </motion.div>
  );
};

export default AdminPanel;