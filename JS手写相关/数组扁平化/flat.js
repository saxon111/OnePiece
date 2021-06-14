const flat = (arr) => {
  return arr.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? flat(curr) : curr);
  }, []);
};

// 如果指定深度

const flatWithDeep = (arr, deep = 1) => {
  return arr.reduce((prev, curr) => {
    return prev.concat(
      Array.isArray(curr) && deep > 1 ? flatWithDeep(curr, deep - 1) : curr
    );
  }, []);
};
