import styles from './HomeSection.module.css';

const FeatureCard = ({ icon, title, children, color }) => (
    <div className={styles.featureCard}>
        <h3 style={{ color }}>{icon} {title}</h3>
        <p>{children}</p>
    </div>
);

const HomeSection = () => {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Selamat Datang di CertifiChain</h2>
            <p className={styles.description}>
                Platform revolusioner yang menggunakan teknologi blockchain untuk memastikan keaslian dan keamanan sertifikat digital Anda. 
                Tidak ada lagi keraguan tentang validitas dokumen pendidikan.
            </p>
            
            <div className={styles.featuresGrid}>
                <FeatureCard title="Keamanan Blockchain" color="var(--primary-start)">
                    Sertifikat disimpan dalam blockchain yang tidak dapat diubah dan dimanipulasi.
                </FeatureCard>
                <FeatureCard title="Verifikasi Instan" color="var(--primary-end)">
                    Verifikasi keaslian sertifikat dalam hitungan detik dengan teknologi smart contract.
                </FeatureCard>
                <FeatureCard title="Akses Global" color="var(--primary-start)">
                    Dapat diakses dari mana saja di dunia tanpa batas geografis.
                </FeatureCard>
            </div>
        </div>
    );
};

export default HomeSection;