const instance_of = (L, R) => {
  const O = R.prototype;
  let L = L.__proto__;
  while (true) {
    if (L === null) {
      return false;
    }
    if (L === O) {
      return true;
    }
    L = L.__proto__;
  }
};
