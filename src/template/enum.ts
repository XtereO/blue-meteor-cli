import { capitalize } from '../utils/index.js';

export const TemplateEnumCode = (name: string) =>
  `export enum ${capitalize(name)} {};
`;
