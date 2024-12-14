import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { useEffect, useState } from "react";
import { protocolContract } from "../constants";
import { DollarSign } from 'lucide-react';

export default function Balance() {
  const [borrowBalance, setBorrowBalance] = useState(0);
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

      setBorrowBalance(borrow_balance?.total_debt / 1000000);
    } catch (error) {
      console.error("Error while fetching balance:", error);
    }
  };

  useEffect(() => {
    fetch_balance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, bech32Address]);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-600/20 rounded-lg">
          <DollarSign className="w-6 h-6 text-purple-400" />
        </div>
        <div className="space-y-1">
          <h2 className="text-purple-400 text-sm font-medium">Total Balance</h2>
          <h1 className="text-4xl font-bold text-white">
            $ {client ? borrowBalance.toFixed(2) : 'loading...'}
          </h1>
        </div>
      </div>
    </div>
  );
}

