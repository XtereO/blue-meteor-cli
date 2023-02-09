import { capitalize } from '../util.js';

export const typeCode = (name) =>
  `export type ${capitalize(name)} = unknown;
`;
