// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ATCToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("A Test Coin", "ATC") {
        _mint(msg.sender, initialSupply);
    }
}
