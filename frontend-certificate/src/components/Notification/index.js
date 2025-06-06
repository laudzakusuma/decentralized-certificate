'use client';
import styles from './Notification.module.css';
import { useWeb3 } from '@/context/Web3Provider';
import { AnimatePresence, motion } from 'framer-motion';

const Notification = () => {
  const { notification } = useWeb3();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          className={`${styles.notification} ${styles[notification.type]}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {notification.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
