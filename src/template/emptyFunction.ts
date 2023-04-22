import { toCamelCase } from '../utils/index.js';

export const TemplateEmptyFunctionCode = (name: string) =>
  `export const ${toCamelCase(name)} = () => {};
`;
