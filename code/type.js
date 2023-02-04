import { toCamelCase } from '../util.js';

export const typeCode = (name) =>
  `export type ${toCamelCase(name)} = unknown;
`;
