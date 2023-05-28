import { TemplateTestOptions } from '../models/index.js';

export const TemplateTest = ({ name, type }: TemplateTestOptions) =>
  `describe('${name} ${type}', () => {

});
`;
