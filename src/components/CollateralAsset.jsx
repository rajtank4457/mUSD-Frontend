import { useEffect, useState } from "react";
import { CircleDollarSign } from "lucide-react";
import CollateralModal from "./CollateralModal";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { protocolContract } from "../constants";

export default function CollateralAsset() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collateralBalance, setCollateralBalance] = useState(0);
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();

  const fetch_balance = async () => {
    if (!client) {
      console.error("Client is not initialized.");
      return;
    }

    try {
      const borrow_msg = {
        info: {
          user: bech32Address,
        },
      };

      const borrow_balance = await client.queryContractSmart(
        protocolContract,
        borrow_msg
      );

      setCollateralBalance(borrow_balance?.collateral_deposited / 1000000);
    } catch (error) {
      console.error("Error while fetching balance:", error);
    }
  };

  useEffect(() => {
    fetch_balance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, bech32Address]); // Ensure `fetch_balance` runs when `client` or `bech32Address` changes

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between mb-6">
        <h3 className="text-gray-400">Collateral Asset</h3>
        <h3 className="text-gray-400">Protocol Balance</h3>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/32089.png"
          alt="xion icon"
          className="rounded-full h-8 w-8"
        />
        <div>
          <div className="font-semibold">XION</div>
          <div className="text-sm text-gray-400">
            {client ? collateralBalance.toFixed(5) : "loading..."}
          </div>
        </div>
      </div>

      <button
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        Manage Collateral
      </button>

      <CollateralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
