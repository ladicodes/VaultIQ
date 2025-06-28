import React, { useState } from 'react';
import { ArrowRight, Zap, Shield, Clock, CheckCircle, AlertTriangle, Loader2, ArrowUpDown } from 'lucide-react';

const BridgePage: React.FC = () => {
  const [sourceChain, setSourceChain] = useState('ethereum');
  const [targetChain, setTargetChain] = useState('polygon');
  const [selectedVault, setSelectedVault] = useState('');
  const [bridgeStatus, setBridgeStatus] = useState('idle');
  const [isProcessing, setIsProcessing] = useState(false);

  const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: 'indigo' },
    { id: 'polygon', name: 'Polygon', icon: '⬢', color: 'purple' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '◆', color: 'blue' },
    { id: 'optimism', name: 'Optimism', icon: '🔴', color: 'red' },
    { id: 'avalanche', name: 'Avalanche', icon: '🔺', color: 'red' },
    { id: 'binance', name: 'BSC', icon: '◯', color: 'yellow' }
  ];

  const userVaults = [
    { id: '12847', name: 'Manhattan Luxury Apartment', chain: 'ethereum', value: '$2,400,000' },
    { id: '12846', name: '2023 Tesla Model S', chain: 'polygon', value: '$89,500' },
    { id: '12845', name: 'Vintage Rolex Collection', chain: 'arbitrum', value: '$125,000' }
  ];

  const bridgeFees = {
    chainlinkCcip: '$15.50',
    gasEstimate: '$8.30',
    total: '$23.80'
  };

  const handleSwapChains = () => {
    const temp = sourceChain;
    setSourceChain(targetChain);
    setTargetChain(temp);
  };

  const handleBridge = async () => {
    if (!selectedVault) return;
    
    setIsProcessing(true);
    setBridgeStatus('processing');
    
    // Simulate bridge process
    setTimeout(() => {
      setBridgeStatus('completed');
      setIsProcessing(false);
    }, 5000);
  };

  const getChainColor = (chainId: string) => {
    const chain = chains.find(c => c.id === chainId);
    return chain?.color || 'gray';
  };

  const availableVaults = userVaults.filter(vault => vault.chain === sourceChain);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cross-Chain Bridge</h1>
          <p className="text-xl text-gray-600">Move your tokenized assets across blockchains using Chainlink CCIP</p>
        </div>

        {/* Bridge Interface */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {bridgeStatus === 'idle' && (
            <>
              {/* Chain Selection */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Networks</h2>
                
                <div className="flex items-center justify-between">
                  {/* Source Chain */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-3">From</label>
                    <div className="grid grid-cols-2 gap-3">
                      {chains.map((chain) => (
                        <button
                          key={chain.id}
                          onClick={() => setSourceChain(chain.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            sourceChain === chain.id
                              ? `border-${chain.color}-500 bg-${chain.color}-50`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{chain.icon}</span>
                            <span className="font-semibold">{chain.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="mx-8">
                    <button
                      onClick={handleSwapChains}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <ArrowUpDown className="h-6 w-6 text-gray-600" />
                    </button>
                  </div>

                  {/* Target Chain */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-3">To</label>
                    <div className="grid grid-cols-2 gap-3">
                      {chains.filter(chain => chain.id !== sourceChain).map((chain) => (
                        <button
                          key={chain.id}
                          onClick={() => setTargetChain(chain.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            targetChain === chain.id
                              ? `border-${chain.color}-500 bg-${chain.color}-50`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{chain.icon}</span>
                            <span className="font-semibold">{chain.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Vault Selection */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Vault to Bridge</h2>
                
                {availableVaults.length > 0 ? (
                  <div className="space-y-3">
                    {availableVaults.map((vault) => (
                      <button
                        key={vault.id}
                        onClick={() => setSelectedVault(vault.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          selectedVault === vault.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-gray-900">{vault.name}</div>
                            <div className="text-sm text-gray-500">Token ID: #{vault.id}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-gray-900">{vault.value}</div>
                            <div className={`text-sm font-medium text-${getChainColor(vault.chain)}-600 capitalize`}>
                              {chains.find(c => c.id === vault.chain)?.name}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No vaults available on {chains.find(c => c.id === sourceChain)?.name}. 
                    Select a different source chain.
                  </div>
                )}
              </div>

              {/* Bridge Information */}
              {selectedVault && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bridge Details</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center mb-3">
                        <Zap className="h-6 w-6 text-blue-600 mr-3" />
                        <h3 className="font-semibold">Chainlink CCIP</h3>
                      </div>
                      <div className="text-sm text-gray-600">
                        Secure cross-chain messaging protocol
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <div className="flex items-center mb-3">
                        <Shield className="h-6 w-6 text-green-600 mr-3" />
                        <h3 className="font-semibold">Security</h3>
                      </div>
                      <div className="text-sm text-gray-600">
                        Asset ownership verified on both chains
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                      <div className="flex items-center mb-3">
                        <Clock className="h-6 w-6 text-purple-600 mr-3" />
                        <h3 className="font-semibold">Time Estimate</h3>
                      </div>
                      <div className="text-sm text-gray-600">
                        ~10-15 minutes for completion
                      </div>
                    </div>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="mt-6 bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Fee Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chainlink CCIP Fee</span>
                        <span className="font-medium">{bridgeFees.chainlinkCcip}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gas Estimate</span>
                        <span className="font-medium">{bridgeFees.gasEstimate}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-900">Total</span>
                          <span className="font-bold text-gray-900">{bridgeFees.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bridge Button */}
              <button
                onClick={handleBridge}
                disabled={!selectedVault || isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin mr-3" />
                    Initiating Bridge...
                  </>
                ) : (
                  <>
                    Bridge Asset
                    <ArrowRight className="h-6 w-6 ml-3" />
                  </>
                )}
              </button>
            </>
          )}

          {/* Bridge Processing */}
          {bridgeStatus === 'processing' && (
            <div className="text-center py-12">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                  <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Bridging in Progress</h2>
                <p className="text-gray-600 mb-8">Your vault is being transferred via Chainlink CCIP</p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-green-700">Transaction initiated</span>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin mr-3" />
                    <span className="text-blue-700">CCIP message processing...</span>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">Awaiting destination confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bridge Complete */}
          {bridgeStatus === 'completed' && (
            <div className="text-center py-12">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Bridge Successful!</h2>
                <p className="text-gray-600 mb-8">Your vault has been successfully transferred to {chains.find(c => c.id === targetChain)?.name}</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">New Token Address</div>
                  <div className="font-mono text-sm text-green-700 break-all">
                    0x9876543210abcdef1234567890abcdef12345678
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">Transaction Hash</div>
                <div className="font-mono text-xs text-green-700 break-all">
                  0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  View in Dashboard
                </button>
                <button
                  onClick={() => {
                    setBridgeStatus('idle');
                    setSelectedVault('');
                    setIsProcessing(false);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Bridge Another Asset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CCIP Information */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Powered by Chainlink CCIP</h2>
          <p className="text-gray-600 mb-6">
            Cross-Chain Interoperability Protocol (CCIP) ensures secure and reliable asset transfers across blockchains 
            with cryptographic proof of ownership and anti-fraud mechanisms.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-sm text-gray-600">Supported Chains</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$2B+</div>
              <div className="text-sm text-gray-600">Volume Secured</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgePage;