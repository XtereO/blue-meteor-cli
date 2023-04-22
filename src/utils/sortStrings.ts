const rS = (str: string) => str.replace(/(\n|\r|\s)/, '');
export const sortStrings = (arr: string[], mapAttr?: (s: string) => string) => {
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
