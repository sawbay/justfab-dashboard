import { FUTUREPASS_REGISTRAR_PRECOMPILE_ABI } from "@therootnetwork/evm";
import { filterTransactionEvents } from "../utils/filterTransactionEvents";
import { getFuturepassRegistrarContract } from "../utils/getFuturepassRegistrarContract";
import { withEthersProvider } from "../utils/withEthersProvider";
import { Contract, ContractReceipt, Wallet } from "ethers";

import Counter from "../artifacts/contracts/Counter.sol/Counter.json";

const getCounterContract = () => {
  return new Contract("0x9Fd9B1602cD43f1Ddee684CEb5106c491FB6E2fA", Counter.abi);
};

withEthersProvider("porcini", async (provider, wallet, logger) => {
  const owner = Wallet.createRandom();
  const counter = getCounterContract().connect(wallet);

  logger.info(
    {
      parameters: {
        contractAddress: counter.address,
        owner: owner.address,
      },
    },
    `create "counter.create" call`
  );

  logger.info(`dispatch transaction from wallet=${wallet.address}`);
  const tx = await counter.increment();

  const receipt = (await tx.wait()) as unknown as ContractReceipt;

  logger.info(
    {
      result: {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
      },
    },
    "receive result"
  );
});
