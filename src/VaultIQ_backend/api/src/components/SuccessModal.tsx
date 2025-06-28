import React from 'react';
import { CheckCircle, X, ExternalLink, ArrowRight } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  tokenId?: string;
  transactionHash?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  tokenId,
  transactionHash,
  primaryAction,
  secondaryAction
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{message}</p>
        </div>

        {(tokenId || transactionHash) && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            {tokenId && (
              <div>
                <div className="text-sm text-gray-600 mb-1">Token ID</div>
                <div className="font-mono text-lg font-bold text-gray-900">#{tokenId}</div>
              </div>
            )}
            {transactionHash && (
              <div>
                <div className="text-sm text-gray-600 mb-1">Transaction Hash</div>
                <div className="flex items-center">
                  <div className="font-mono text-sm text-blue-600 truncate mr-2">
                    {transactionHash}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              {primaryAction.label}
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;