const useEmptyDataChecker = (data) => {
  if (data === null || data === undefined) {
    return true;
  }

  if (Array.isArray(data) || typeof data === "string") {
    return data.length === 0;
  }

  if (typeof data === "object") {
    return Object.keys(data).length === 0;
  }

  if (typeof data === "number") {
    return false;
  }

  return true;
};

export default useEmptyDataChecker;
