import { useState, useEffect } from "react";
import { parseMantra, protocolContract, stableContract } from "../constants";
import {
  useAbstraxionAccount,
  useAbstraxionSigningClient,
} from "@burnt-labs/abstraxion";

export default function ManageBorrowRepay({ action }) {
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();
  const { client } = useAbstraxionSigningClient();
  const [amount, setAmount] = useState("");
  const [buttonText, setButtonText] = useState("Borrow");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (action === "borrow") {
      setButtonText("Borrow MUSD");
    } else if (action === "repay") {
      setButtonText("Repay MUSD");
    } else {
      setButtonText("Borrow");
    }
  }, [action]);

  const borrow_msg = {
    borrow_tokens: {
      token_amount: parseMantra(amount).toString(),
    },
  };

  const increase_allowance = {
    increase_allowance: {
      spender: protocolContract,
      amount: parseMantra(amount).toString(),
    },
  };

  const repay_msg = {
    repay: {
      token_amount: parseMantra(amount).toString(),
    },
  };

  const handleSubmit = async () => {
    // Implement borrow or repay logic here
    if (action === "borrow") {
      setLoading(true)
      const borrow = await client.execute(
        bech32Address,
        protocolContract,
        borrow_msg,
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "500000",
          granter:
            "xion1h82c0efsxxq4pgua754u6xepfu6avglup20fl834gc2ah0ptgn5s2zffe9",
        },
        "",
        []
      );
      console.log(borrow);
      setLoading(false)
    } else {
      setLoading(true)
      const allowanceResponse = await client.execute(
        bech32Address,
        stableContract,
        increase_allowance,
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "500000",
          granter:
            "xion1h82c0efsxxq4pgua754u6xepfu6avglup20fl834gc2ah0ptgn5s2zffe9",
        },
        "",
        []
      );

      console.log("allowance response: ", allowanceResponse);

      const repay_tx = await client.execute(
        bech32Address,
        protocolContract,
        repay_msg,
        {
          amount: [{ amount: "0", denom: "uxion" }],
          gas: "500000",
          granter:
            "xion1h82c0efsxxq4pgua754u6xepfu6avglup20fl834gc2ah0ptgn5s2zffe9",
        },
        "",
        []
      );
      console.log(repay_tx);
      setLoading(false)
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-gray-400 mb-4">Manage Borrow & Repay</h3>
      <div className="flex gap-4 items-center">
        <input
          type="number"
          placeholder="0.000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          onClick={handleSubmit}
        >
          {loading ? 'Loading...' :  buttonText}
        </button>
      </div>
    </div>
  );
}
