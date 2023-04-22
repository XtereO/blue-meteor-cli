export const capitalize = (str: string) => {
  return str
    .replace(/_/g, '-')
    .split('-')
    .map((n) => `${n[0].toUpperCase()}${n.slice(1)}`)
    .join('');
};
