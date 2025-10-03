import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Trophy, Star, CheckCircle } from 'lucide-react';

export type OnboardingData = {
  username: string;
  location: string;
  preferredArts: string[];
  skillLevel: string;
};

type OnboardingFlowProps = {
  onComplete: (data: OnboardingData) => void;
};

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<OnboardingData>({
    username: '',
    location: '',
    preferredArts: [],
    skillLevel: ''
  });

  const martialArts = [
    'Boxing',
    'Muay Thai',
    'Brazilian Jiu-Jitsu',
    'Karate',
    'Taekwondo',
    'MMA',
    'Kickboxing',
    'Judo',
    'Wrestling',
    'Krav Maga'
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', description: '0-6 months' },
    { value: 'novice', label: 'Novice', description: '6 months - 2 years' },
    { value: 'intermediate', label: 'Intermediate', description: '2-5 years' },
    { value: 'advanced', label: 'Advanced', description: '5-10 years' },
    { value: 'expert', label: 'Expert', description: '10+ years' }
  ];

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, location: e.target.value }));
  };

  const toggleMartialArt = (art: string) => {
    setFormData(prev => {
      const exists = prev.preferredArts.includes(art);
      return {
        ...prev,
        preferredArts: exists ? prev.preferredArts.filter(a => a !== art) : [...prev.preferredArts, art]
      };
    });
  };

  const handleSkillLevel = (level: string) => {
    setFormData(prev => ({ ...prev, skillLevel: level }));
  };

  const nextStep = () => setCurrentStep(s => Math.min(4, s + 1));
  const prevStep = () => setCurrentStep(s => Math.max(1, s - 1));
  const handleComplete = () => onComplete(formData);

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.username.trim().length >= 3;
      case 2: return formData.location.trim().length > 0;
      case 3: return formData.preferredArts.length > 0;
      case 4: return formData.skillLevel !== '';
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Choose a username</h2>
              <p className="text-gray-300">This will be visible to the community</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="e.g. iron_fist_23"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
              />
              <p className="text-xs text-gray-400">3+ characters, letters, numbers, underscores</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Where are you located?</h2>
              <p className="text-gray-300">Help us find gyms and training partners near you</p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your city"
                value={formData.location}
                onChange={handleLocationChange}
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">What martial arts interest you?</h2>
              <p className="text-gray-300">Select all that apply - you can always change this later</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {martialArts.map((art) => (
                <button
                  key={art}
                  onClick={() => toggleMartialArt(art)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    formData.preferredArts.includes(art)
                      ? 'border-pink-500 bg-pink-500/20 text-white'
                      : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-pink-400 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{art}</span>
                    {formData.preferredArts.includes(art) && (
                      <CheckCircle className="w-5 h-5 text-pink-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">What's your experience level?</h2>
              <p className="text-gray-300">This helps us recommend appropriate training partners</p>
            </div>

            <div className="space-y-3">
              {skillLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => handleSkillLevel(level.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    formData.skillLevel === level.value
                      ? 'border-pink-500 bg-pink-500/20 text-white'
                      : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-pink-400 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-sm text-gray-400">{level.description}</div>
                    </div>
                    {formData.skillLevel === level.value && (
                      <CheckCircle className="w-5 h-5 text-pink-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background Energy Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="w-full max-w-2xl mx-auto relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400">Step {currentStep} of 4</span>
            <span className="text-sm font-medium text-gray-400">{Math.round((currentStep / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 shadow-2xl">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-gradient-to-r from-pink-500 to-red-500'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={currentStep === 4 ? handleComplete : nextStep}
              disabled={!isStepValid()}
              className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                isStepValid()
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 shadow-lg'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === 4 ? 'Complete Setup' : 'Next'}
              {currentStep < 4 && <ChevronRight className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
            Welcome to Sparnet
          </h1>
          <p className="text-gray-400">Let's set up your martial arts profile</p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
