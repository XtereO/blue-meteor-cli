export const capitalize = (name) => {
  return name
    .replace(/_/g, '-')
    .split('-')
    .map((n) => `${n[0].toUpperCase()}${n.slice(1)}`)
    .join('');
};
const rS = (a) => a.replace(/(\n|\r|\s)/, '');
export const sortStrings = (arr, mapAttr) => {
  if (!mapAttr) {
    arr.sort((a, b) =>
      rS(a) > rS(b) && rS(a).split('.').length === rS(b).split('.').length
        ? 1
        : -1
    );
  } else {
    arr.sort((a, b) =>
      rS(mapAttr(a)).split('./').length === rS(mapAttr(b)).split('./').length
        ? rS(mapAttr(a)) > rS(mapAttr(b))
          ? 1
          : -1
        : rS(mapAttr(a)).split('./').length > rS(mapAttr(b)).split('./').length
        ? 1
        : -1
    );
  }
};

export const toCamelCase = (name) => {
  return name
    .replace(/_/g, '-')
    .split('-')
    .map((n, nId) => (nId === 0 ? n : `${n[0].toUpperCase()}${n.slice(1)}`))
    .join('');
};
