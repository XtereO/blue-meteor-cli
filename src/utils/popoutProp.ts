import { sortStrings } from './sortStrings.js';

export const addPopoutProp = (code: string, popoutCapitalized: string) => {
  const indexStart = code.lastIndexOf('{') + 1;
  const indexEnd = code.lastIndexOf('}');
  const popouts = code
    .slice(indexStart, indexEnd)
    .replace(/(\n|\s|\r)/g, '')
    .split(',')
    .filter((p) => !!p);
  popouts.push(
    `[PopoutRoute.${popoutCapitalized}]: <${popoutCapitalized}Popout />`
  );
  sortStrings(popouts);

  return `${code.slice(0, indexStart)}${popouts.join(',')}${code.slice(
    indexEnd
  )}`;
};
export const removePopoutProp = (code: string, popoutCapitalized: string) => {
  const indexStart = code.lastIndexOf('{') + 1;
  const indexEnd = code.lastIndexOf('}');
  const popouts = code
    .slice(indexStart, indexEnd)
    .replace(/(\n|\s|\r)/g, '')
    .split(',')
    .filter((p) => !!p)
    .filter(
      (p) =>
        p !== `[PopoutRoute.${popoutCapitalized}]:<${popoutCapitalized}Popout/>`
    );
  sortStrings(popouts);

  return `${code.slice(0, indexStart)}${popouts.join(',')}${code.slice(
    indexEnd
  )}`;
};
