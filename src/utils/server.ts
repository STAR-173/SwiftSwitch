import axios from 'axios';
import { ApiGatewayConfig } from '../types/config';

const API_URL = 'http://localhost:5173/api';

export async function updateServerConfig(config: ApiGatewayConfig): Promise<void> {
  try {
    await axios.post(`${API_URL}/config`, config);
  } catch (error) {
    console.error('Failed to update server configuration:', error);
  }
}

export async function getGatewayResponse() {
  try {
    const response = await axios.get(`${API_URL}/gateway`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get gateway response');
  }
}