require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 137,
    },
  },
};
