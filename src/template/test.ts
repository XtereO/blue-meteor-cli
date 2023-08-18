import { TemplateTestOptions } from '../models/index.js';

export const TemplateTest = ({
  name,
  type,
  beforeCode,
  afterCode,
}: TemplateTestOptions) =>
  `${beforeCode ?? ''}
  
describe('${name} ${type}', () => {
${afterCode ?? ''}
});
`;

export const TemplateModuleTest = (name: string) => {
  return TemplateTest({
    name,
    type: 'module',
    beforeCode: `import { createGetState, createGetStateProp } from '@core/utils';
import { ${name}Events } from './events';
import { $${name} } from './store';

const getState = createGetState($${name});
const getStateProp = createGetStateProp($${name});
`,
    afterCode: `  beforeEach(() => {
    ${name}Events.setDefaultState();
  });`,
  });
};
