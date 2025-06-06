'use client';
import styles from './Header.module.css';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={styles.logo}>
        CertifiChain
      </div>
      <nav className={styles.nav}>
        <button className={styles.connectButton}>Connect Wallet</button>
      </nav>
    </motion.header>
  );
};

export default Header;