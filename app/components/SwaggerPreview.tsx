import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import YAML from 'yaml';

type Props = {
  yaml: string;
};

export default function SwaggerPreview({ yaml }: Props) {
  let spec;
  try {
    spec = YAML.parse(yaml);
  } catch {
    spec = null;
  }

  return spec ? <SwaggerUI spec={spec} /> : <p className="p-4">Invalid OpenAPI spec.</p>;
}
