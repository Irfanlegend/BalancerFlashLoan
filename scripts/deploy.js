async function main() {
    const BalancerFlashLoan = await ethers.getContractFactory("BalancerFlashLoan");
    const flashLoan = await BalancerFlashLoan.deploy();
    await flashLoan.waitForDeployment();
    
    console.log("BalancerFlashLoan deployed to:", await flashLoan.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });