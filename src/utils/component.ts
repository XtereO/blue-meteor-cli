import { sortStrings } from './sortStrings.js';

const getStartIndex = (code: string, componentName: string) => {
  let cLA = 1;
  let cRA = 0;
  const startId =
    code.indexOf(`<${componentName}`) + `<${componentName}`.length;
  let i = startId;
  while (cLA !== cRA) {
    if (code[i] === '<') cLA++;
    if (code[i] === '>') cRA++;
    i++;
  }
  return i;
};
export const addComponent = (
  code: string,
  newComponent: string,
  parentComponentName: string
) => {
  const start = getStartIndex(code, parentComponentName);
  const end = code.indexOf(`</${parentComponentName}>`);
  const components = code.slice(start, end);
  const matches: string[] = components.match(/<[^<]*\/\>/g) ?? [];
  matches.push(newComponent);
  sortStrings(matches);
  const sortedComponents = matches.join('');

  return `${code.slice(0, start)}${sortedComponents}${code.slice(end)}`;
};

export const removeComponent = (
  code: string,
  newComponent: string,
  parentComponentName: string
) => {
  const start = getStartIndex(code, parentComponentName);
  const end = code.indexOf(`</${parentComponentName}>`);
  const components = code.slice(start, end);
  const matches = (components.match(/<[^<]*\/\>/g) ?? []).filter(
    (c) => c.match(new RegExp(`<${newComponent}[^<]*\/\>`)) === null
  );
  sortStrings(matches);
  const sortedComponents = matches.join('');

  return `${code.slice(0, start)}${sortedComponents}${code.slice(end)}`;
};
