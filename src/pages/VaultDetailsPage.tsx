import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Brain, Link as LinkIcon, TrendingUp, Calendar, FileText, Image, Download, ExternalLink, Share2 } from 'lucide-react';

const VaultDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for the vault
  const vault = {
    id: '12847',
    name: 'Manhattan Luxury Apartment',
    type: 'Real Estate',
    value: '$2,400,000',
    aiScore: 94,
    status: 'Active',
    chain: 'Ethereum',
    contractAddress: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    tokenId: '12847',
    createdDate: '2024-01-15',
    lastUpdate: '2024-01-15',
    image: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A luxurious 2-bedroom apartment in Manhattan with stunning city views. Prime location in the Financial District with access to premium amenities.',
    documents: [
      { name: 'Property Deed', type: 'PDF', size: '2.4 MB', verified: true },
      { name: 'Appraisal Report', type: 'PDF', size: '1.8 MB', verified: true },
      { name: 'Insurance Certificate', type: 'PDF', size: '0.9 MB', verified: true },
      { name: 'Property Photos', type: 'Images', size: '15.2 MB', verified: true }
    ],
    aiVerification: {
      score: 94,
      confidence: 'High',
      riskLevel: 'Low',
      details: {
        documentAuthenticity: 96,
        visualConsistency: 92,
        marketValidation: 94
      }
    },
    proofOfReserve: {
      verified: true,
      lastCheck: '2024-01-15',
      reserveRatio: '100%',
      custodian: 'Chainlink PoR'
    },
    priceHistory: [
      { date: '2024-01-01', price: 2350000 },
      { date: '2024-01-05', price: 2375000 },
      { date: '2024-01-10', price: 2390000 },
      { date: '2024-01-15', price: 2400000 }
    ]
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Shield },
    { id: 'verification', name: 'AI Verification', icon: Brain },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'history', name: 'History', icon: Calendar }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/dashboard"
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{vault.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Token ID: #{vault.tokenId}</span>
              <span>•</span>
              <span>{vault.type}</span>
              <span>•</span>
              <span className="text-green-600 font-medium">{vault.status}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
            <Link
              to="/bridge"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Bridge Asset
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Quick Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <img
                src={vault.image}
                alt={vault.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">{vault.value}</div>
                <div className="text-gray-600 mb-4">Current Market Value</div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">AI Score</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-green-600 mr-2">{vault.aiScore}%</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${vault.aiScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chain</span>
                    <span className="font-medium">{vault.chain}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Proof of Reserve</span>
                    <span className="flex items-center text-green-600">
                      <Shield className="h-4 w-4 mr-1" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contract Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-600 mb-1">Contract Address</div>
                  <div className="font-mono text-xs bg-gray-50 p-2 rounded flex items-center justify-between">
                    <span className="truncate">{vault.contractAddress}</span>
                    <button className="ml-2 text-blue-600 hover:text-blue-700">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Token Standard</div>
                  <div className="font-medium">ERC-721 (NFT)</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Created</div>
                  <div className="font-medium">{vault.createdDate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-2" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Asset Overview</h3>
                    <p className="text-gray-600 mb-6">{vault.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                        <div className="flex items-center mb-3">
                          <Shield className="h-6 w-6 text-green-600 mr-3" />
                          <h4 className="font-semibold">Proof of Reserve</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status</span>
                            <span className="text-green-600 font-medium">✓ Verified</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reserve Ratio</span>
                            <span className="font-medium">{vault.proofOfReserve.reserveRatio}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Check</span>
                            <span className="font-medium">{vault.proofOfReserve.lastCheck}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                        <div className="flex items-center mb-3">
                          <TrendingUp className="h-6 w-6 text-blue-600 mr-3" />
                          <h4 className="font-semibold">Price Performance</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">24h Change</span>
                            <span className="text-green-600 font-medium">+0.4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">7d Change</span>
                            <span className="text-green-600 font-medium">+2.1%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">30d Change</span>
                            <span className="text-green-600 font-medium">+5.8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Verification Tab */}
                {activeTab === 'verification' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Verification Results</h3>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Brain className="h-6 w-6 text-purple-600 mr-3" />
                          <h4 className="font-semibold">Overall AI Score</h4>
                        </div>
                        <div className="text-3xl font-bold text-purple-600">{vault.aiVerification.score}%</div>
                      </div>
                      <div className="w-full bg-white rounded-full h-3 mb-4">
                        <div 
                          className="bg-purple-600 h-3 rounded-full transition-all"
                          style={{ width: `${vault.aiVerification.score}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Confidence: {vault.aiVerification.confidence}</span>
                        <span className="text-gray-600">Risk Level: {vault.aiVerification.riskLevel}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600 mb-2">
                          {vault.aiVerification.details.documentAuthenticity}%
                        </div>
                        <div className="text-sm text-gray-600">Document Authenticity</div>
                      </div>
                      <div className="text-center p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          {vault.aiVerification.details.visualConsistency}%
                        </div>
                        <div className="text-sm text-gray-600">Visual Consistency</div>
                      </div>
                      <div className="text-center p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600 mb-2">
                          {vault.aiVerification.details.marketValidation}%
                        </div>
                        <div className="text-sm text-gray-600">Market Validation</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
                    <div className="space-y-4">
                      {vault.documents.map((doc, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                          <div className="p-2 bg-blue-100 rounded-lg mr-4">
                            {doc.type === 'Images' ? (
                              <Image className="h-6 w-6 text-blue-600" />
                            ) : (
                              <FileText className="h-6 w-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{doc.name}</div>
                            <div className="text-sm text-gray-500">{doc.type} • {doc.size}</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {doc.verified && (
                              <span className="flex items-center text-green-600 text-sm">
                                <Shield className="h-4 w-4 mr-1" />
                                Verified
                              </span>
                            )}
                            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="p-2 bg-green-100 rounded-lg mr-4">
                          <Shield className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Vault Token Minted</div>
                          <div className="text-sm text-gray-500">Token created and verified on Ethereum</div>
                          <div className="text-xs text-gray-400 mt-1">2024-01-15 14:32 UTC</div>
                        </div>
                        <div className="text-green-600 font-semibold">Success</div>
                      </div>

                      <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="p-2 bg-blue-100 rounded-lg mr-4">
                          <Brain className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">AI Verification Completed</div>
                          <div className="text-sm text-gray-500">Asset documentation verified with 94% confidence</div>
                          <div className="text-xs text-gray-400 mt-1">2024-01-15 14:28 UTC</div>
                        </div>
                        <div className="text-blue-600 font-semibold">94% Score</div>
                      </div>

                      <div className="flex items-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <div className="p-2 bg-purple-100 rounded-lg mr-4">
                          <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Documents Uploaded</div>
                          <div className="text-sm text-gray-500">4 documents uploaded for verification</div>
                          <div className="text-xs text-gray-400 mt-1">2024-01-15 14:15 UTC</div>
                        </div>
                        <div className="text-purple-600 font-semibold">4 Files</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDetailsPage;