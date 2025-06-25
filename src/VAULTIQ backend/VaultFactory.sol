contract VaultFactory {
    address public verifierContract;

    function createVault(address assetOwner, bytes calldata verificationProof) external {
        require(AIVerifier(verifierContract).verifyProof(verificationProof), "Verification failed");

        Vault newVault = new Vault(assetOwner);
        emit VaultCreated(address(newVault));
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VaultNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    mapping(address => bool) public allowedMinters;
    
    // 🔐 Mocked PoR flag
    bool public isReserveVerified = false;

    constructor() ERC721("VaultNFT", "VLT") {
        tokenCounter = 0;
    }

    // 🔐 Set mock PoR status (can only be changed by owner)
    function setReserveStatus(bool status) public onlyOwner {
        isReserveVerified = status;
    }

    function addMinter(address minter) public onlyOwner {
        allowedMinters[minter] = true;
    }

    function mintVault(address to, string memory tokenURI) public {
        require(allowedMinters[msg.sender], "Not authorized to mint");

        // ✅ PoR Check
        require(isReserveVerified, "PoR: Reserve not verified");

        uint256 newTokenId = tokenCounter;
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter++;
    }
}


// Events
event VerificationRequested(uint256 tokenId, string fileUrl);
event VerificationFulfilled(uint256 tokenId, string status, uint256 score);

// Struct to hold verification data
struct Verification {
    string status;
    uint256 score;
}

mapping(uint256 => Verification) public verifications;

// Step 1: Simulate Chainlink Function request
function requestVerification(uint256 tokenId, string memory fileUrl) external onlyOwner {
    require(_exists(tokenId), "Token does not exist");
    emit VerificationRequested(tokenId, fileUrl);
}

// Step 2: Mock fulfill function to simulate Chainlink callback
function fulfillVerification(uint256 tokenId, string memory status, uint256 score) external onlyOwner {
    require(_exists(tokenId), "Token does not exist");
    verifications[tokenId] = Verification(status, score);
    emit VerificationFulfilled(tokenId, status, score);
}

// Mock Proof of Reserve check
mapping(uint256 => bool) public proofOfReserveStatus;

event ProofOfReserveChecked(uint256 indexed tokenId, bool passed);

function checkProofOfReserve(uint256 tokenId, bool simulatedResult) external {
    proofOfReserveStatus[tokenId] = simulatedResult;
    emit ProofOfReserveChecked(tokenId, simulatedResult);
}

// Simulate CCIP message
event CCIPMessageReceived(address indexed from, string message);

function simulateCCIPReceive(address from, string calldata message) external {
    emit CCIPMessageReceived(from, message);
}
