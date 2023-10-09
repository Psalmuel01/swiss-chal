import { ethers } from "hardhat";

async function main() {
  const address = "0x7cBc92c9eB3848AD97ae8357D6A95DB0fc89925A";

  // setData

  const storage = await ethers.getContractAt("Storage", address);
  const setData = await storage.setData("Tech Fiesta Challenge");
  setData.wait();

  // getData

  const getData = await storage.getData();
  console.log(`Storage data is now ${getData}`);

  // getStorageAt

  const storageSlot = await ethers.provider.getStorage(address, 0);
  console.log(`Storage slot data is ${storageSlot}`);
  // 0x5465636820466965737461204368616c6c656e6765000000000000000000002a
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
