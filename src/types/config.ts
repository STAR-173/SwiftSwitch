export interface FieldMapping {
  [key: string]: string;
}

export interface ApiEndpoint {
  url: string;
  priority: number;
  fieldMappings: FieldMapping;
}

export interface ApiGatewayConfig {
  apiEndpoints: ApiEndpoint[];
}

export interface ApiResponse {
  status: string;
  data: any;
  timestamp: string;
  error?: string;
}

export interface ApiError {
  message: string;
  endpoint: string;
}