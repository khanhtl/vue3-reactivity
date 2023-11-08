let dep = new Set() // Our object tracking a list of effects
let product = { price: 5, quantity: 2 }
let total = product.price * product.quantity;

let effect = () => { total = product.price * product.quantity }
let track = () => dep.add(effect); // Store the current effect
let trigger = () => dep.forEach(effect => effect());
track();
product.price = 20
console.log(total) // => 10
trigger()
console.log(total) // => 40