
pragma solidity >=0.4.22 < 0.6.0;

contract Test {

    string public contractOwner;
    address public addressOwner;

    constructor(string memory _contractOwner) public {
        contractOwner = _contractOwner;
        addressOwner  = msg.sender;
    }

    function getEthers() public pure returns(int256) {
        return 15;
    }

    function sendEther(address payable _to) public payable {
        _to.transfer(msg.value);
    }


    function(){

    }
}
