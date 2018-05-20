pragma solidity ^0.4.23;

contract ERC20Interface {
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // [Triggered whenever approve(address _spender, uint256 _value) is called.]
    event Approval(
      address indexed _owner,
      address indexed _spender,
      uint256 _value
    );
}