import React, { useState } from 'react';
import { Upload, FileText, Image, CheckCircle, AlertTriangle, Loader2, Brain, Shield, Zap, X } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';
import LoadingSpinner from '../components/LoadingSpinner';

const CreateVaultPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [assetType, setAssetType] = useState('');
  const [assetName, setAssetName] = useState('');
  const [assetDescription, setAssetDescription] = useState('');
  const [aiVerificationStatus, setAiVerificationStatus] = useState('idle');
  const [aiScore, setAiScore] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const assetTypes = [
    { id: 'real-estate', name: 'Real Estate', icon: '🏠', description: 'Properties, land, buildings' },
    { id: 'vehicle', name: 'Vehicle', icon: '🚗', description: 'Cars, motorcycles, boats' },
    { id: 'art', name: 'Art & Collectibles', icon: '🎨', description: 'Artwork, antiques, collectibles' },
    { id: 'precious-metals', name: 'Precious Metals', icon: '💎', description: 'Gold, silver, jewelry' },
    { id: 'equipment', name: 'Equipment', icon: '⚙️', description: 'Industrial, medical equipment' },
    { id: 'other', name: 'Other', icon: '📦', description: 'Other valuable assets' }
  ];

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};

    switch (step) {
      case 1:
        if (!assetType) newErrors.assetType = 'Please select an asset type';
        if (!assetName.trim()) newErrors.assetName = 'Asset name is required';
        if (!assetDescription.trim()) newErrors.assetDescription = 'Asset description is required';
        break;
      case 2:
        if (uploadedFiles.length === 0) newErrors.files = 'Please upload at least one file';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || 
                         file.type === 'application/pdf' ||
                         file.type.includes('document');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
    setErrors(prev => ({ ...prev, files: '' }));
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAIVerification = async () => {
    if (!validateStep(2)) return;

    setIsProcessing(true);
    setAiVerificationStatus('processing');
    
    // Simulate AI verification process with realistic timing
    setTimeout(() => {
      const score = Math.floor(Math.random() * 20) + 80; // 80-99% range
      setAiScore(score);
      setAiVerificationStatus('completed');
      setIsProcessing(false);
      setCurrentStep(3);
    }, 4000);
  };

  const handleMintVault = async () => {
    setIsProcessing(true);
    
    // Simulate minting process
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 3000);
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const steps = [
    { id: 1, name: 'Asset Details', description: 'Provide asset information' },
    { id: 2, name: 'Upload & Verify', description: 'Upload documentation and AI verification' },
    { id: 3, name: 'Review & Mint', description: 'Review verification and mint your vault' },
    { id: 4, name: 'Complete', description: 'Your vault is ready!' }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-4 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Asset Details */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Asset Details</h2>
              <p className="text-gray-600 mb-8">Provide information about the asset you want to tokenize</p>
              
              {/* Asset Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">Asset Type *</label>
                <div className="grid md:grid-cols-3 gap-4">
                  {assetTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setAssetType(type.id);
                        setErrors(prev => ({ ...prev, assetType: '' }));
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        assetType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-semibold text-gray-900 mb-1">{type.name}</div>
                      <div className="text-sm text-gray-500">{type.description}</div>
                    </button>
                  ))}
                </div>
                {errors.assetType && (
                  <p className="mt-2 text-sm text-red-600">{errors.assetType}</p>
                )}
              </div>

              {/* Asset Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Name *</label>
                <input
                  type="text"
                  value={assetName}
                  onChange={(e) => {
                    setAssetName(e.target.value);
                    setErrors(prev => ({ ...prev, assetName: '' }));
                  }}
                  placeholder="e.g., Manhattan Luxury Apartment"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.assetName ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.assetName && (
                  <p className="mt-2 text-sm text-red-600">{errors.assetName}</p>
                )}
              </div>

              {/* Asset Description */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Description *</label>
                <textarea
                  value={assetDescription}
                  onChange={(e) => {
                    setAssetDescription(e.target.value);
                    setErrors(prev => ({ ...prev, assetDescription: '' }));
                  }}
                  placeholder="Provide a detailed description of your asset..."
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.assetDescription ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.assetDescription && (
                  <p className="mt-2 text-sm text-red-600">{errors.assetDescription}</p>
                )}
              </div>

              <button
                onClick={handleNextStep}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue to Upload
              </button>
            </div>
          )}

          {/* Step 2: Upload & Verify */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Upload Documentation</h2>
              <p className="text-gray-600 mb-8">Upload photos and documents for AI verification</p>

              {/* File Upload Area */}
              <div className={`border-2 border-dashed rounded-xl p-8 mb-8 text-center hover:border-blue-400 transition-colors ${
                errors.files ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}>
                <div className="mb-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-lg font-medium text-gray-900 mb-2">
                    Drag and drop your files here
                  </div>
                  <div className="text-gray-500 mb-4">or click to browse</div>
                  <div className="text-sm text-gray-400">
                    Supported: Images (JPG, PNG), PDF, DOC files up to 10MB
                  </div>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Browse Files
                </label>
              </div>
              {errors.files && (
                <p className="mt-2 text-sm text-red-600 text-center">{errors.files}</p>
              )}

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Uploaded Files ({uploadedFiles.length})</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        {file.type.startsWith('image/') ? (
                          <Image className="h-5 w-5 text-blue-600 mr-3" />
                        ) : (
                          <FileText className="h-5 w-5 text-blue-600 mr-3" />
                        )}
                        <span className="text-gray-900 flex-1">{file.name}</span>
                        <span className="text-sm text-gray-500 mr-3">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Verification Status */}
              {aiVerificationStatus !== 'idle' && (
                <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                  <div className="flex items-center mb-4">
                    <Brain className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="font-semibold text-gray-900">AI Verification</h3>
                  </div>
                  
                  {aiVerificationStatus === 'processing' && (
                    <div className="space-y-4">
                      <LoadingSpinner text="Analyzing your documentation..." />
                      <div className="text-sm text-gray-600">
                        Our AI is examining document authenticity, visual consistency, and market validation...
                      </div>
                    </div>
                  )}
                  
                  {aiVerificationStatus === 'completed' && (
                    <div>
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-green-700 font-medium">Verification Complete</span>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">AI Confidence Score</span>
                          <span className="font-bold text-2xl text-green-600">{aiScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${aiScore}%` }}
                          ></div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          {aiScore >= 90 ? 'Excellent confidence: Asset documentation verified successfully' :
                           aiScore >= 80 ? 'Good confidence: Asset documentation appears authentic' :
                           'Moderate confidence: Some documentation may need review'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleAIVerification}
                  disabled={uploadedFiles.length === 0 || isProcessing}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    'Start AI Verification'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Mint */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Review & Mint Vault</h2>
              <p className="text-gray-600 mb-8">Review your verification results and mint your vault token</p>

              {/* Verification Summary */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="font-semibold">AI Verified</h3>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">{aiScore}%</div>
                  <div className="text-sm text-gray-600">Confidence Score</div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-3">
                    <Shield className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="font-semibold">Chainlink PoR</h3>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">✓</div>
                  <div className="text-sm text-gray-600">Reserve Verified</div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center mb-3">
                    <Zap className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="font-semibold">Ready to Mint</h3>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">NFT</div>
                  <div className="text-sm text-gray-600">ERC-721 Token</div>
                </div>
              </div>

              {/* Asset Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Asset Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Asset Name</div>
                    <div className="font-medium">{assetName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Asset Type</div>
                    <div className="font-medium capitalize">{assetType.replace('-', ' ')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Files Uploaded</div>
                    <div className="font-medium">{uploadedFiles.length} documents</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Network</div>
                    <div className="font-medium">Ethereum Mainnet</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-600">Description</div>
                  <div className="font-medium">{assetDescription}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleMintVault}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Minting...
                    </>
                  ) : (
                    'Mint Vault Token'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Vault Created Successfully!"
        message="Your asset has been tokenized and your vault is now live on the blockchain"
        tokenId="12847"
        transactionHash="0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890"
        primaryAction={{
          label: "View in Dashboard",
          onClick: () => window.location.href = '/dashboard'
        }}
        secondaryAction={{
          label: "Bridge to Another Chain",
          onClick: () => window.location.href = '/bridge'
        }}
      />
    </div>
  );
};

export default CreateVaultPage;