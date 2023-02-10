import { capitalize } from '../util.js';

export const TemplateEmptyComponentCode = (name, isCssOption) =>
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

export const TemplateComponentCode = (name, isCssOption) =>
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
