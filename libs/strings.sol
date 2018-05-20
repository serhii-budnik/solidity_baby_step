pragma solidity ^0.4.0;

library Strings {
    function concat(string firstPart, string lastPart) internal pure returns (string) {
        bytes memory bytesFirstPart = bytes(firstPart);
        bytes memory bytesLastPart = bytes(lastPart);

        string memory totalStringLength = new string(bytesFirstPart.length + bytesLastPart.length);
        bytes memory newValue = bytes(totalStringLength);

        uint i;
        uint j;

        for(i = 0; i < bytesFirstPart.length; i++) {
            newValue[j++] = bytesFirstPart[i];
        }

        for(i = 0; i < bytesLastPart.length; i++) {
            newValue[j++] = bytesLastPart[i];
        }

        return string(newValue);
    }
}

contract TestStrings {
    using Strings for string;

    function out(string newString) public pure returns(string)  {
        return newString.concat("_suffix");
    }
}