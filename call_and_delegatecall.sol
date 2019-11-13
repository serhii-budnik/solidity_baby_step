pragma solidity >=0.4.22 < 0.6.0;

contract SomeContract {
    string s = 'SomeContract';

    function callMeMaybe() public payable returns(address){
        return msg.sender;
    }
}

contract ThatCallsSomeContract {
    string s = 'ThatCallsSomeContract';

    function callTheOtherContract(address _contractAddress) public payable returns(bool, bytes memory){
        // require(_contractAddress.call(bytes4(keccak256("callMeMaybe()"))));
        return _contractAddress.delegatecall(abi.encodeWithSignature("callMeMaybe()"));
    }


    function decodeBytes(address _contractAddress) public payable returns(address) {
        bytes memory encodedBytes;

        (,encodedBytes) = callTheOtherContract(_contractAddress);

        return abi.decode(encodedBytes, (address));
    }
}

// "call" - uses contract storage of where an invoked function was declareted
// msg.sender is the address of contract from where was called

// "delegatecall" - uses storage of contract where was invoked function delegatecall
// msg.sender is the user who invoke the function
