const hre = require("hardhat");
const { ethers } = hre; // Hardhat ethers (v5)

async function main() {
  try {
    const contractAddress = "0x97E4d79f149c34dDd1D217e579A0969a9BeF4c3E";
    const FlashLoan = await ethers.getContractFactory("BalancerFlashLoan");
    const flashLoan = FlashLoan.attach(contractAddress);

    const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
    const amount = ethers.utils.parseUnits("1000000", 6);

    console.log("🚀 Executing flash loan...");
    const tx = await flashLoan.makeFlashLoan([USDC], [amount]);
    await tx.wait();
    console.log("✅ Flash loan executed! Tx:", tx.hash);
  } catch (err) {
    console.error("❌ Error executing flash loan:", err);
  }
}

main();
