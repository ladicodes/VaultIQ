import React from 'react';

interface AnimatedIconProps {
  className?: string;
  delay?: number;
}

export const FloatingAssets: React.FC<AnimatedIconProps> = ({ className = '', delay = 0 }) => (
  <div className={`relative ${className}`} style={{ animationDelay: `${delay}ms` }}>
    <div className="animate-float">
      <div className="relative">
        {/* House */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg animate-bounce-slow">
          <div className="absolute inset-2 bg-white rounded opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">🏠</div>
        </div>
        
        {/* Car */}
        <div className="absolute top-20 left-20 w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-2 bg-white rounded opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl">🚗</div>
        </div>
        
        {/* Art */}
        <div className="absolute top-10 left-40 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg animate-bounce-slow" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-2 bg-white rounded opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg">🎨</div>
        </div>
        
        {/* Diamond */}
        <div className="absolute top-32 left-8 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg animate-bounce-slow" style={{ animationDelay: '1.5s' }}>
          <div className="absolute inset-2 bg-white rounded opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">💎</div>
        </div>
      </div>
    </div>
  </div>
);

export const AIBrain: React.FC<AnimatedIconProps> = ({ className = '', delay = 0 }) => (
  <div className={`relative ${className}`} style={{ animationDelay: `${delay}ms` }}>
    <div className="animate-pulse-glow">
      <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-2xl">
        <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full animate-spin-slow">
          <div className="absolute inset-2 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl animate-bounce">
              🧠
            </div>
          </div>
        </div>
        {/* Neural network lines */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-3 left-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

export const ChainlinkOrbs: React.FC<AnimatedIconProps> = ({ className = '', delay = 0 }) => (
  <div className={`relative ${className}`} style={{ animationDelay: `${delay}ms` }}>
    <div className="animate-orbit">
      <div className="relative w-32 h-32">
        {/* Center orb */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg animate-pulse">
          <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
        </div>
        
        {/* Orbiting elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-md animate-spin-reverse">
          <div className="absolute inset-0.5 bg-white rounded-full opacity-40"></div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-md animate-spin-reverse" style={{ animationDelay: '1s' }}>
          <div className="absolute inset-0.5 bg-white rounded-full opacity-40"></div>
        </div>
        
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-md animate-spin-reverse" style={{ animationDelay: '2s' }}>
          <div className="absolute inset-0.5 bg-white rounded-full opacity-40"></div>
        </div>
        
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-md animate-spin-reverse" style={{ animationDelay: '3s' }}>
          <div className="absolute inset-0.5 bg-white rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  </div>
);

export const DataStream: React.FC<AnimatedIconProps> = ({ className = '', delay = 0 }) => (
  <div className={`relative ${className}`} style={{ animationDelay: `${delay}ms` }}>
    <div className="relative w-20 h-32 overflow-hidden">
      {/* Flowing data particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-flow-up opacity-70"
          style={{
            left: `${20 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: '2s'
          }}
        ></div>
      ))}
      
      {/* Base */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full shadow-lg">
        <div className="absolute inset-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);