pragma solidity ^0.4.23;


contract HelloEthSalon {
    string public str;
    string public stg = "765";
    uint public intt = 765;
    address public lastMsgSender;

    constructor(string _str) public {
        str = _str;
    }

    function getStr() public view returns(string) {
        return str;
    }

    function setStr(string _str) public {
        str = _str;
    }

    function updateMsgSender() public {
        lastMsgSender = msg.sender;
    }
}
