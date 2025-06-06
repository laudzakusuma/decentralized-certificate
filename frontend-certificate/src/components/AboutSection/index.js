import styles from './AboutSection.module.css';

const TechListItem = ({ children, color }) => (
    <li className={styles.techItem} style={{'--tech-glow': color}}>
        {children}
    </li>
);

const AdvantageCard = ({ title, children, color }) => (
    <div className={styles.advantageCard}>
        <h4 style={{color}}>{title}</h4>
        <p>{children}</p>
    </div>
);

const AboutSection = () => {
    return (
        <div className={styles.card}>
            <h2 className={styles.mainTitle}>Tentang CertifiChain</h2>
            <div className={styles.content}>
                <p className={styles.intro}>
                    CertifiChain adalah solusi inovatif yang menggabungkan teknologi blockchain dengan sistem verifikasi sertifikat. 
                    Kami menggunakan konsep Soulbound Token (SBT) untuk memastikan bahwa setiap sertifikat yang diterbitkan 
                    tidak dapat dipalsukan atau ditransfer.
                </p>

                <h3 className={styles.subTitle}>Teknologi yang Digunakan</h3>
                <ul className={styles.techList}>
                    <TechListItem color="var(--primary-start)">
                        <strong>🔗 Blockchain Polygon:</strong> Untuk keamanan dan efisiensi biaya
                    </TechListItem>
                    <TechListItem color="var(--primary-end)">
                        <strong>📝 Smart Contract ERC-721:</strong> Standard NFT yang dimodifikasi untuk Soulbound Token
                    </TechListItem>
                    <TechListItem color="var(--primary-start)">
                        <strong>🌐 IPFS:</strong> Penyimpanan terdesentralisasi untuk metadata sertifikat
                    </TechListItem>
                    <TechListItem color="var(--primary-end)">
                        <strong>🔐 Kriptografi:</strong> Enkripsi tingkat tinggi untuk keamanan data
                    </TechListItem>
                </ul>

                <h3 className={styles.subTitle}>Keunggulan Sistem</h3>
                <div className={styles.advantagesGrid}>
                    <AdvantageCard title="Tidak Dapat Dipalsukan" color="var(--primary-start)">
                        Setiap sertifikat terikat secara kriptografis dan tersimpan di blockchain
                    </AdvantageCard>
                    <AdvantageCard title="Verifikasi Real-time" color="var(--primary-end)">
                        Proses verifikasi dilakukan secara otomatis dan instan
                    </AdvantageCard>
                    <AdvantageCard title="Biaya Efisien" color="var(--primary-start)">
                        Menggunakan Polygon untuk meminimalkan biaya transaksi
                    </AdvantageCard>
                    <AdvantageCard title="Akses Global" color="var(--primary-end)">
                        Dapat diakses dari mana saja tanpa batasan geografis
                    </AdvantageCard>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;