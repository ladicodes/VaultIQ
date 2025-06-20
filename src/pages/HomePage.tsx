import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Brain, Link as LinkIcon, Globe, Zap, CheckCircle, ArrowRight, Users, TrendingUp, Award } from 'lucide-react';
import { FloatingAssets, AIBrain, ChainlinkOrbs, DataStream } from '../components/AnimatedIcon';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Verification',
      description: 'Advanced AI models verify asset documentation and visual proofs with 99.9% accuracy',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Chainlink Proof of Reserve',
      description: 'Cryptographic proof that your tokenized assets are backed by real-world value',
      color: 'blue'
    },
    {
      icon: LinkIcon,
      title: 'Cross-Chain Bridging',
      description: 'Move your tokenized assets across multiple blockchains using Chainlink CCIP',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Real-Time Pricing',
      description: 'Dynamic asset valuation powered by Chainlink Data Feeds and market oracles',
      color: 'yellow'
    }
  ];

  const stats = [
    { label: 'Assets Tokenized', value: '$2.4B+', icon: TrendingUp },
    { label: 'AI Verifications', value: '150K+', icon: Brain },
    { label: 'Cross-Chain Transfers', value: '45K+', icon: LinkIcon },
    { label: 'Success Rate', value: '99.9%', icon: Award }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Real Estate Investor',
      content: 'VaultAI made tokenizing my property portfolio incredibly simple. The AI verification gave me confidence in the process.',
      avatar: '👩‍💼'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Art Collector',
      content: 'The cross-chain capabilities are game-changing. I can now trade my tokenized art across multiple platforms.',
      avatar: '👨‍🎨'
    },
    {
      name: 'David Kim',
      role: 'Equipment Dealer',
      content: 'Proof of Reserve integration ensures my clients trust the tokenization process. Brilliant platform.',
      avatar: '👨‍💻'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingAssets className="absolute top-20 left-10 opacity-20" delay={0} />
        <AIBrain className="absolute top-32 right-20 opacity-15" delay={500} />
        <ChainlinkOrbs className="absolute top-64 left-1/4 opacity-10" delay={1000} />
        <DataStream className="absolute top-40 right-1/3 opacity-20" delay={1500} />
        <FloatingAssets className="absolute bottom-40 right-10 opacity-15" delay={2000} />
        <AIBrain className="absolute bottom-20 left-1/3 opacity-10" delay={2500} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6 animate-fade-in">
              <Globe className="h-4 w-4 mr-2" />
              Powered by Chainlink & ElizaOS
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-slide-up">
              AI-Verified
              <br />
              Tokenized Assets
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 animate-slide-up-delay">
              Transform real-world assets into secure, verifiable digital tokens with AI-powered validation and cross-chain capabilities
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up-delay-2">
            <Link
              to="/create"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Tokenizing
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/dashboard"
              className="group inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all border border-gray-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Dashboard
              <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </Link>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full mb-3 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="h-6 w-6 text-blue-600 group-hover:text-purple-600 transition-colors" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm sm:text-base group-hover:text-gray-800 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Action Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Animations */}
      <section className="py-24 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Next-Generation Asset Tokenization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
              Combining AI verification, blockchain security, and cross-chain interoperability for the future of asset ownership
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-6 relative">
                  <div className={`inline-flex p-3 bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 text-${feature.color}-600 group-hover:animate-pulse`} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with Process Animation */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple three-step process to tokenize your real-world assets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
            </div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-green-300 transform -translate-y-1/2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-green-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {[
              {
                step: '01',
                title: 'Upload & Verify',
                description: 'Upload your asset documentation and photos. Our AI verifies authenticity and generates risk scores.',
                icon: Brain,
                color: 'blue'
              },
              {
                step: '02',
                title: 'Mint Vault Token',
                description: 'Create a unique NFT representing your verified asset with Chainlink Proof of Reserve backing.',
                icon: Shield,
                color: 'purple'
              },
              {
                step: '03',
                title: 'Bridge & Trade',
                description: 'Move your tokens across chains using CCIP and trade on multiple DeFi platforms.',
                icon: LinkIcon,
                color: 'green'
              }
            ].map((step, index) => (
              <div key={index} className="text-center group relative">
                <div className="mb-8">
                  <div className="relative inline-block">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-${step.color}-600 to-${step.color}-700 rounded-full text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                      {step.step}
                      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                    <div className="absolute -inset-2 rounded-full border-2 border-transparent group-hover:border-blue-300 transition-all duration-300 animate-pulse opacity-0 group-hover:opacity-100"></div>
                  </div>
                  <div className={`inline-flex p-3 bg-${step.color}-100 rounded-xl group-hover:bg-${step.color}-200 transition-all duration-300 group-hover:scale-105`}>
                    <step.icon className={`h-8 w-8 text-${step.color}-600 group-hover:animate-bounce`} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Asset Owners Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users say about their tokenization experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                        {testimonial.avatar}
                      </span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic group-hover:text-gray-700 transition-colors">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex text-yellow-400 group-hover:text-yellow-500 transition-colors">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className="animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Tokenize Your Assets?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-fade-in-delay">
            Join thousands of users who trust VaultAI for secure, AI-verified asset tokenization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay">
            <Link
              to="/create"
              className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              <CheckCircle className="mr-2 h-5 w-5 group-hover:text-green-600 transition-colors" />
              Start Your First Vault
              <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </Link>
            <Link
              to="/dashboard"
              className="group inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl hover:bg-white/10 transition-all border border-white/20 hover:border-white/40 transform hover:scale-105"
            >
              Explore Platform
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;