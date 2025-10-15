This project is a Hardhat-based Solidity project designed to demonstrate and facilitate zero-fee flash loans on the Balancer platform. It has been tested on the Sepolia Ethereum testnet and the Polygon network.
Here's a breakdown of what the project does:
Flash Loan Functionality: The core of the project is the BalancerFlashLoan.sol smart contract, which enables requesting and receiving flash loans from the Balancer V2 Vault.
Zero Fees: A key feature highlighted is that Balancer flash loans incur zero fees.
Arbitrage Ready: The receiveFlashLoan function within the contract is where the borrowed tokens are handled. It currently returns the borrowed tokens but includes a placeholder comment, "Your arbitrage logic goes here," indicating its intended use for decentralized finance (DeFi) arbitrage strategies.
Deployment and Interaction: The project utilizes Hardhat for development, compilation, and deployment. It includes deployment scripts and scripts for interacting with the deployed contract to make flash loans.
Recorded Transactions: There are records of successful flash loan transactions on the Polygon network, demonstrating the contract's working functionality with various amounts of USDC.
In essence, this project provides a framework for developers to interact with Balancer's flash loan service, particularly for implementing strategies like arbitrage, without incurring borrowing fees.
