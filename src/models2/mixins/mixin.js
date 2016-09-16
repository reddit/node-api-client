export default (cls, fns) => {
  Object.keys(fns).map(k => {
    cls.prototype[k] = fns[k];
  });

  const oldConstructor = cls.constructor;
  cls.constructor = function () {
    Object.keys(fns).map(k => {
      this[k] = this[k].bind(this);
    });

    oldConstructor(...arguments);
  }
}
