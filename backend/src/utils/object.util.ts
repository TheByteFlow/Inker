type HasToObject = {
  toObject: () => Record<string, unknown>;
};

export const toPlainObject = (data: unknown): Record<string, unknown> => {
  if (
    data &&
    typeof data === "object" &&
    "toObject" in data &&
    typeof (data as HasToObject).toObject == "function"
  ) {
    return (data as HasToObject).toObject();
  }
  return data as Record<string, unknown>;
};

export const omitFields = <
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};
