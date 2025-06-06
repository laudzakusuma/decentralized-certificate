'use client';
import { useState } from 'react';
import styles from './VerificationForm.module.css';
import { useWeb3 } from '@/context/Web3Provider';

// ... (logika fetchFromIPFS tetap sama)

const VerificationForm = ({ setCertificateData }) => {
    const { contract, setIsLoading, showNotification, isLoading } = useWeb3();
    const [tokenId, setTokenId] = useState('');

    const handleVerify = async (e) => {
        // ... (logika handleVerify tetap sama seperti sebelumnya)
        // Pastikan logika ini sudah ada dari langkah sebelumnya
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Verifikasi Sertifikat</h2>
            <form onSubmit={handleVerify}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ID Sertifikat atau Alamat Wallet</label>
                    <input 
                      type="text" 
                      id="verifyInput" 
                      className={styles.formInput} 
                      placeholder="Masukkan ID sertifikat atau alamat wallet (0x...)"
                      value={tokenId}
                      onChange={(e) => setTokenId(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button type="submit" className={styles.btn} disabled={isLoading}>
                        {isLoading ? <span className={styles.loader}></span> : 'Verifikasi Sekarang'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VerificationForm;