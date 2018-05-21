pragma solidity ^0.4.20;

contract Selector {
    mapping (uint => string) funders;


    function f() public  {
        funders[1] = "test";
    }

    function g() public view returns(string) {
        return funders[1];
    }

}

contract MappingExample {
    mapping(address => uint) public balances;

    function update(uint newBalance) public {
        balances[msg.sender] = newBalance;
    }
}

contract MappingUser {
    function f() public returns (uint) {
        MappingExample m = new MappingExample();
        m.update(100);
        return m.balances(this);
    }

    struct coinWallet {
    	uint redCoin;
    	uint greenCoin;
    }


    function deleteMaping() public returns(uint) {
        coinWallet myWallet;
        myWallet.redCoin = 500;
        myWallet.greenCoin = 250;

        return myWallet.redCoin;
    }
}