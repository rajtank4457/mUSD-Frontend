import { Abstraxion, useAbstraxionAccount, useModal } from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import { Wallet, ArrowDownToLine, ArrowUpToLine } from 'lucide-react';

export default function ActionButtons({ setAction }) {
  const {
    data: { bech32Address },
    isConnected,
    isConnecting,
  } = useAbstraxionAccount();
  const [, setShow] = useModal();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button 
        className="px-4 py-2.5 bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
        onClick={() => setAction('borrow')}
      >
        <ArrowDownToLine className="w-4 h-4" />
        Borrow MUSD
      </button>
      <button 
        className="px-4 py-2.5 bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
        onClick={() => setAction('repay')}
      >
        <ArrowUpToLine className="w-4 h-4" />
        Repay MUSD
      </button>
      <Button
        onClick={() => {
          setShow(true);
        }}
        structure="base"
        className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
      >
        <Wallet className="w-4 h-4" />
        {bech32Address ? "VIEW ACCOUNT" : "CONNECT"}
      </Button>
      <Abstraxion onClose={() => setShow(false)} />
    </div>
  );
}

