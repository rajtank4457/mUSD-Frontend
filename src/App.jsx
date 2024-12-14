import { useState } from 'react';
import Balance from './components/Balance';
import ActionButtons from './components/ActionButtons';
import CollateralAsset from './components/CollateralAsset';
import ManageBorrowRepay from './components/ManageBorrowRepay';
import PositionSummary from './components/PositionSummary';
import Footer from './components/Footer';

export default function App() {
  const [action, setAction] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <Balance />
            <ActionButtons setAction={setAction} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <CollateralAsset />
            <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
              <h3 className="text-xl font-medium text-gray-200 mb-4">Market Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">APR</span>
                  <span className="text-gray-200">12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Deposits</span>
                  <span className="text-gray-200">$1.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Borrows</span>
                  <span className="text-gray-200">$800K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-6">
            <ManageBorrowRepay action={action} />
            <PositionSummary />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

