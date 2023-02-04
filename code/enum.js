import { toCamelCase } from '../util.js';

export const enumCode = (name) =>
  `export enum ${toCamelCase(name)} {};
`;
