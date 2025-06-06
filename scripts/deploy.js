const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // --- BAGIAN DEBUGGING ---
  console.log("====================================================");
  console.log("DEBUGGING: Alamat yang digunakan Hardhat adalah:", deployer.address);
  console.log("====================================================");
  // --- AKHIR BAGIAN DEBUGGING ---

  console.log("Deploying contracts with the account:", deployer.address);
  const Certificate = await ethers.getContractFactory("Certificate");

  console.log("Deploying Certificate contract...");
  const certificateContract = await Certificate.deploy(deployer.address);

  await certificateContract.waitForDeployment();
  const contractAddress = await certificateContract.getAddress();
  console.log("Certificate contract deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });