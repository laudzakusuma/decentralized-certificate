const { ethers } = require("hardhat");

async function main() {
  // 1. Mendapatkan alamat wallet yang akan melakukan deployment.
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 2. Mengompilasi dan mendapatkan "Contract Factory" untuk 'Certificate'.
  const Certificate = await ethers.getContractFactory("Certificate");

  // 3. Memulai proses deployment, memberikan alamat deployer sebagai 'initialOwner'.
  console.log("Deploying Certificate contract...");
  const certificateContract = await Certificate.deploy(deployer.address);

  // 4. Menunggu sampai deployment benar-benar selesai di blockchain.
  await certificateContract.waitForDeployment();

  // 5. Menampilkan alamat kontrak yang sudah ter-deploy.
  const contractAddress = await certificateContract.getAddress();
  console.log("Certificate contract deployed to:", contractAddress);
}

// Pola standar untuk menjalankan fungsi main dan menangani error.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
