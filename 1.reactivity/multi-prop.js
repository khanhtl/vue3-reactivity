//let dep = new Set() // A dependentcy which is a set of effects thanh should get re run when value change
const depsMap = new Map() // Store depeendentcy object for each prop
let product = { price: 5, quantity: 2 }
let total = product.price * product.quantity;

let effect = () => { total = product.price * product.quantity }
let track = (key) => {
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(effect)
}; // Store the current effect
let trigger = (key) => {
    let dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effect => effect())
    }
};
track('price');
product.price = 20
console.log(total) // => 10
trigger('price')
console.log(total) // => 40