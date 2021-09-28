// Require the Hardhat Runtime Environment explicitly. Optional
// but useful for running the script through `node <script>`.
const hre = require('hardhat');

async function main() {
  const [owner, ...accounts] = await hre.ethers.getSigners();
  const AMAFactory = await hre.ethers.getContractFactory('AMA');
  const AMA = await AMAFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await AMA.deployed();

  console.log('Contract deployed to:', AMA.address);
  console.log('Constract deployed by:', owner.address);

  const balance = await hre.ethers.provider.getBalance(AMA.address);
  console.log('Contract balance:', hre.ethers.utils.formatEther(balance));

  const txn = await AMA.ask('How are you doing?');
  await txn.wait();

  const secondTxn = await AMA.connect(accounts[0]).ask('What is your name?');
  await secondTxn.wait();

  const [question] = await AMA.getQuestions();
  console.log(question);

  const thirdTxn = await AMA.answer(
    question.creator,
    question.timestamp,
    'Doing ok',
  );
  await thirdTxn.wait();

  const answer = await AMA.getAnswer(question.creator, question.timestamp);
  console.log(answer);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
