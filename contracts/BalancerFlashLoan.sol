// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IVault {
    function flashLoan(
        IFlashLoanRecipient recipient,
        IERC20[] memory tokens,
        uint256[] memory amounts,
        bytes memory userData
    ) external;
}

interface IFlashLoanRecipient {
    function receiveFlashLoan(
        IERC20[] memory tokens,
        uint256[] memory amounts,
        uint256[] memory feeAmounts,
        bytes memory userData
    ) external;
}

// Balancer V2 Vault on Polygon: 0xBA12222222228d8Ba445958a75a0704d566BF2C8
// USDC on Polygon: 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174

contract BalancerFlashLoan is IFlashLoanRecipient {
    IVault private constant vault = IVault(0xBA12222222228d8Ba445958a75a0704d566BF2C8);
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev Request flash loan from Balancer
     * @param tokens Array of token addresses to borrow
     * @param amounts Array of amounts to borrow
     * For $10 USDC: tokens = [0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174], amounts = [10000000]
     */
    function makeFlashLoan(
        IERC20[] memory tokens,
        uint256[] memory amounts
    ) external {
        bytes memory userData = "";
        vault.flashLoan(this, tokens, amounts, userData);
    }

    /**
     * @dev This function is called by Balancer Vault after flash loan is sent
     * feeAmounts will be [0, 0, ...] since Balancer charges 0 fees
     */
    function receiveFlashLoan(
        IERC20[] memory tokens,
        uint256[] memory amounts,
        uint256[] memory feeAmounts,
        bytes memory userData
    ) external override {
        require(msg.sender == address(vault), "Only vault can call");

        // Your arbitrage logic goes here
        // For now, we just have the tokens and will return them

        // Return the flash loan (no fees on Balancer!)
        for (uint256 i = 0; i < tokens.length; i++) {
            uint256 amountOwing = amounts[i] + feeAmounts[i]; // feeAmounts[i] = 0
            tokens[i].transfer(address(vault), amountOwing);
        }
    }

    /**
     * @dev Get contract balance of any token
     */
    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    /**
     * @dev Withdraw tokens from contract
     */
    function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    receive() external payable {}
}