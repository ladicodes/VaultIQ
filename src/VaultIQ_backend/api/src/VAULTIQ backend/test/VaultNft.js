const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VaultNFT Contract", function () {
  let vaultNFT, owner, minter, user;

  beforeEach(async () => {
    const VaultNFT = await ethers.getContractFactory("VaultNFT");
    [owner, minter, user] = await ethers.getSigners();
    vaultNFT = await VaultNFT.deploy();
    await vaultNFT.waitForDeployment();
  });

  it("Should fail to mint if PoR is not verified", async () => {
    await vaultNFT.connect(owner).addMinter(minter.address);

    await expect(
      vaultNFT.connect(minter).mintVault(user.address, "ipfs://sample-token")
    ).to.be.revertedWith("PoR: Reserve not verified");
  });

  it("Should allow minting after PoR is verified", async () => {
    await vaultNFT.connect(owner).addMinter(minter.address);
    await vaultNFT.connect(owner).setReserveStatus(true);

    await expect(
      vaultNFT.connect(minter).mintVault(user.address, "ipfs://sample-token")
    ).to.emit(vaultNFT, "Transfer"); // Standard ERC721 transfer event

    const tokenOwner = await vaultNFT.ownerOf(0);
    expect(tokenOwner).to.equal(user.address);
  });
});
it("Should simulate verification flow", async () => {
  await vaultNFT.connect(owner).addMinter(minter.address);
  await vaultNFT.connect(owner).setReserveStatus(true);

  const tx = await vaultNFT.connect(minter).mintVault(user.address, "ipfs://mock");
  const receipt = await tx.wait();
  const tokenId = receipt.events.find(e => e.event === "VaultMinted").args.tokenId;

  await expect(
    vaultNFT.connect(user).requestVerification(tokenId)
  ).to.emit(vaultNFT, "VerificationRequested");

  await expect(
    vaultNFT.connect(owner).fulfillVerification(tokenId, true)
  ).to.emit(vaultNFT, "VerificationCompleted").withArgs(tokenId, true);

  const verified = await vaultNFT.verified(tokenId);
  expect(verified).to.equal(true);
});


// test/VaultNFT.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VaultNFT Contract", () => {
  let VaultNFT, vaultNFT, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    VaultNFT = await ethers.getContractFactory("VaultNFT");
    vaultNFT = await VaultNFT.deploy("VaultIQ", "VLT");
    await vaultNFT.deployed();
  });

  it("Should mint a new Vault NFT", async () => {
    const tx = await vaultNFT.safeMint(owner.address, "ipfs://testhash");
    await tx.wait();

    expect(await vaultNFT.ownerOf(0)).to.equal(owner.address);
    expect(await vaultNFT.tokenURI(0)).to.equal("ipfs://testhash");
  });

  it("Should allow owner to request and fulfill verification", async () => {
    await vaultNFT.safeMint(owner.address, "ipfs://testhash");
    
    const reqTx = await vaultNFT.requestVerification(0);
    await reqTx.wait();

    const fulfillTx = await vaultNFT.fulfillVerification(0, true);
    await fulfillTx.wait();

    const verified = await vaultNFT.verificationStatus(0);
    expect(verified).to.equal(true);
  });

  it("Should prevent non-owners from calling verification functions", async () => {
    await vaultNFT.safeMint(owner.address, "ipfs://testhash");

    await expect(
      vaultNFT.connect(addr1).requestVerification(0)
    ).to.be.revertedWith("Ownable: caller is not the owner");

    await expect(
      vaultNFT.connect(addr1).fulfillVerification(0, true)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
