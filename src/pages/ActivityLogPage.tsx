import React, { useState } from 'react';
import { Calendar, Filter, Search, ExternalLink, CheckCircle, Clock, AlertTriangle, Zap, Shield, FileText, Send } from 'lucide-react';

const ActivityLogPage: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const activities = [
    {
      id: '1',
      type: 'vault_created',
      title: 'Vault Token Minted',
      description: 'Manhattan Luxury Apartment tokenized successfully',
      vaultId: '12847',
      chain: 'Ethereum',
      timestamp: '2024-01-15T14:32:00Z',
      status: 'completed',
      txHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890'
    },
    {
      id: '2',
      type: 'ai_verification',
      title: 'AI Verification Completed',
      description: 'Asset documentation verified with 94% confidence score',
      vaultId: '12847',
      chain: 'Ethereum',
      timestamp: '2024-01-15T14:28:00Z',
      status: 'completed',
      aiScore: 94
    },
    {
      id: '3',
      type: 'bridge_initiated',
      title: 'Cross-Chain Bridge Started',
      description: '2023 Tesla Model S bridging from Ethereum to Polygon',
      vaultId: '12846',
      chain: 'Ethereum → Polygon',
      timestamp: '2024-01-14T16:45:00Z',
      status: 'pending'
    },
    {
      id: '4',
      type: 'bridge_completed',
      title: 'Bridge Transfer Completed',
      description: 'Vintage Rolex Collection successfully moved to Arbitrum',
      vaultId: '12845',
      chain: 'Ethereum → Arbitrum',
      timestamp: '2024-01-13T11:20:00Z',
      status: 'completed',
      txHash: '0x9876543210abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    },
    {
      id: '5',
      type: 'verification_failed',
      title: 'AI Verification Failed',
      description: 'Industrial Equipment documentation needs additional review',
      vaultId: '12844',
      chain: 'Ethereum',
      timestamp: '2024-01-12T09:15:00Z',
      status: 'failed'
    },
    {
      id: '6',
      type: 'documents_uploaded',
      title: 'Documents Uploaded',
      description: '4 files uploaded for Manhattan Luxury Apartment',
      vaultId: '12847',
      chain: 'Ethereum',
      timestamp: '2024-01-15T14:15:00Z',
      status: 'completed'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'vault_created':
        return <Shield className="h-5 w-5 text-green-600" />;
      case 'ai_verification':
        return <Zap className="h-5 w-5 text-purple-600" />;
      case 'bridge_initiated':
      case 'bridge_completed':
        return <Send className="h-5 w-5 text-blue-600" />;
      case 'verification_failed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'documents_uploaded':
        return <FileText className="h-5 w-5 text-indigo-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.vaultId.includes(searchTerm);
    const matchesFilter = filterType === 'all' || activity.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Log</h1>
          <p className="text-gray-600">Track all your vault operations and transactions</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                <option value="all">All Activities</option>
                <option value="vault_created">Vault Created</option>
                <option value="ai_verification">AI Verification</option>
                <option value="bridge_initiated">Bridge Started</option>
                <option value="bridge_completed">Bridge Completed</option>
                <option value="documents_uploaded">Documents</option>
                <option value="verification_failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredActivities.map((activity, index) => {
              const { date, time } = formatTimestamp(activity.timestamp);
              
              return (
                <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {activity.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{activity.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {date} at {time}
                        </div>
                        
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-1" />
                          Vault #{activity.vaultId}
                        </div>
                        
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {activity.chain}
                        </div>
                        
                        {activity.aiScore && (
                          <div className="flex items-center">
                            <Zap className="h-4 w-4 mr-1" />
                            AI Score: {activity.aiScore}%
                          </div>
                        )}
                        
                        {activity.txHash && (
                          <button className="flex items-center text-blue-600 hover:text-blue-700">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Transaction
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredActivities.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Clock className="h-12 w-12 mx-auto mb-4" />
                No activities found
              </div>
              <p className="text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Your activity will appear here as you use the platform'
                }
              </p>
            </div>
          )}
        </div>

        {/* Activity Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {activities.filter(a => a.status === 'completed').length}
            </div>
            <div className="text-gray-500 text-sm">Completed Actions</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {activities.filter(a => a.status === 'pending').length}
            </div>
            <div className="text-gray-500 text-sm">Pending Actions</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {activities.filter(a => a.type === 'ai_verification').length}
            </div>
            <div className="text-gray-500 text-sm">AI Verifications</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {activities.filter(a => a.type.includes('bridge')).length}
            </div>
            <div className="text-gray-500 text-sm">Bridge Transfers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogPage;