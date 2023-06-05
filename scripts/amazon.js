// const product = [{
//     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating: {
//         stars: 4.5,
//         count: 87
//     },
//     priceCents: 1090 
// }, {
//     image: 'images/products/intermediate-composite-basketball.jpg',
//     productName: 'Intermediate Size Basketball',
//     rating: {
//         stars: 4,
//         count: 127
//     },
//     priceCents: 2095
// }, {
//     image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     productName: 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating: {
//         stars: 4.5,
//         count: 56
//     },
//     priceCents: 799
// }, {
//     image: 'https://supersimple.dev/projects/amazon/images/products/black-2-slot-toaster.jpg',
//     productName: '2 Slot Toaster - Black',
//     rating: {
//         stars: 5,
//         count: 2197
//     },
//     priceCents: 1899
// }];

//Using products from products.js file to populate Products Grid

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src=${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">${product.name}</div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">${product.rating.count} </div>
            </div>

            <div class="product-price">$${(product.priceCents/100).toFixed(2)}</div>

            <div class="product-quantity-container">
            <select class='js-quantity-selector-${product.id}'>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-name="${product.name}" data-product-id="${product.id}">
            Add to Cart
            </button>
    </div>
    `;
})

// Selecting Products Grid with JS
document.querySelector('.js-products-grid').innerHTML = productsHTML;

addCartBtn = document.querySelectorAll('.js-add-to-cart-btn');
addCartBtn.forEach((button) => {
    button.addEventListener('click', () => {
        productName = button.dataset.productName;
        productId = button.dataset.productId;

        // Using option selector to adjust quantity of product
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);

        // Adding products to cart - new or same products
        let matchingItem;

        cart.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            cart.push({
                productId: productId,
                productName: productName,
                quantity: quantity
            });
        }

        // Making cart quantity notification interactive
        let itemQuantity = 0;
        console.log(cart);

        cart.forEach((item) => {
            itemQuantity += item.quantity;            
        });

        document.querySelector('.js-cart-quantity').innerHTML = itemQuantity;

        // Adding 'Added' graphic to active Add-To-Cart button
        const addedMsg = document.querySelector(`.js-added-to-cart-${productId}`);
        addedMsg.classList.add('added-to-cart-visible');

        setTimeout(() => {
            addedMsg.classList.remove('added-to-cart-visible');
        }, 1000);
    });
});

// Problem - itemQuantity is resetting with new product instead of adding all cart items ==> Solved by using console.log(cart); using forEach loop and adding all item quantities;