export type RemoveOption = {
  remove?: boolean;
};
export type CssOption = {
  css?: boolean;
};
export type TestOption = {
  test?: boolean;
};
export type BaseOptions = Partial<RemoveOption & CssOption & TestOption>;
