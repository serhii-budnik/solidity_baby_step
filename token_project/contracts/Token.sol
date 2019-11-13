pragma solidity >=0.4.21 <0.6.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

contract Token is ERC20, Ownable {
    string public symbol = "MT";
    string public name = "MyToken";
    uint8  public constant decimals = 18;

    constructor () public {
      _mint(address(this), uint256(10) ** decimals * 9);
    }
}
