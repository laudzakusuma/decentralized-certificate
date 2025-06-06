const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Certificate Contract", function () {
  let Certificate, certificate, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const CertificateFactory = await ethers.getContractFactory("Certificate");
    certificate = await CertificateFactory.deploy(owner.address);
    await certificate.waitForDeployment();
  });

  it("Should deploy successfully and set the right owner", async function () {
    expect(await certificate.owner()).to.equal(owner.address);
  });

  it("Should allow the owner to mint a new certificate", async function () {
    const recipient = addr1.address;
    const ipfsURI = "ipfs://some-random-hash-1";

    await expect(certificate.connect(owner).safeMint(recipient, ipfsURI))
      .to.emit(certificate, "Transfer")
      .withArgs(ethers.ZeroAddress, recipient, 0);

    expect(await certificate.ownerOf(0)).to.equal(recipient);
    expect(await certificate.tokenURI(0)).to.equal(ipfsURI);
  });

  it("Should NOT allow non-owners to mint a certificate", async function () {
    const recipient = addr2.address;
    const ipfsURI = "ipfs://some-random-hash-2";

    // PERBAIKAN: Menggunakan `revertedWithCustomError` untuk mencocokkan
    // error dari OpenZeppelin versi 5.0 ke atas.
    await expect(
      certificate.connect(addr1).safeMint(recipient, ipfsURI)
    ).to.be.revertedWithCustomError(certificate, "OwnableUnauthorizedAccount")
      .withArgs(addr1.address);
  });

  it("Should NOT allow token transfer", async function () {
    const recipient = addr1.address;
    const destination = addr2.address;
    const ipfsURI = "ipfs://some-random-hash-3";

    // 1. Mint dulu tokennya oleh owner ke addr1.
    await certificate.connect(owner).safeMint(recipient, ipfsURI);

    // 2. Coba transfer token dari addr1 ke addr2.
    await expect(
      certificate.connect(addr1).transferFrom(recipient, destination, 0)
    ).to.be.revertedWith("Certificate: This is a Soulbound token and cannot be transferred.");
  });
});
