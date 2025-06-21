"use client";

import { useCallback, useMemo, useState } from "react";
import { parseUnits } from "viem";
import { useAuth, useFutureverseSigner } from "@futureverse/auth-react";
import { useRootStore } from "@/core/hooks/useRootStore";
import { useShouldShowEoa } from "@/core/hooks/useShouldShowEoa";
import { useTrnApi } from "@futureverse/transact-react";
import { useGetExtrinsic } from "@/core/hooks/useGetExtrinsic";
import { TransactionBuilder } from "@futureverse/transact";
import { AURA_KEY_ABI, AURA_KEY_ADDRESS, ERC20_ABI } from "@/core/contract";
import { ASSET_ID } from "@/utils/utils";

export default function BuyAura() {
  const { userSession } = useAuth();
  const { resetState, setCurrentBuilder, signed, result, error } = useRootStore(state => state);
  const shouldShowEoa = useShouldShowEoa();

  const [fromWallet, setFromWallet] = useState<'eoa' | 'fpass'>(
    shouldShowEoa ? 'eoa' : 'fpass'
  );

  const [feeAssetId, setFeeAssetId] = useState<number>(1);
  const [slippage, setSlippage] = useState<string>('5');

  const disable = useMemo(() => {
    return signed && !result && !error;
  }, [signed, result, error]);

  const { trnApi } = useTrnApi();
  const signer = useFutureverseSigner();

  const getExtrinsic = useGetExtrinsic();

  const createBuilderApprove = useCallback(async () => {
    console.log('createBuilder');
    console.log('trnApi', trnApi);
    console.log('signer', signer);
    console.log('userSession', userSession);
    if (!trnApi || !signer || !userSession) {
      console.log('Missing trnApi, signer or userSession');
      return;
    }

    const builder = await TransactionBuilder.evm(
      trnApi,
      signer as any,
      userSession.eoa,
      "0xcCcCCccC00000001000000000000000000000000", // root
    );

    await builder.writeContract({
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [
        AURA_KEY_ADDRESS,
        parseUnits("1", 18),
      ],
      fromFuturePass: fromWallet === 'eoa' ? false : true,
    });

    await builder.addFeeProxy({
      assetId: ASSET_ID.ROOT,
      slippage: Number(slippage),
    });

    getExtrinsic(builder);
    setCurrentBuilder(builder);
  }, [
    trnApi,
    signer,
    userSession,
    fromWallet,
    getExtrinsic,
    setCurrentBuilder,
    feeAssetId,
    slippage,
  ]);


  const createBuilder = useCallback(async () => {
    console.log('createBuilder');
    console.log('trnApi', trnApi);
    console.log('signer', signer);
    console.log('userSession', userSession);
    if (!trnApi || !signer || !userSession) {
      console.log('Missing trnApi, signer or userSession');
      return;
    }

    const builder = await TransactionBuilder.evm(
      trnApi,
      signer as any,
      userSession.eoa,
      AURA_KEY_ADDRESS
    );

    await builder.writeContract({
      abi: AURA_KEY_ABI,
      functionName: 'buyAuraKey',
      args: [
        parseUnits("10", 18),
      ],
      fromFuturePass: fromWallet === 'eoa' ? false : true,
    });

    await builder.addFeeProxy({
      assetId: ASSET_ID.ROOT,
      slippage: Number(slippage),
    });

    getExtrinsic(builder);
    setCurrentBuilder(builder);
  }, [
    trnApi,
    signer,
    userSession,
    fromWallet,
    getExtrinsic,
    setCurrentBuilder,
    feeAssetId,
    slippage,
  ]);

  return <div>
    <button
      className="w-full builder-input green"
      onClick={() => {
        console.log('clicked');
        resetState();
        createBuilderApprove();
      }}
      disabled={disable}
    >
      Approve ROOT
    </button>
    <button
      className="w-full builder-input green"
      onClick={() => {
        console.log('clicked');
        resetState();
        createBuilder();
      }}
      disabled={disable}
    >
      Buy Aura Key
    </button>
  </div>;
}