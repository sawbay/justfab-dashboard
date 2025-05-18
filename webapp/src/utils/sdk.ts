import { RootQueryBuilder } from "@futureverse/transact";
import { formatUnits } from "viem";

export const getBalance = async (
  transactionQuery: RootQueryBuilder | undefined,
  address: string,
  assetId: number
) => {
  if (!transactionQuery) {
    return {
      balance: '0',
      rawBalance: '0',
      decimals: 0,
    };
  }

  const walletBalance = await transactionQuery?.checkBalance({
    walletAddress: address,
    assetId: assetId,
  });

  return {
    balance: walletBalance
      ? formatUnits(BigInt(walletBalance?.balance), walletBalance?.decimals)
      : '0',
    rawBalance: walletBalance?.balance,
    decimals: walletBalance?.decimals,
  };
};

export const getBalances = async (
  transactionQuery: RootQueryBuilder | undefined,
  walletAssetIds: Array<{ walletAddress: string; assetId: number }>
) => {
  if (!transactionQuery) {
    return [
      {
        walletAddress: '',
        balance: '0',
        rawBalance: '0',
        decimals: 0,
      },
    ];
  }

  const walletBalances = await transactionQuery?.checkBalances(walletAssetIds);

  const balances = walletBalances?.map(walletBalance => {
    return {
      walletAddress: walletBalance.walletAddress,
      balance: formatUnits(
        BigInt(walletBalance?.balance),
        walletBalance?.decimals
      ),
      rawBalance: walletBalance?.balance,
      decimals: walletBalance?.decimals,
    };
  });

  return balances;
};
