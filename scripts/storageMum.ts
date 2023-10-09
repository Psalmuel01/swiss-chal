import { ethers } from "hardhat";

async function main() {
  const initialData = "Mumbai";
  const storage = await ethers.deployContract("Storage", [initialData]);
  storage.waitForDeployment();

  console.log(
    `Storage with default data ${initialData} deployed to ${storage.target}`
  );
  // 0x7cBc92c9eB3848AD97ae8357D6A95DB0fc89925A

  //   await storage.setData("Tech Fiesta");
  //   console.log(`Storage data is now ${await storage.getData()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
