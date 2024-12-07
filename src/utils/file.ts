import { saveAs } from 'file-saver';
import { generateYamlConfig } from './yaml';
import { ApiGatewayConfig } from '../types/config';

export function downloadYamlConfig(config: ApiGatewayConfig) {
  const yamlContent = generateYamlConfig(config);
  const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8' });
  saveAs(blob, 'api-gateway-config.yaml');
}