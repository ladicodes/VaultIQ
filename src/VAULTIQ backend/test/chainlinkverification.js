const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VaultNFT - Chainlink Verification Mock", function () {
  let VaultNFT, vault, owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    VaultNFT = await ethers.getContractFactory("VaultNFT");
    vault = await VaultNFT.deploy("VaultIQ", "VLT");
    await vault.deployed();

    // Mint a test token
    const tx = await vault.connect(owner).mintVault(user.address, "ipfs://sample-metadata.json");
    await tx.wait();
  });

  it("should emit VerificationRequested event", async function () {
    await expect(vault.requestVerification(1, "ipfs://file-url"))
      .to.emit(vault, "VerificationRequested")
      .withArgs(1, "ipfs://file-url");
  });

  it("should fulfill and store verification results", async function () {
    await vault.fulfillVerification(1, "verified", 92);

    const result = await vault.verifications(1);
    expect(result.status).to.equal("verified");
    expect(result.score).to.equal(92);
  });

  it("should emit VerificationFulfilled event", async function () {
    await expect(vault.fulfillVerification(1, "verified", 92))
      .to.emit(vault, "VerificationFulfilled")
      .withArgs(1, "verified", 92);
  });
});

it("should simulate PoR and emit event", async () => {
  await expect(vault.checkProofOfReserve(1, true))
    .to.emit(vault, "ProofOfReserveChecked")
    .withArgs(1, true);

  const status = await vault.proofOfReserveStatus(1);
  expect(status).to.equal(true);
});

it("should simulate CCIP message reception", async () => {
  await expect(vault.simulateCCIPReceive(user.address, "Sync Metadata"))
    .to.emit(vault, "CCIPMessageReceived")
    .withArgs(user.address, "Sync Metadata");
});
