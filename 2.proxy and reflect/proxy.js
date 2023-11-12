const targetMap = new WeakMap();
const product = reactive({ price: 5, quantity: 2 });
let activeEffect = null;
let total = 0;
let salePrice = ref(0);

function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}
effect(() => (salePrice.value = product.price * 0.9))
effect(() => (total = salePrice.value * product.quantity));

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
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

function ref(raw) {
    const r = {
        get value() {
            track(r, 'value');
            return raw;
        },
        set value(newVal) {
            raw = newVal;
            trigger(r, 'value');
        }
    }
    return r;
}

console.log('total: ', total);
console.log('salePrice: ' ,salePrice.value);
product.price = 15;
console.log('total: ', total);
console.log('salePrice: ' ,salePrice.value);
