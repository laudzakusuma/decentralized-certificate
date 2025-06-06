'use client';
import styles from './WalletStatus.module.css';
import { useWeb3 } from '@/context/Web3Provider';

const WalletStatus = () => {
    const { account, connectWallet } = useWeb3();

    const formatAddress = (addr) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

    return (
        <div className={styles.walletStatus} onClick={!account ? connectWallet : null}>
            {account ? (
                <span className={styles.walletConnected}>
                    Terhubung: {formatAddress(account)}
                </span>
            ) : (
                <span className={styles.walletDisconnected}>
                    Wallet Tidak Terhubung
                </span>
            )}
        </div>
    );
};

export default WalletStatus;
