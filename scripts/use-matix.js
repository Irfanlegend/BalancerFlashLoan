// scripts/use-matix.js
const { ethers } = require("hardhat");

async function main() {
  try {
    const contractAddress = "0x97E4d79f149c34dDd1D217e579A0969a9BeF4c3E"; // your deployed flashloan contract
    const FlashLoan = await ethers.getContractFactory("BalancerFlashLoan");
    const flashLoan = FlashLoan.attach(contractAddress);

    // MATIX token on Polygon
    const MATIX = "0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6"; // token address (18 decimals)

    // Original and subtract amounts (human-readable token units)
    const originalHuman = "10801242"; // 10,801,242
    const subtractHuman = "1000";     // subtract 1,000

    // Convert to smallest units (18 decimals) and compute adjusted amount
    const original = ethers.utils.parseUnits(originalHuman, 18);
    const subtract = ethers.utils.parseUnits(subtractHuman, 18);
    const adjusted = original.sub(subtract); // 10,800,242 tokens (in wei)

    console.log("Original (human):", originalHuman);
    console.log("Subtract (human):", subtractHuman);
    console.log("Adjusted (human):", ethers.utils.formatUnits(adjusted, 18));

    console.log("Requesting flash loan for MATIX...");

    const tx = await flashLoan.makeFlashLoan([MATIX], [adjusted]);
    const receipt = await tx.wait();

    console.log("✅ Flash loan executed successfully!");
    console.log("Tx hash:", tx.hash);
    console.log("Block number:", receipt.blockNumber);

    // Optional: show contract balance of MATIX after tx
    try {
      const bal = await flashLoan.getBalance(MATIX);
      console.log("Contract MATIX balance (raw):", bal.toString());
      console.log("Contract MATIX balance (human):", ethers.utils.formatUnits(bal, 18));
    } catch (e) {
      console.log("Could not read contract token balance (maybe token doesn't implement standard or call failed):", e.message);
    }
  } catch (err) {
    console.error("❌ Error executing flash loan:", err);
  }
}

main();
