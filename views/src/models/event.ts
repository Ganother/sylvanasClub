const eventEmitter = {
  list: {},
  on(key, fn) {
    console.log(key)
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(fn);
  },
  emit(type:string, ...rests) {
    console.log(2333)
    let key = type,
      fns = this.list[key];

    if (!fns || fns.length === 0) {
      return false;
    }
    fns.forEach(fn => {
      fn.apply(this, ...rests);
    });
  },
  remove(key, fn) {
    // 这回我们加入了取消订阅的方法
    let fns = this.list[key];
    // 如果缓存列表中没有函数，返回false
    if (!fns) return false;
    // 如果没有传对应函数的话
    // 就会将key值对应缓存列表中的函数都清空掉
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      // 遍历缓存列表，看看传入的fn与哪个函数相同
      // 如果相同就直接从缓存列表中删掉即可
      fns.forEach((cb, i) => {
        if (cb === fn) {
          fns.splice(i, 1);
        }
      });
    }
  }
}

export default eventEmitter
