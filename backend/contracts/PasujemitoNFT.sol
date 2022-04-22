// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import {Base64} from "./libs/Base64.sol";

contract PasujemitoNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string[] firstWords = [
        "Flustrated",
        "Happy",
        "Overwhelmed",
        "Excited",
        "Spontainous",
        "Energetic"
    ];
    string[] secondWords = [
        "Rainbow",
        "Microwave",
        "Bridge",
        "Hamburger",
        "Bicycle",
        "Trousers"
    ];
    string[] thirdWords = [
        "Shelf",
        "Castle",
        "Bed",
        "Road",
        "YourMum",
        "Pills"
    ];

    constructor() ERC721("SquareNFT", "SQUARE") {
        console.log("My first NFT contract!");
    }

    function getFirstWordFromArray(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId)))
        );

        rand = rand % firstWords.length;
        return firstWords[rand];
    }

    function getSecondWordFromArray(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId)))
        );

        rand = rand % secondWords.length;
        return secondWords[rand];
    }

    function getThirdWordFromArray(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId)))
        );

        rand = rand % thirdWords.length;
        return thirdWords[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function createNFT() public {
        uint256 newItemId = _tokenIds.current();

        string memory first = getFirstWordFromArray(newItemId);
        string memory second = getSecondWordFromArray(newItemId);
        string memory third = getThirdWordFromArray(newItemId);
        string memory nftTitle = string(abi.encodePacked(first, second, third));

        string memory finalSvg = string(
            abi.encodePacked(baseSvg, first, second, third, "</text></svg>")
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        nftTitle,
                        '", "description":"A well worded collection of square NFTs!',
                        '", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalTokenUri);
        _tokenIds.increment();

        console.log(
            "An NFT w/ ID %s has been minted to: %s",
            newItemId,
            msg.sender
        );
    }
}
