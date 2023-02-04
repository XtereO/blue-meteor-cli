import { capitalize } from '../util.js';

export const TemplateEmptyComponentCode = (name) =>
  `import { memo } from 'react';

export const ${capitalize(name)} = memo(() => {
  return <></>;
});
`;

export const TemplateComponentCode = (name) =>
  `import { memo } from 'react';

type Props = {};

export const ${capitalize(name)} = memo<Props>(({}) => {
  return <></>;
});
`;
