pragma solidity ^0.5.0;

contract Loja {

    address[6] public skins;

    event Deposited(address indexed payee, uint256 etherAmount);
    event Withdrawn(address indexed payee, uint256 etherAmount);

    function deposito() public payable {
        emit Deposited(msg.sender, msg.value);
    }

    function recolhimento() public {
        uint256 balance = address(this).balance;
        msg.sender.transfer(balance);
        emit Withdrawn(msg.sender, balance);
    }

    function getBalanco() public view returns (uint256) {
        return address(this).balance;
    }

    function compra(uint id) public payable {
        require(msg.sender.balance >= msg.value);
        require(skins[id] == address(0));
        deposito();
        skins[id] = msg.sender;
    }

    function getSkins() public view returns (address[6] memory) {
        return skins;
    }
}