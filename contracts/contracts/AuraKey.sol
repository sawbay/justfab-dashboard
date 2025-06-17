// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AuraKey {
    IERC20 public immutable paymentToken;
    uint256 public pricePerKey;
    address public immutable admin;

    event AuraKeyBought(address indexed buyer, uint256 amount);

    constructor(address _paymentToken, uint256 _pricePerKey) {
        require(_paymentToken != address(0), "Invalid token address");
        require(_pricePerKey > 0, "Price must be greater than zero");
        paymentToken = IERC20(_paymentToken);
        pricePerKey = _pricePerKey;
        admin = msg.sender;
    }

    function setPricePerKey(uint256 newPrice) external {
        require(msg.sender == admin, "Only admin can set price");
        require(newPrice > 0, "Price must be greater than zero");
        pricePerKey = newPrice;
    }

    function buyAuraKey(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        uint256 totalCost = pricePerKey * amount;
        require(paymentToken.transferFrom(msg.sender, address(this), totalCost), "Payment failed");
        emit AuraKeyBought(msg.sender, amount);
    }
} 