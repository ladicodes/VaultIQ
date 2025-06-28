// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  const VaultNFT = await hre.ethers.getContractFactory("VaultNFT");
  const vaultNFT = await VaultNFT.deploy();

  await vaultNFT.deployed();

  console.log("VaultNFT deployed to:", vaultNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
