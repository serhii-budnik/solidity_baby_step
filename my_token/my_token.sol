pragma solidity ^0.4.23;

import './erc20interface.sol';
import './owned.sol';

contract MyToken is Owned, ERC20Interface{
    string public symbol = "MT";
    string public name = "MyToken";
    uint8  public constant decimals = 18;

    uint256 public totalSupply;

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    modifier exceptMyself(address _to) {
        require(msg.sender != _to, 'you cannot use this function for yourself');
        _;
    }

    modifier preventTransferToNull(address _to) {
        require(_to != 0x0, 'address is require');
        _;
    }

    modifier shouldBePositive(uint256 _amount) {
        require(_amount > 0, 'you must provide greater than 0 tokens');
        _;
    }

    constructor(uint256 _totalSupply) public payable {
        owner = msg.sender;
        totalSupply = _totalSupply;

        balanceOf[msg.sender] = totalSupply;
    }

    function() public payable {
        revert();
    }

    function transfer(address _to, uint256 _amount)
        public
        onlyOwner
        returns (bool result)
    {
        result = _transferFrom(owner, _to, _amount); // FIXME:
        if (result)
            emit Transfer(owner, _to, _amount);
    }

    function transferFrom(address _from, address _to, uint256 _amount)
        public
        returns(bool)
    {
        return _transferFrom(_from, _to, _amount);
    }

    function approve(address _spender, uint256 _amount)
        public
        exceptMyself(_spender)
        returns (bool)
    {
        // We need to take into account the allowance yet ... i guess
        if (hasEnoughToTransfer(msg.sender, _amount)) {
            allowance[msg.sender][_spender] += _amount;
            emit Approval(msg.sender, _spender, _amount);
            return true;
        }
        return false;
    }

    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function destroyContract() public onlyOwner {
        selfdestruct(this);
    }

    function _transferFrom(address _from, address _to, uint256 _amount)
        private
        preventTransferToNull(_to)
        shouldBePositive(_amount)
        returns (bool)
    {
        if (!hasEnoughToTransfer(_from, _amount) ||
            !hasEnoughAllowance(_from, _to, _amount))
            return false;

        allowance[_from][_to] -= _amount;
        balanceOf[_to] += _amount;
        balanceOf[_from] -= _amount;

        emit Transfer(_from ,_to, _amount);
        return true;
    }

    function hasEnoughAllowance(address _from, address _owner, uint256 _amount)
        private
        view
        returns(bool)
    {
        return allowance[_from][_owner] >= _amount;
    }

    function hasEnoughToTransfer(address _owner, uint256 _amount)
        private
        view
        returns(bool)
    {
        return balanceOf[_owner] >= _amount;
    }

    function isContract(address _address) private view returns(bool) {
        uint256 length;

        assembly {
            length := extcodesize(_address)
        }

        return (length > 0);
    }
}


