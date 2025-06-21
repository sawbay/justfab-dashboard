"use client";

import { useState } from "react";
import { EvmModal } from "@/components/common/EvmModal";
import { useDebounce } from "@/core/hooks/useDebounce";
import { AURA_KEY_ABI } from "./abi";
import { parseAbi, parseUnits } from "viem";
import { ASSET_ID } from "@/utils/utils";

export default function BuyAura() {
  const [showDialog, setShowDialog] = useState(true);
  const [assetContract, setAssetContract] = useState<`0x${string}`>(
    '0xcCcCCccC00000001000000000000000000000000'
  );
  const contractDebounced = useDebounce(assetContract ?? '', 500);

  return <div>
    <EvmModal
      setShowDialog={setShowDialog}
      fromWallet={"fpass"}
      contract={contractDebounced}
      functionName="buyAuraKey"
      abi={parseAbi(AURA_KEY_ABI)}
      args={[
        parseUnits("1", 18),
      ]}
      feeAssetId={ASSET_ID.ROOT}
      slippage={"5"}
      callback={() => {
        setShowDialog(false);
      }}
      decimals={18}
    />
  </div>;
}