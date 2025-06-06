'use client';
import styles from './Header.module.css';
import { useWeb3 } from '@/context/Web3Provider';

const Header = ({ activeSection, setActiveSection }) => {
    const { isAdmin } = useWeb3();

    const handleNavClick = (e, section) => {
        // Ripple effect logic
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = styles.ripple;
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);

        setActiveSection(section);
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>CERTHREEFICATE</h1>
            <p className={styles.tagline}>Sistem Verifikasi Sertifikat Terdesentralisasi Yang Aman & Terpercaya</p>
            <nav className={styles.nav}>
                <button className={`${styles.navButton} ${activeSection === 'home' ? styles.active : ''}`} onClick={(e) => handleNavClick(e, 'home')}>Beranda</button>
                {isAdmin && <button className={`${styles.navButton} ${activeSection === 'admin' ? styles.active : ''}`} onClick={(e) => handleNavClick(e, 'admin')}>Admin Portal</button>}
                <button className={`${styles.navButton} ${activeSection === 'verify' ? styles.active : ''}`} onClick={(e) => handleNavClick(e, 'verify')}>Verifikasi</button>
                <button className={`${styles.navButton} ${activeSection === 'about' ? styles.active : ''}`} onClick={(e) => handleNavClick(e, 'about')}>Tentang</button>
            </nav>
        </header>
    );
};

export default Header;
