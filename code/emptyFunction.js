import { toCamelCase } from '../util.js';

export const emptyFunctionCode = (name) =>
  `export const ${toCamelCase(name)} = () => {};
`;
