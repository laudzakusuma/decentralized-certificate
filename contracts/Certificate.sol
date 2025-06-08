// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title Certificate
 * @dev Kontrak yang di-upgrade dengan kemampuan batch minting.
 */
contract Certificate is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("Decentralized Certificate", "DCRT")
        Ownable(initialOwner)
    {}

    /**
     * @dev Fungsi untuk menerbitkan satu sertifikat.
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
     * @dev FUNGSI BARU: Menerbitkan banyak sertifikat sekaligus.
     * @param recipients Array alamat wallet para penerima.
     * @param _tokenURIs Array link metadata IPFS untuk setiap sertifikat.
     * Pastikan panjang array recipients dan _tokenURIs sama.
     */
    function batchMint(address[] calldata recipients, string[] calldata _tokenURIs)
        public
        onlyOwner
    {
        require(recipients.length == _tokenURIs.length, "Certificate: Array lengths do not match.");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 tokenId = _nextTokenId++;
            _safeMint(recipients[i], tokenId);
            _setTokenURI(tokenId, _tokenURIs[i]);
        }
    }

    /**
     * @dev Override fungsi _update untuk mencegah transfer token (Soulbound).
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
