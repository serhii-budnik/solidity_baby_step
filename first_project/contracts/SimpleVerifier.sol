pragma solidity ^0.4.23;

contract SimpleVerifier {
    modifier onlyPositive(uint256 _number) {
        require(_number >= 0);
        _;
    }

    modifier isBlank(string _str) {
        require(bytes(_str).length != 0, "cant be blank");
        _;        
    }
}