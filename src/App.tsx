import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, Map, Settings } from 'lucide-react';
import { ModelManager } from './utils/modelLoader';
import { LocationService } from './utils/locationService';
import { ShakeDetector } from './utils/shakeDetector';
import { AuthForm } from './components/AuthForm';
import { EmergencyContacts } from './components/EmergencyContacts';

function App() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const locationService = LocationService.getInstance();
    const shakeDetector = ShakeDetector.getInstance();
    const modelManager = ModelManager.getInstance();

    const init = async () => {
      try {
        locationService.startWatchingLocation((position) => {
          setLocation(position);
        });

        shakeDetector.onShake(() => {
          triggerEmergencyAlert('shake');
        });
        shakeDetector.start();

        await modelManager.loadModel('/models/safety-model.json', 'https://api.safecircle.com/predict');
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    init();

    return () => {
      shakeDetector.stop();
    };
  }, [isAuthenticated]);

  const handleAuth = (email: string, name: string) => {
    // In a real app, this would communicate with your backend
    setIsAuthenticated(true);
  };

  const triggerEmergencyAlert = async (type: 'button' | 'shake' | 'offline') => {
    setIsEmergency(true);
    // Implementation for sending alerts will go here
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#67DD00] to-[#000000] flex items-center justify-center p-4">
        <AuthForm onSubmit={handleAuth} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#67DD00] to-[#000000]">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white">SafeCircle</h1>
        </div>
        <Settings className="w-6 h-6 text-white" />
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <button
            onClick={() => triggerEmergencyAlert('button')}
            className={`w-full py-6 rounded-xl text-white text-xl font-bold transition-all ${
              isEmergency
                ? 'bg-red-600 animate-pulse'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isEmergency ? 'ALERT SENT' : 'EMERGENCY ALERT'}
          </button>
        </div>

        <EmergencyContacts />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-[#8DF6F6]" />
              <h2 className="text-lg font-semibold">Nearby Hotspots</h2>
            </div>
            <div className="space-y-2">
              {/* Hotspots list will go here */}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Map className="w-6 h-6 text-[#8DF6F6]" />
              <h2 className="text-lg font-semibold">Safe Routes</h2>
            </div>
            <div className="h-48 bg-gray-100 rounded-lg">
              {/* Map component will go here */}
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 p-4">
        <div className="text-center text-sm text-gray-600">
          {location ? (
            <p>Location tracking active</p>
          ) : (
            <p>Enabling location services...</p>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;