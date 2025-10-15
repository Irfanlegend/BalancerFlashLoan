// scripts/use-aave.js
const { ethers } = require("hardhat");

async function main() {
  try {
    // Flashloan contract address (replace if yours differs)
    const contractAddress = "0x97E4d79f149c34dDd1D217e579A0969a9BeF4c3E"; 
    const FlashLoan = await ethers.getContractFactory("BalancerFlashLoan");
    const flashLoan = FlashLoan.attach(contractAddress);

    // AAVE token on Polygon
    const AAVE = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"; 
    const decimals = 18;

    // Flash loan amount — 440,000 AAVE
    const amountHuman = "440000";
    const amount = ethers.utils.parseUnits(amountHuman, decimals);

    console.log("Requesting flash loan...");
    console.log("Token:", AAVE);
    console.log("Amount (human):", amountHuman);
    console.log("Amount (raw wei):", amount.toString());

    // Execute flash loan
    const tx = await flashLoan.makeFlashLoan([AAVE], [amount]);
    const receipt = await tx.wait();

    console.log("✅ Flash loan executed successfully!");
    console.log("Tx hash:", tx.hash);
    console.log("Block number:", receipt.blockNumber);
  } catch (err) {
    console.error("❌ Error executing flash loan:", err);
  }
}

main();
