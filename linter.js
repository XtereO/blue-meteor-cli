import { exec } from 'child_process';
import { sortStrings } from './util.js';

export const lint = (...paths) => {
  paths.forEach((path) =>
    exec(`npx prettier --write ${path}`, () => {
      console.log(`formated file ${path}`);
    })
  );
};

const lastWord = (str) => {
  return str.split(' ')[str.split(' ').length - 1];
};

export const addImport = (code, newImport, isImport = true) => {
  let matches =
    code.match(
      /(import|export) ({[^{}]*}|\w+|[^\w]) from ("[^"]*"|'[^']*')/g
    ) ?? [];
  const codeStart =
    code.indexOf(matches[matches.length - 1]) +
    (matches[matches.length - 1] ? matches[matches.length - 1].length : 0);
  matches = matches.reduce((acc, a) => {
    if (lastWord(a).replace(/('|")/g, '') === newImport.from) {
      const newWhat = a
        .match(/{[^{}]*}/g)[0]
        .replace(/({|})/g, '')
        .split(',');
      newWhat.push(newImport.what.replace(/({|})/g, ''));
      sortStrings(newWhat);
      acc.push(a.replace(/{[^{}]*}/g, `{ ${newWhat.join(', ')} }`));
    } else {
      acc.push(a);
    }
    return acc;
  }, []);
  if (
    !matches.some((m) => lastWord(m).replace(/('|")/g, '') === newImport.from)
  ) {
    matches.push(
      `${isImport ? 'import' : 'export'} ${newImport.what} from '${
        newImport.from
      }'`
    );
  }
  sortStrings(matches, lastWord);
  const sortedImports = matches.join(';');

  return `${sortedImports}${code.slice(codeStart)}`;
};
export const rmImport = (code, newImport) => {
  let matches =
    code.match(
      new RegExp(
        `(import|export) ({[^{]*}|\w+|[^\w]) from ("${newImport.from}"|'${newImport.from}')`,
        'g'
      )
    ) ?? [];
  const codeStart =
    code.indexOf(matches[matches.length - 1]) +
    (matches[matches.length - 1] ? matches[matches.length - 1].length : 0);
  const importStart = code.indexOf(matches[matches.length - 1]);
  if (matches.length > 0) {
    console.log(matches);
    matches = matches.reduce((acc, a) => {
      const newWhat = (a.match(/{[^{]*}/g) ? a.match(/{[^{]*}/g)[0] : '')
        .replace(/({|}|\s)/g, '')
        .split(',')
        .filter((w) => newImport.what.match(new RegExp(w)) === null);
      sortStrings(newWhat);
      if (newWhat.length > 0) {
        acc.push(a.replace(/{[^{}]*}/g, `{ ${newWhat.join(', ')} }`));
      }
      return acc;
    }, []);
  }
  sortStrings(matches, lastWord);
  matches.push('');
  const sortedImports = matches.join(';');

  return `${code.slice(0, importStart)}${sortedImports}${code.slice(
    codeStart
  )}`;
};

const getStartIndex = (code, componentName) => {
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
export const addComponent = (code, newComponent, parentComponentName) => {
  const start = getStartIndex(code, parentComponentName);
  const end = code.indexOf(`</${parentComponentName}>`);
  const components = code.slice(start, end);
  const matches = components.match(/<[^<]*\/\>/g) ?? [];
  matches.push(newComponent);
  sortStrings(matches);
  const sortedComponents = matches.join('');

  return `${code.slice(0, start)}${sortedComponents}${code.slice(end)}`;
};
export const rmComponent = (code, newComponent, parentComponentName) => {
  const start = getStartIndex(code, parentComponentName);
  const end = code.indexOf(`</${parentComponentName}>`);
  const components = code.slice(start, end);
  const matches = (components.match(/<[^<]*\/\>/g) ?? []).filter(
    (c) => c.match(new RegExp(`<${newComponent}[^<]*\/\>`)) === null
  );
  sortStrings(matches);
  console.log(matches);
  const sortedComponents = matches.join('');

  return `${code.slice(0, start)}${sortedComponents}${code.slice(end)}`;
};

export const addRoute = (code, routeType, routeValue) => {
  const indexStart =
    code.indexOf(`${routeType}Route`) + `${routeType}Route`.length;
  const codeEnd = code.slice(indexStart);
  const routes = codeEnd.match(/{[^{}]*}/g);
  const indexEnd = indexStart + (routes ? routes[0].length : 0);
  const firstRoute = routes
    ? routes[0].replace(/({|}|\r|\n|\s)/g, '').split(',')
    : [];
  if (!firstRoute[firstRoute.length - 1]) {
    firstRoute.pop();
  }
  firstRoute.push(`${routeValue} = '${routeValue}'`);
  sortStrings(firstRoute);

  return `${code.slice(0, indexStart)} {${firstRoute.join(',')}} ${code.slice(
    indexEnd + 1
  )}`;
};
export const removeRoute = (code, routeType, routeValue) => {
  const indexStart =
    code.indexOf(`${routeType}Route`) + `${routeType}Route`.length;
  const codeEnd = code.slice(indexStart);
  const routes = codeEnd.match(/{[^{}]*}/g);
  const indexEnd = indexStart + (routes ? routes[0].length : 0);
  console.log(routeValue, 'removeRoute');
  const firstRoute = routes
    ? routes[0]
        .replace(/({|}|\r|\n|\s)/g, '')
        .split(',')
        .filter(
          (r) =>
            r.match(new RegExp(`${routeValue}=('|")[^('|")]*('|")`)) === null
        )
    : [];
  console.log(firstRoute);
  if (!firstRoute[firstRoute.length - 1]) {
    firstRoute.pop();
  }
  sortStrings(firstRoute);

  return `${code.slice(0, indexStart)} {${firstRoute.join(',')}} ${code.slice(
    indexEnd + 1
  )}`;
};

export const addPopout = (code, popoutCapitalize) => {
  const indexStart = code.lastIndexOf('{') + 1;
  const indexEnd = code.lastIndexOf('}');
  const popouts = code
    .slice(indexStart, indexEnd)
    .replace(/(\n|\s|\r)/g, '')
    .split(',')
    .filter((p) => !!p);
  popouts.push(
    `[PopoutRoute.${popoutCapitalize}]: <${popoutCapitalize}Popout />`
  );
  sortStrings(popouts);

  return `${code.slice(0, indexStart)}${popouts.join(',')}${code.slice(
    indexEnd
  )}`;
};
