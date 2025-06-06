require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// --- BAGIAN DEBUGGING ---
console.log("--- Membaca file .env ---");
console.log("RPC URL:", process.env.MUMBAI_RPC_URL ? "Ditemukan" : "TIDAK DITEMUKAN");
console.log("PRIVATE KEY:", process.env.PRIVATE_KEY ? "Ditemukan" : "TIDAK DITEMUKAN");
console.log("--------------------------");
// --- AKHIR BAGIAN DEBUGGING ---

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    amoy: {
      url: process.env.MUMBAI_RPC_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};