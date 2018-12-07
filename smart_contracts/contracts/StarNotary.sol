pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 { 

    struct Star { 
        string name;
        string starStory;
        string ra;
        string dec;
        string mag; 
    }

    mapping(uint256 => Star) _tokenIdToStarInfo; 
    mapping(uint256 => uint256) _starsForSale;
    mapping(string => bool) coordinateUsed;


    function append(string _a, string _b, string _c) pure internal returns (string) {

    return string(abi.encodePacked(_a, _b, _c));

    }

    function createStar(string _name, string _starStory, string _ra, string _dec, string _mag, uint256 _tokenId) public { 
        string memory coordinate = append(_ra, _dec, _mag);
        
        require(!coordinateUsed[coordinate]);
        
        Star memory newStar = Star(_name, _starStory, _ra, _dec, _mag);

        _tokenIdToStarInfo[_tokenId] = newStar;

        coordinateUsed[coordinate] = true;

        _mint(msg.sender, _tokenId);

    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);

        _starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(_starsForSale[_tokenId] > 0);
        
        uint256 starCost = _starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }

        _starsForSale[_tokenId] = 0;
    }

    function checkIfStarExist (string _ra, string _dec, string _mag) view public returns (bool) {
        string memory coordinate = append(_ra, _dec, _mag);
        return coordinateUsed[coordinate];
    }

    function tokenIdToStarInfo (uint256 _tokenId) view public returns (string, string, string, string, string){
        return (_tokenIdToStarInfo[_tokenId].name, _tokenIdToStarInfo[_tokenId].starStory, _tokenIdToStarInfo[_tokenId].ra, _tokenIdToStarInfo[_tokenId].dec, _tokenIdToStarInfo[_tokenId].mag);
    }


    function starsForSale (uint256 _tokenId) view public returns(bool){
        if (_starsForSale[_tokenId] > 0) {
            return true;
        } else {
            return false;
        }
    }
}