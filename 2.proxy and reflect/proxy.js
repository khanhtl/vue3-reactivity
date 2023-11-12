let product = { price: 5, quantity: 2 }
// let proxiedProduct = new Proxy(product, {})
let proxiedProduct = new Proxy(product, {
    get(target, key) {
        console.log('Get was called with key = ', key);
        // return target[key]
        return Reflect.get(target, key)
    }
})
console.log(proxiedProduct.price);