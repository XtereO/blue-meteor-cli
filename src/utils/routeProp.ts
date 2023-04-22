import { RouteKeys } from '../models/index.js';
import { capitalize } from './capitalize.js';
import { sortStrings } from './sortStrings.js';

export const addRouteProp = (
  code: string,
  routeType: RouteKeys,
  routeValue: string
) => {
  const routeTypeCapitalized = capitalize(routeType);
  const indexStart =
    code.indexOf(`${routeTypeCapitalized}Route`) +
    `${routeTypeCapitalized}Route`.length;
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

export const removeRouteProp = (
  code: string,
  routeType: RouteKeys,
  routeValue: string
) => {
  const routeTypeCapitalized = capitalize(routeType);
  const indexStart =
    code.indexOf(`${routeTypeCapitalized}Route`) +
    `${routeTypeCapitalized}Route`.length;
  const codeEnd = code.slice(indexStart);
  const routes = codeEnd.match(/{[^{}]*}/g);
  const indexEnd = indexStart + (routes ? routes[0].length : 0);
  const firstRoute = routes
    ? routes[0]
        .replace(/({|}|\r|\n|\s)/g, '')
        .split(',')
        .filter(
          (r) =>
            r.match(new RegExp(`${routeValue}=('|")[^('|")]*('|")`)) === null
        )
    : [];
  if (!firstRoute[firstRoute.length - 1]) {
    firstRoute.pop();
  }
  sortStrings(firstRoute);

  return `${code.slice(0, indexStart)} {${firstRoute.join(',')}} ${code.slice(
    indexEnd + 1
  )}`;
};
