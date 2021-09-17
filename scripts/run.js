async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );

  console.log("contractBalance", hre.ethers.utils.formatEther(contractBalance));

  let waveCount = await waveContract.getTotalWaves();
  let waveTxn = await waveContract.wave("message 1");
  await waveTxn.wait();
  waveCount = await waveContract.getTotalWaves();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

  console.log("contractBalance", hre.ethers.utils.formatEther(contractBalance));

  waveTxn = await waveContract.connect(randomPerson).wave("message 2");
  await waveTxn.wait();
  waveCount = await waveContract.connect(randomPerson).getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave("message 3");
  await waveTxn.wait();
  waveCount = await waveContract.connect(randomPerson).getTotalWaves();
  let allWaves = await waveContract.connect(randomPerson).getAllWaves();
  console.log("all waves", allWaves);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
