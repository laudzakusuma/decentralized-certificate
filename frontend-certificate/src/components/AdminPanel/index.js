'use client';
import { useState } from 'react';
import styles from './AdminPanel.module.css';
import { useWeb3 } from '@/context/Web3Provider';

const AdminPanel = () => {
    const { contract, setIsLoading, showNotification, isLoading } = useWeb3();
    const [formState, setFormState] = useState({
        studentName: '',
        walletAddress: '',
        studyProgram: '',
        educationLevel: '',
        graduationDate: '',
        gpa: '',
        certificateFile: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logika submit form (upload ke IPFS, panggil mint, dll.)
        // Anda bisa mengintegrasikan logika dari AdminPanel sebelumnya ke sini
        showNotification("Fitur penerbitan sedang dalam pengembangan.", "success");
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Portal Admin - Penerbitan Sertifikat</h2>
            <form id="certificateForm" onSubmit={handleSubmit}>
                {/* Nama Lengkap */}
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Nama Lengkap Mahasiswa</label>
                    <input type="text" name="studentName" onChange={handleInputChange} className={styles.formInput} placeholder="Masukkan nama lengkap" required />
                </div>
                {/* Alamat Wallet */}
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Alamat Wallet Mahasiswa</label>
                    <input type="text" name="walletAddress" onChange={handleInputChange} className={styles.formInput} placeholder="0x..." required />
                </div>
                {/* Program Studi */}
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Program Studi</label>
                    <select name="studyProgram" onChange={handleInputChange} className={styles.formSelect} required>
                        <option value="">Pilih Program Studi</option>
                        <option value="Teknik Informatika">Teknik Informatika</option>
                        {/* Tambahkan opsi lain */}
                    </select>
                </div>
                {/* Tanggal Kelulusan */}
                 <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Tanggal Kelulusan</label>
                    <input type="date" name="graduationDate" onChange={handleInputChange} className={styles.formInput} required />
                </div>
                {/* File Upload */}
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Upload Desain Sertifikat</label>
                    <div className={styles.fileUpload}>
                        <input type="file" id="certificateFile" name="certificateFile" onChange={handleInputChange} accept="image/*,.pdf" />
                        <label htmlFor="certificateFile" className={styles.fileUploadLabel}>
                           {formState.certificateFile ? formState.certificateFile.name : 'Klik untuk upload file'}
                        </label>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button type="submit" className={styles.btn} disabled={isLoading}>
                        {isLoading ? <span className={styles.loader}></span> : 'Terbitkan Sertifikat'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPanel;
