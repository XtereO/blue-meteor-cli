export const toCamelCase = (str: string) => {
  return str
    .replace(/_/g, '-')
    .split('-')
    .map((n, nId) => (nId === 0 ? n : `${n[0].toUpperCase()}${n.slice(1)}`))
    .join('');
};
