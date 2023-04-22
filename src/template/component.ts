import { capitalize } from '../utils/index.js';

export const TemplateEmptyComponentCode = (
  name: string,
  isCssOption: boolean
) =>
  `import { memo } from 'react';
${
  isCssOption
    ? `import { containerStyle } from './${capitalize(name)}.css';`
    : ''
}

export const ${capitalize(name)} = memo(() => {
  return <div${isCssOption ? ' className={containerStyle}' : ''}></div>;
});
`;

export const TemplateComponentCode = (name: string, isCssOption: boolean) =>
  `import { memo } from 'react';
${
  isCssOption
    ? `import { containerStyle } from './${capitalize(name)}.css';`
    : ''
}

type Props = {};

export const ${capitalize(name)} = memo<Props>(({}) => {
  return <div${isCssOption ? ' className={containerStyle}' : ''}></div>;
});
`;
