const { targetChains } = require("./constants/index.js");
const { transferOwnershipBridge } = require("./helpers.js");
const hre = require('hardhat');

async function main() {
  const network = hre.network.name;
  const toAddress = '0xaD01073B20e5548991F6459F6f68318addf06b52';
  for (const targetChain of targetChains[network]) {
    await transferOwnershipBridge(targetChain, toAddress);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
