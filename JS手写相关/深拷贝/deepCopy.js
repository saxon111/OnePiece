const deepCopy = (source) => {
  if (typeof source === "object") {
    const res = Array.isArray(source) ? [] : {};
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        res[key] =
          typeof source[key] === "object" ? deepCopy(source[key]) : source[key];
      }
    }
    return res;
  }
  return source;
};
