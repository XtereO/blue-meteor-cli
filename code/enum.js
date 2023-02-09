import { capitalize } from '../util.js';

export const enumCode = (name) =>
  `export enum ${capitalize(name)} {};
`;
