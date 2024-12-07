import axios, { AxiosError } from 'axios';
import { ApiEndpoint, ApiResponse } from '../types/config';
import { format } from 'date-fns';
import { EndpointError } from './errors';

export async function queryEndpoints(endpoints: ApiEndpoint[]): Promise<ApiResponse> {
  const sortedEndpoints = [...endpoints].sort((a, b) => a.priority - b.priority);
  const errors: EndpointError[] = [];

  for (const endpoint of sortedEndpoints) {
    try {
      const response = await axios.get(endpoint.url);
      return formatResponse(response.data, endpoint.fieldMappings);
    } catch (error) {
      const errorMessage = error instanceof AxiosError 
        ? error.message 
        : 'Unknown error occurred';
      errors.push(new EndpointError(errorMessage, endpoint.url));
      continue;
    }
  }

  return {
    status: 'error',
    data: null,
    timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    error: 'All endpoints failed',
  };
}

function formatResponse(data: any, fieldMappings: Record<string, string>): ApiResponse {
  try {
    const formattedData: any = {};

    for (const [targetField, sourceField] of Object.entries(fieldMappings)) {
      const value = sourceField.split('.').reduce((obj, key) => obj?.[key], data);
      formattedData[targetField] = value;
    }

    return {
      status: 'success',
      data: formattedData,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
  } catch (error) {
    return {
      status: 'error',
      data: null,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      error: 'Failed to format response data',
    };
  }
}