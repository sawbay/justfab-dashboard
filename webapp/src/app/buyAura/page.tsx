"use client";

import { useCallback, useMemo, useState } from "react";
import { EvmModal } from "@/components/common/EvmModal";
import { useDebounce } from "@/core/hooks/useDebounce";
import { AURA_KEY_ABI, AURA_KEY_ADDRESS } from "./contract";
import { parseAbi, parseUnits } from "viem";
import { ASSET_ID } from "@/utils/utils";
import { SFT_PRECOMPILE_ABI } from "@therootnetwork/evm";
import { useAuth, useFutureverseSigner } from "@futureverse/auth-react";
import { useRootStore } from "@/core/hooks/useRootStore";
import { useShouldShowEoa } from "@/core/hooks/useShouldShowEoa";
import { useTrnApi } from "@futureverse/transact-react";
import { useGetExtrinsic } from "@/core/hooks/useGetExtrinsic";
import { TransactionBuilder } from "@futureverse/transact";

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

  const [showDialog, setShowDialog] = useState(true);
  const [assetContract, setAssetContract] = useState<`0x${string}`>(
    '0xcCcCCccC00000001000000000000000000000000'
  );
  const contractDebounced = useDebounce(assetContract ?? '', 500);
  const createBuilder = useCallback(async () => {
    if (!trnApi || !signer || !userSession) {
      console.log('Missing trnApi, signer or userSession');
      return;
    }

    const builder = await TransactionBuilder.evm(
      trnApi,
      signer as Signer,
      userSession.eoa,
      AURA_KEY_ADDRESS
    );

    await builder.writeContract({
      abi: AURA_KEY_ABI,
      functionName: 'buyAuraKey',
      args: [
        parseUnits("1", 18),
      ],
      fromFuturePass: fromWallet === 'eoa' ? false : true,
    });

    if (feeAssetId !== 2) {
      await builder.addFeeProxy({
        assetId: feeAssetId,
        slippage: Number(slippage),
      });
    }

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
        resetState();
        createBuilder();
      }}
      disabled={disable}
    >
      Increment Counter
    </button>
  </div>;
}