import {
  collectionIdToERC721Address,
  ERC721_PRECOMPILE_ABI,
  getPublicProviderUrl,
} from "@therootnetwork/evm";
import { Contract, getDefaultProvider } from "ethers";

const collectionAddress = collectionIdToERC721Address(1);
const providerUrl = getPublicProviderUrl("porcini");
const provider = getDefaultProvider(providerUrl);
const contract = new Contract(collectionAddress, ERC721_PRECOMPILE_ABI, provider);