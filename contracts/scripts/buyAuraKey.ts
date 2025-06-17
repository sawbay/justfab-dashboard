import { FUTUREPASS_REGISTRAR_PRECOMPILE_ABI } from "@therootnetwork/evm";
import { filterTransactionEvents } from "../utils/filterTransactionEvents";
import { getFuturepassRegistrarContract } from "../utils/getFuturepassRegistrarContract";
import { withEthersProvider } from "../utils/withEthersProvider";
import { Contract, ContractReceipt, Wallet } from "ethers";

import AuraKey from "../artifacts/contracts/AuraKey.sol/AuraKey.json";

const getAuraKeyContract = () => {
  return new Contract("0x52d4508cdE88ad55ccAc4aF3E7Fc52A7C268181D", AuraKey.abi);
};

withEthersProvider("porcini", async (provider, wallet, logger) => {
  const owner = Wallet.createRandom();
  const auraKey = getAuraKeyContract().connect(wallet);

  logger.info(
    {
      parameters: {
        contractAddress: auraKey.address,
        owner: owner.address,
      },
    },
    `create "auraKey.buyAuraKey" call`
  );

  logger.info(`dispatch transaction from wallet=${wallet.address}`);
  const tx = await auraKey.buyAuraKey(1);

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
