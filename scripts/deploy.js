// Require the Hardhat Runtime Environment explicitly. Optional
// but useful for running the script through `node <script>`.
const hre = require('hardhat');

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const balance = await owner.getBalance();

  console.log('Deploying contracts with account: ', owner.address);
  console.log('Account balance: ', balance.toString());

  const AMAFactory = await hre.ethers.getContractFactory('AMA');
  const AMA = await AMAFactory.deploy();
  await AMA.deployed();

  console.log('Contract deployed to:', AMA.address);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
