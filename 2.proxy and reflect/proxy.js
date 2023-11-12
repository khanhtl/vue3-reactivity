const targetMap = new WeakMap();
const product = reactive({ price: 5, quantity: 2 });
let total = 0;

function effect() {
  total = product.price * product.quantity;
}
effect();
function track(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(effect);
}
function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) return;
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
}

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(...arguments);
      track(target, key);
      return result;
    },
      set(target, key, value, receiver) {
          let oldValue = target[key];
          let result = Reflect.set(...arguments);
          if (result && oldValue != value) {
              trigger(target, key);
          }
      return result;
    },
  };
  return new Proxy(target, handler);
}

console.log(total);
product.price = 12;
console.log(total);
console.log(product.price);
