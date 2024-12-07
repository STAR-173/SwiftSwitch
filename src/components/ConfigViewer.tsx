import React from 'react';
import { Eye, Download } from 'lucide-react';
import { ApiGatewayConfig } from '../types/config';
import { downloadYamlConfig } from '../utils/file';
import { generateYamlConfig } from '../utils/yaml';

interface ConfigViewerProps {
  config: ApiGatewayConfig;
}

export function ConfigViewer({ config }: ConfigViewerProps) {
  const handleDownload = () => {
    downloadYamlConfig(config);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Eye className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Configuration Preview</h3>
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Download className="h-4 w-4 mr-1" />
          Download YAML
        </button>
      </div>
      <pre className="bg-white p-4 rounded-md overflow-auto">
        {generateYamlConfig(config)}
      </pre>
    </div>
  );
}