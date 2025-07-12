export const isLiteralObject = (a: unknown) => {
  return !!a && a.constructor === Object;
};
