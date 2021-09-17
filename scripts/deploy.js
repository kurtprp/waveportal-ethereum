async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Contract deployed by:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await hre.ethers.getContractFactory("WavePortal");
  const token = await Token.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await token.deployed();
  console.log("Contract deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
