import React from 'react';
import { ApiResponse } from '../types/config';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ResponseViewerProps {
  response: ApiResponse | null;
}

export function ResponseViewer({ response }: ResponseViewerProps) {
  if (!response) return null;

  const isError = response.status === 'error';

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        {isError ? (
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        ) : (
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
        )}
        <h3 className="text-lg font-medium text-gray-900">Response</h3>
      </div>
      <pre className={`p-4 rounded-md overflow-auto ${
        isError ? 'bg-red-50' : 'bg-gray-50'
      }`}>
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}