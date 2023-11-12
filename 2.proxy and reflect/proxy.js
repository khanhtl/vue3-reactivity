function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            console.log('Get was called with key = ', key);
            return Reflect.get(...arguments)
        },
        set(target, key, value, receiver) {
            console.log('Set was called with key = ', key, 'and value = ', value);
            return Reflect.set(...arguments);
        }
    }
    return new Proxy(target, handler);
}
let proxiedProduct = reactive({ price: 5, quantity: 2 })

proxiedProduct.price = 12
console.log(proxiedProduct.price);