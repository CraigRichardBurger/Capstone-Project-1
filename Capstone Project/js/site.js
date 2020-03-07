// gets the shopping cart
function getCart() {
    let getCart = window.localStorage.getItem('cart');
    if (getCart == null) {
        return {
            items: [],
            promocodes: [],
            deliveryOption: 'delivery',
            total: 0
        };
    }

    let cart = JSON.parse(getCart);
    cart.total = getTotal(cart);
    cart.vat = (cart.total * 0.14).toFixed(2);

    return cart;
}

// sets the state of the shopping cart
function setCart(cart) {
    window.localStorage.setItem('cart', JSON.stringify(cart));
}

// empties the current shopping cart
function emptyCart() {
    window.localStorage.removeItem('cart');
}

// sets the currently selected delivery option in our shopping cart
function setCartDeliveryOption(option) {
    let cart = getCart();
    cart.deliveryOption = option.toLowerCase();
    setCart(cart);
}

// gets the total amount payable from items in the shopping cart (includes promo codes)
function getTotal(cart) {
    let total = 0;
    $.each(cart.items, function(i, el) {
        total += el.price;
    });
    $.each(cart.promocodes, function(i, el) {
        if (cart.deliveryOption == null || el.deliveryOption == cart.deliveryOption) {
            total -= el.amount;
        }
    });
    return total;
}

// adds the provided product to the shopping cart
function addProductToCart(product) {
    let cart = getCart();
    cart.items.push(product);

    setCart(cart);
    alert(product.name + ' added to cart, Total is R' + getTotal(cart));
}

// applies a promo code to the shopping cart
function addPromocodeToCart(promocode) {
    let cart = getCart();

    if (promocode == 'PROMO') {
        cart.promocodes.push({ code: promocode, amount: 50, deliveryOption: 'delivery' });
    } else {
        cart.promocodes.push({ code: promocode, amount: 10, deliveryOption: null });
    }

    setCart(cart);
}