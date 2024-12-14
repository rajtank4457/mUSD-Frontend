import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { useEffect, useState } from "react";
import { protocolContract } from "../constants";
import { TrendingUp, AlertTriangle, Percent, DollarSign } from "lucide-react";

export default function PositionSummary() {
  const [data, setData] = useState({});
  const [borrowBalance, setBorrowBalance] = useState(0);
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
      const config_msg = {
        config: {},
      };

      const borrow_msg = {
        info: {
          user: bech32Address,
        },
      };

      const borrow_balance = await client.queryContractSmart(
        protocolContract,
        borrow_msg
      );

      const config_tx = await client.queryContractSmart(
        protocolContract,
        config_msg
      );

      setData(config_tx);
      setBorrowBalance(borrow_balance?.total_debt / 1000000);
      setCollateralBalance(borrow_balance?.collateral_deposited / 1000000);
      console.log(data);
    } catch (error) {
      console.error("Error while fetching balance:", error);
    }
  };

  useEffect(() => {
    fetch_balance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, bech32Address]); // Ensure `fetch_balance` runs when `client` or `bech32Address` changes

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
      <h3 className="text-xl font-medium text-gray-200 mb-6">
        Position Summary
      </h3>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span>Collateral Value</span>
          </div>
          {client ? (
            <div className="text-2xl font-semibold">
              ${" "}
              {((data?.oracle_price / 1000000) * collateralBalance).toFixed(3)}
            </div>
          ) : (
            <div className="text-2xl">loading...</div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Liquidation Price</span>
          </div>
          {client ? (
            <div className="text-2xl font-semibold">
              $ {((1.29 * borrowBalance) / collateralBalance).toFixed(3)}
            </div>
          ) : (
            <div className="text-2xl">loading...</div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span>Borrow Capacity</span>
          </div>
          {client ? (
            <div className="text-2xl font-semibold">
              ${" "}
              {(
                ((data?.oracle_price / 1000000) * collateralBalance) / 1.29 -
                borrowBalance
              ).toFixed(3)}
            </div>
          ) : (
            <div className="text-2xl">loading...</div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <Percent className="w-4 h-4" />
            <span>LTV</span>
          </div>
          {client ? (
            <div className="text-2xl font-semibold">
              {(
                (borrowBalance /
                  ((data?.oracle_price / 1000000) * collateralBalance)) *
                100
              ).toFixed(3)}
              %
            </div>
          ) : (
            <div className="text-2xl">loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
