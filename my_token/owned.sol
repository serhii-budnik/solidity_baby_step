pragma solidity ^0.4.23;

contract Owned {
    address public owner;
    constructor() internal { owner = msg.sender; }

    modifier onlyOwner() {
        require(msg.sender == owner, 'only owner can execute this');
        _;
    }
}