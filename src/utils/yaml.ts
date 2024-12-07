import yaml from 'js-yaml';
import { ApiGatewayConfig } from '../types/config';

export function parseYamlConfig(yamlContent: string): ApiGatewayConfig {
  try {
    return yaml.load(yamlContent) as ApiGatewayConfig;
  } catch (error) {
    console.error('Error parsing YAML:', error);
    throw new Error('Invalid YAML configuration');
  }
}

export function generateYamlConfig(config: ApiGatewayConfig): string {
  try {
    return yaml.dump(config);
  } catch (error) {
    console.error('Error generating YAML:', error);
    throw new Error('Failed to generate YAML configuration');
  }
}