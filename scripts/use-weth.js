// scripts/use-weth.js
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  try {
    const contractAddress = "0x97E4d79f149c34dDd1D217e579A0969a9BeF4c3E"; // your deployed contract
    const FlashLoan = await ethers.getContractFactory("BalancerFlashLoan");
    const flashLoan = FlashLoan.attach(contractAddress);

    // ✅ WETH token on Polygon
    const WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";

    // 💰 10,000 WETH (18 decimals)
    const amount = ethers.utils.parseUnits("250", 18);

    console.log("🚀 Requesting 10,000 WETH flash loan...");

    const tx = await flashLoan.makeFlashLoan([WETH], [amount]);
    const receipt = await tx.wait();

    console.log("✅ Flash loan executed successfully!");
    console.log("Tx hash:", tx.hash);
    console.log("Block number:", receipt.blockNumber);

  } catch (err) {
    console.error("❌ Error executing flash loan:", err);
  }
}

main();
