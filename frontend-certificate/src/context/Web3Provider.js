'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { ethers } from 'ethers';

// Impor ABI dari folder backend Hardhat Anda.
// Pastikan path ini benar setelah Anda menyalin folder artifacts.
// Anda perlu menyalin folder `artifacts` dari proyek Hardhat ke root proyek frontend ini.
import CertificateABI from '../artifacts/contracts/Certificate.sol/Certificate.json';

// GANTI DENGAN ALAMAT KONTRAK ANDA SETELAH DEPLOYMENT
const CONTRACT_ADDRESS = "0xALAMAT_KONTRAK_ANDA"; 

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: string }

  // Fungsi untuk menampilkan notifikasi
  const showNotification = useCallback((message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000); // Notifikasi hilang setelah 5 detik
  }, []);

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    setNotification(null);
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error("MetaMask tidak terinstal! Harap install ekstensi MetaMask.");
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await web3Provider.send('eth_requestAccounts', []);
      
      const signer = await web3Provider.getSigner();
      const userAccount = accounts[0];

      setProvider(web3Provider);
      setAccount(userAccount);

      const certificateContract = new ethers.Contract(CONTRACT_ADDRESS, CertificateABI.abi, signer);
      setContract(certificateContract);
      
      const owner = await certificateContract.owner();
      setIsAdmin(owner.toLowerCase() === userAccount.toLowerCase());
      showNotification("Wallet berhasil terhubung!", "success");

    } catch (err) {
      const errorMessage = err.message.includes("rejected") ? "Permintaan dibatalkan." : "Gagal menghubungkan wallet.";
      showNotification(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const value = {
    account,
    provider,
    contract,
    isAdmin,
    isLoading,
    notification,
    connectWallet,
    showNotification,
    setIsLoading
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => useContext(Web3Context);