require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    // Menambahkan konfigurasi untuk jaringan Amoy Testnet
    amoy: {
      url: process.env.MUMBAI_RPC_URL || "", // Kita tetap pakai variabel lama agar tidak perlu ganti di .env
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};