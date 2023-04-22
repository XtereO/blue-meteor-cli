import { capitalize } from '../utils/index.js';

export const TemplateTypeCode = (name: string) =>
  `export type ${capitalize(name)} = unknown;
`;
