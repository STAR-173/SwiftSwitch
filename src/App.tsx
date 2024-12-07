import React, { useState, useEffect } from 'react';
import { EndpointForm } from './components/EndpointForm';
import { ConfigViewer } from './components/ConfigViewer';
import { ResponseViewer } from './components/ResponseViewer';
import { ApiEndpoint, ApiGatewayConfig, ApiResponse } from './types/config';
import { parseYamlConfig } from './utils/yaml';
import { queryEndpoints } from './utils/api';
import { FileText, Play } from 'lucide-react';
import { updateServerConfig } from './utils/server';

function App() {
  const [config, setConfig] = useState<ApiGatewayConfig>({ apiEndpoints: [] });
  const [response, setResponse] = useState<ApiResponse | null>(null);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('apiGatewayConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        updateServerConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load saved configuration');
      }
    }
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('apiGatewayConfig', JSON.stringify(config));
    updateServerConfig(config);
  }, [config]);

  const handleAddEndpoint = (endpoint: ApiEndpoint) => {
    setConfig(prev => ({
      ...prev,
      apiEndpoints: [...prev.apiEndpoints, endpoint],
    }));
  };

  const handleTestEndpoints = async () => {
    try {
      const result = await queryEndpoints(config.apiEndpoints);
      setResponse(result);
    } catch (error) {
      setResponse({
        status: 'error',
        data: null,
        timestamp: new Date().toISOString(),
        error: 'Failed to test endpoints',
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedConfig = parseYamlConfig(content);
          setConfig(parsedConfig);
        } catch (error) {
          setResponse({
            status: 'error',
            data: null,
            timestamp: new Date().toISOString(),
            error: 'Failed to parse configuration file',
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Add Endpoint</h2>
              <EndpointForm onSubmit={handleAddEndpoint} />
              
              <div className="mt-6">
                <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Config
                  <input
                    type="file"
                    accept=".yaml,.yml"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <ConfigViewer config={config} />
              
              <button
                onClick={handleTestEndpoints}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Play className="mr-2 h-4 w-4" />
                Test Endpoints
              </button>

              <ResponseViewer response={response} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;