contract VaultFactory {
    address public verifierContract;

    function createVault(address assetOwner, bytes calldata verificationProof) external {
        require(AIVerifier(verifierContract).verifyProof(verificationProof), "Verification failed");

        Vault newVault = new Vault(assetOwner);
        emit VaultCreated(address(newVault));
    }
}
