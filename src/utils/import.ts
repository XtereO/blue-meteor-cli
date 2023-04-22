import { lastWord } from './lastWord.js';
import { sortStrings } from './sortStrings.js';

export const addImport = (
  code: string,
  newImport: { from: string; what: string },
  isImport: boolean = true
) => {
  let matches: string[] =
    code.match(
      /(import|export) ({[^{}]*}|\w+|[^\w]) from ("[^"]*"|'[^']*')/g
    ) ?? [];
  const codeStart =
    code.indexOf(matches[matches.length - 1]) +
    (matches[matches.length - 1] ? matches[matches.length - 1].length : 0);
  matches = matches.reduce((acc: string[], a: string) => {
    if (lastWord(a).replace(/('|")/g, '') === newImport.from) {
      const m = a.match(/{[^{}]*}/g);
      const newWhat = m ? m[0].replace(/({|})/g, '').split(',') : [];
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

export const removeImport = (
  code: string,
  newImport: { what: string; from: string }
) => {
  let matches: string[] =
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
    matches = matches.reduce((acc: string[], a: string) => {
      const m = a.match(/{[^{]*}/g);
      const newWhat = (m ? m[0] : '')
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
