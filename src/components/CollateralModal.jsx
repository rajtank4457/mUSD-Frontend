import { useEffect, useState } from "react";
import { parseMantra, protocolContract } from "../constants";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";
import { coin } from "@cosmjs/stargate";
import { X, ArrowDownToLine, ArrowUpToLine, Info } from 'lucide-react';

export default function CollateralModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState(0);
  const [activeAction, setActiveAction] = useState("deposit");
  const [loading, setLoading] = useState(false);
  const { client } = useAbstraxionSigningClient();
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();
  const [depositBalance, setDepositBalance] = useState(0);
  const [withdrawBalance, setWithdrawBalance] = useState(0);

  const deposit_message = {
    deposit_collateral: {},
  };

  const withdraw_msg = {
    redeem_collateral: {
      amount: parseMantra(amount).toString(),
    },
  };

  const fund = [coin(parseMantra(amount), "uxion")];

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (activeAction === "deposit") {
        await client?.execute(
          bech32Address,
          protocolContract,
          deposit_message,
          {
            amount: [{ amount: "0", denom: "uxion" }],
            gas: "500000",
            granter:
              "xion1h82c0efsxxq4pgua754u6xepfu6avglup20fl834gc2ah0ptgn5s2zffe9",
          },
          "",
          fund
        );
      } else {
        await client.execute(
          bech32Address,
          protocolContract,
          withdraw_msg,
          {
            amount: [{ amount: "0", denom: "uxion" }],
            gas: "500000",
            granter:
              "xion1h82c0efsxxq4pgua754u6xepfu6avglup20fl834gc2ah0ptgn5s2zffe9",
          },
          "",
          []
        );
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setLoading(false);
    }
  };

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
      const deposit_balance = await client.getBalance(bech32Address, "uxion");
      const withdraw_balance = await client.queryContractSmart(
        protocolContract,
        borrow_msg
      );

      setDepositBalance(deposit_balance?.amount / 1000000);
      setWithdrawBalance(withdraw_balance?.collateral_deposited / 1000000);
    } catch (error) {
      console.error("Error while fetching balance:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetch_balance();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, bech32Address, isOpen, activeAction]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      <div className="w-full max-w-md p-8 bg-gray-900/90 border border-gray-800 text-white rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Manage Collateral</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Action Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 mb-6 bg-gray-800/50 rounded-lg">
          <button
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
              activeAction === "deposit"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => setActiveAction("deposit")}
          >
            <ArrowDownToLine className="w-4 h-4" />
            Deposit
          </button>
          <button
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
              activeAction === "withdraw"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
            onClick={() => setActiveAction("withdraw")}
          >
            <ArrowUpToLine className="w-4 h-4" />
            Withdraw
          </button>
        </div>

        {/* Input Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Amount</label>
                <div className="group relative">
                  <Info className="w-4 h-4 text-gray-500" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-sm text-gray-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Enter the amount you want to {activeAction}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Balance:{' '}
                <span className="text-white">
                  {client
                    ? (activeAction === "deposit" ? depositBalance : withdrawBalance).toFixed(6)
                    : "loading..."}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="0.000000"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <button
                  onClick={() => 
                    activeAction === "deposit" 
                      ? setAmount(depositBalance) 
                      : setAmount(withdrawBalance)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-purple-400 hover:text-purple-300"
                >
                  MAX
                </button>
              </div>
              <span className="text-sm font-medium text-gray-400">XION</span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="p-4 bg-gray-800/30 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Transaction Fee</span>
              <span className="text-white">0.000 XION</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Protocol Fee</span>
              <span className="text-white">0.000 XION</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !amount || amount <= 0}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              `${activeAction === "deposit" ? "Deposit" : "Withdraw"} XION`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
