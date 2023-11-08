const targetMap = new WeakMap()

let product = { price: 5, quantity: 2 }
let total = product.price * product.quantity;

let effect = () => { total = product.price * product.quantity }
let track = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(effect)
}; 
let trigger = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) return;
    let dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effect => effect())
    }
};
track(product, 'price');
product.price = 20
console.log(total) 
trigger(product, 'price')
console.log(total) 