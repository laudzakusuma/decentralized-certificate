const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Certificate Contract (Upgraded)", function () {
  let certificate, owner, addr1, addr2, addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const CertificateFactory = await ethers.getContractFactory("Certificate");
    certificate = await CertificateFactory.deploy(owner.address);
    await certificate.waitForDeployment();
  });

  it("Should deploy successfully and set the right owner", async function () {
    expect(await certificate.owner()).to.equal(owner.address);
  });

  it("Should allow the owner to mint a single certificate", async function () {
    await expect(certificate.connect(owner).safeMint(addr1.address, "ipfs://single"))
      .to.emit(certificate, "Transfer").withArgs(ethers.ZeroAddress, addr1.address, 0);
    expect(await certificate.ownerOf(0)).to.equal(addr1.address);
  });
  
  it("Should NOT allow token transfer (Soulbound test)", async function () {
    await certificate.connect(owner).safeMint(addr1.address, "ipfs://sbt");
    await expect(
      certificate.connect(addr1).transferFrom(addr1.address, addr2.address, 0)
    ).to.be.revertedWith("Certificate: This is a Soulbound token and cannot be transferred.");
  });

  describe("Batch Minting", function() {
    it("Should allow the owner to batch mint multiple certificates", async function() {
        const recipients = [addr1.address, addr2.address, addr3.address];
        const tokenURIs = ["ipfs://uri1", "ipfs://uri2", "ipfs://uri3"];

        await certificate.connect(owner).batchMint(recipients, tokenURIs);

        // Verifikasi setiap sertifikat yang baru dibuat
        expect(await certificate.ownerOf(0)).to.equal(addr1.address);
        expect(await certificate.tokenURI(0)).to.equal("ipfs://uri1");
        
        expect(await certificate.ownerOf(1)).to.equal(addr2.address);
        expect(await certificate.tokenURI(1)).to.equal("ipfs://uri2");

        expect(await certificate.ownerOf(2)).to.equal(addr3.address);
        expect(await certificate.tokenURI(2)).to.equal("ipfs://uri3");
    });

    it("Should NOT allow non-owners to batch mint", async function() {
        const recipients = [addr1.address];
        const tokenURIs = ["ipfs://fail"];

        await expect(
            certificate.connect(addr1).batchMint(recipients, tokenURIs)
        ).to.be.revertedWithCustomError(certificate, "OwnableUnauthorizedAccount")
        .withArgs(addr1.address);
    });

    it("Should revert if array lengths do not match", async function() {
        const recipients = [addr1.address, addr2.address]; 
        const tokenURIs = ["ipfs://mismatch"]; 

        await expect(
            certificate.connect(owner).batchMint(recipients, tokenURIs)
        ).to.be.revertedWith("Certificate: Array lengths do not match.");
    });
  });
});
