export const toPlainObject = <T>(data: T): T => {
  if (
    data &&
    typeof data === "object" &&
    "toObject" in data &&
    typeof data.toObject == "function"
  ) {
    return data.toObject();
  }
  return data;
};
