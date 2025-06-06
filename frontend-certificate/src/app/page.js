import styles from './page.module.css'
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Verifikasi Keaslian Sertifikat <br /> di Ujung Jari Anda
        </h1>
        <p className={styles.subtitle}>
          Platform terdesentralisasi untuk menerbitkan dan memverifikasi sertifikat digital secara aman dan transparan.
        </p>
      </main>
    </div>
  );
}