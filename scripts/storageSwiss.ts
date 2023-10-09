import { ethers } from "hardhat";

async function main() {
  const initialData = "Swisstronik";
  const storage = await ethers.deployContract("Storage", [initialData]);
  storage.waitForDeployment();

  console.log(`Storage with default data ${initialData} deployed to ${storage.target}`);
  // 0x6e73e8D0625D563E0c43a41d65FA8B79AE284d36

  // await storage.setData("Tech Fiesta");
  // console.log(`Storage data is now ${await storage.getData()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
