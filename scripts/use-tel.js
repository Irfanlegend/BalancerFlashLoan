// scripts/use-tel.js
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  try {
    const contractAddress = "0x97E4d79f149c34dDd1D217e579A0969a9BeF4c3E"; // ⚙️ your deployed flash loan contract
    const FlashLoan = await ethers.getContractFactory("BalancerFlashLoan");
    const flashLoan = FlashLoan.attach(contractAddress);

    // 💎 Telcoin (TEL) on Polygon
    const TEL = "0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32";

    // 💰 Amount: 807,637,000 TEL (decimals = 2)
    const amount = ethers.utils.parseUnits("80763700", 2);

    console.log("🚀 Requesting 807,637,000 TEL flash loan...");

    const tx = await flashLoan.makeFlashLoan([TEL], [amount]);
    const receipt = await tx.wait();

    console.log("✅ Flash loan executed successfully!");
    console.log("Tx hash:", tx.hash);
    console.log("Block number:", receipt.blockNumber);

  } catch (err) {
    console.error("❌ Error executing flash loan:", err);
  }
}

main();
