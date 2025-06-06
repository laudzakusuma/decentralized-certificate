// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title Certificate
 * @dev Kontrak untuk menerbitkan sertifikat digital sebagai Soulbound Token (SBT).
 * Soulbound berarti NFT ini tidak dapat dipindahtangankan setelah diterbitkan.
 * Hanya pemilik kontrak (institusi) yang dapat menerbitkan (mint) sertifikat baru.
 */
contract Certificate is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    /**
     * @dev Constructor untuk menginisialisasi kontrak.
     * @param initialOwner Alamat wallet yang akan menjadi pemilik kontrak (institusi).
     */
    constructor(address initialOwner)
        ERC721("Decentralized Certificate", "DCRT")
        Ownable(initialOwner)
    {}

    /**
     * @dev Fungsi untuk menerbitkan sertifikat baru.
     * Hanya bisa dipanggil oleh pemilik kontrak (institusi).
     * @param recipient Alamat wallet penerima sertifikat (mahasiswa).
     * @param _tokenURI Link ke metadata JSON yang disimpan di IPFS.
     * * PERBAIKAN: Mengganti nama parameter 'tokenURI' menjadi '_tokenURI' untuk menghindari shadowing.
     */
    function safeMint(address recipient, string memory _tokenURI)
        public
        onlyOwner
    {
        uint256 tokenId = _nextTokenId++;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    /**
     * @dev Override fungsi _update untuk mencegah transfer token.
     * Ini adalah inti dari mekanisme "Soulbound Token".
     * Fungsi ini akan gagal (revert) jika 'from' bukan alamat nol,
     * yang berarti token hanya bisa ditransfer saat proses minting (dari 0x0 ke penerima).
     * Setiap upaya transfer setelahnya akan dibatalkan.
     */
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721)
        returns (address)
    {
        address from = _ownerOf(tokenId);
        require(from == address(0), "Certificate: This is a Soulbound token and cannot be transferred.");
        return super._update(to, tokenId, auth);
    }

    // Fungsi berikut di-override dari ERC721URIStorage.
    // Kita perlu melakukannya karena Solidity membutuhkan kejelasan ketika ada
    // beberapa kontrak induk yang memiliki fungsi dengan nama yang sama.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
