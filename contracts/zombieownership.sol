pragma solidity ^0.4.25;

import "./zombieattack.sol";
import "./erc721.sol";
import "./safemath.sol";

contract ZombieOwnership is ZombieAttack, ERC721 {

  using SafeMath for uint256;

  mapping (uint => address) zombieApprovals;
  mapping (uint => uint) public zombieSalePrice;
  mapping (uint => bool) public isZombieForSale;
  mapping(uint => ZombieSale) public zombiesForSale;

  struct ZombieSale {
    uint price;    
    address seller;
  }

  uint[] public zombieSaleList;

  event SaleListed(address indexed owner, uint indexed tokenId, uint price);
  event SaleCompleted(address indexed buyer, address indexed seller, uint indexed tokenId, uint price);
  event SaleCancelled(address indexed owner, uint indexed tokenId);
  event ZombieSaleCancelled(uint indexed zombieId, address indexed seller);
  event DebugLog(string message);

  function balanceOf(address _owner) external view returns (uint256) {
    return ownerZombieCount[_owner];
  }

  function ownerOf(uint256 _tokenId) external view returns (address) {
    return zombieToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerZombieCount[_to] = ownerZombieCount[_to].add(1);
    ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].sub(1);
    zombieToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
      require (zombieToOwner[_tokenId] == msg.sender || zombieApprovals[_tokenId] == msg.sender);
      _transfer(_from, _to, _tokenId);
  }

  function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
      zombieApprovals[_tokenId] = _approved;
      emit Approval(msg.sender, _approved, _tokenId);
  }


  function listZombieForSale(uint _zombieId, uint _price) external {
    require(_price > 0, "Price must be greater than zero.");
    require(msg.sender == zombieToOwner[_zombieId], "Only the owner can list the zombie for sale.");

    // Mark the zombie as for sale
    isZombieForSale[_zombieId] = true;
    zombiesForSale[_zombieId] = ZombieSale({ price: _price, seller: msg.sender });

    zombieSaleList.push(_zombieId); 
    emit SaleListed(msg.sender,_zombieId, _price);
}

  function getZombiesOnSale() external view returns (uint[] memory) {
    return zombieSaleList;
  }

  event DebugTransfer(address indexed from, address indexed to, uint256 amount, bool success);
  event ZombieSold(uint indexed zombieId, uint price, address indexed buyer);


  function buyZombie(uint _zombieId) external payable {
    ZombieSale memory sale = zombiesForSale[_zombieId];
      
    address seller = sale.seller;
    address buyer = msg.sender;

    ownerZombieCount[buyer] = ownerZombieCount[buyer].add(1);
    ownerZombieCount[seller] = ownerZombieCount[seller].sub(1);
    zombieToOwner[_zombieId] = buyer;
    emit Transfer(seller, buyer, _zombieId);

    (bool sent, ) = seller.call.value(msg.value)("");
    emit DebugTransfer(buyer, seller, msg.value, sent);
    require(sent, "Failed to send Ether to the seller.");

    delete zombiesForSale[_zombieId];
      
    _removeZombieFromSaleList(_zombieId);
      
    emit ZombieSold(_zombieId, sale.price, buyer);
  }


  function cancelSale(uint _tokenId) external onlyOwnerOf(_tokenId) {
    require(isZombieForSale[_tokenId], "Zombie not for sale");
    isZombieForSale[_tokenId] = false;
    zombieSalePrice[_tokenId] = 0;

    emit SaleCancelled(msg.sender, _tokenId);
  }

  function cancelZombieSale(uint _zombieId) external {
      delete zombiesForSale[_zombieId];
      _removeZombieFromSaleList(_zombieId);
      
  }

  function _removeZombieFromSaleList(uint _zombieId) internal {
      for (uint i = 0; i < zombieSaleList.length; i++) {
          if (zombieSaleList[i] == _zombieId) {
              zombieSaleList[i] = zombieSaleList[zombieSaleList.length - 1];
              zombieSaleList.length--;
              break;
          }
      }
  }

 


}
