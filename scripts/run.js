// Require the Hardhat Runtime Environment explicitly. Optional
// but useful for running the script through `node <script>`.
const hre = require("hardhat");

async function main() {
  const [owner, ...accounts] = await hre.ethers.getSigners();
  const AMAFactory = await hre.ethers.getContractFactory("AMA");
  const AMA = await AMAFactory.deploy();
  await AMA.deployed();

  console.log("Contract deployed to:", AMA.address);
  console.log("Constract deployed by:", owner.address);

  await AMA.getTotalQuestions();

  const txn = await AMA.ask();
  await txn.wait();

  await AMA.getTotalQuestions();

  const anotherTxn = await AMA.connect(accounts[0]).ask();
  await anotherTxn.wait();

  await AMA.getTotalQuestions();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
