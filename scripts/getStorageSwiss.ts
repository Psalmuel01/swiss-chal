import { ethers, network } from "hardhat";
import {
  encryptDataField,
  decryptNodeResponse,
} from "@swisstronik/swisstronik.js";

//@ts-ignore
const sendShieldedQuery = async (provider, destination, data) => {
  const rpclink = network.config.url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(
    rpclink,
    data
  );
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

//@ts-ignore
const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = network.config.url;
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x6e73e8D0625D563E0c43a41d65FA8B79AE284d36";
  const [signer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory("Storage");
  const contract = contractFactory.attach(contractAddress);

  // setData

  const setData = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData("setData", ["Tech Fiesta"]),
    0
  );
  await setData.wait();

  // getData

  const functionName = "getData";
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName)
  );
  console.log(
    "Data:",
    contract.interface.decodeFunctionResult(functionName, responseMessage)[0]
  );

  // getStorageAt

  const storageSlot = await ethers.provider.getStorage(contractAddress, 0);
  console.log(`Storage slot data is ${storageSlot}`);
  // 0x2e31e39ef461657b6756a8d67e7bae88a3ab3bab4cfc1a2a8f59a8db6de945f9
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
