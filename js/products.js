    let listProductHTML = document.querySelector('.listProduct');
    let listCartHTML = document.querySelector('.listCart');
    let iconCart = document.querySelector('.cart-icon');
    let iconCartSpan = document.querySelector('.circle span');
    let popUpCart = document.getElementById('popupCart-container');

    let listProducts = [];
    let carts = [];

    const formatPrice = (price) => {
        // Menggunakan metode toLocaleString untuk memformat angka ke dalam bentuk mata uang
        // Menambahkan minimumFractionDigits: 0 agar desimal dihilangkan
        return price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    };
    
    
    const addDataToHTML = () => {
        // remove datas default from HTML
        listProductHTML.innerHTML='';
        // add new datas
        if(listProducts.length > 0) // if has data
        {
            listProducts.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('items');
                newProduct.dataset.id = product.id;
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <div class="product-pesan">
                <div class="product-pesan-info">
                <h4>${product.name}</h4>
                <p>${formatPrice(product.price)}</p>
                </div>
                    <div class="btn-pesan">
                    <button class="addCart">Pesan</button>
                    </div>
                    </div>`;
                    listProductHTML.appendChild(newProduct);
                });
            }
        }
        const addToCart = (product_id) => {
            let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
            if(carts.length <= 0){
                carts = [{
                    product_id: product_id,
                    quantity: 1,
                }];
            } else if(positionThisProductInCart < 0){
                carts.push({
                    product_id: product_id,
                    quantity: 1,
                });
            } else {
                carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
            }
            console.log(carts);
            addCartToHTML();
            addCartToMemory();
        }
        
        
        const addCartToHTML = () => {
            listCartHTML.innerHTML='';
            let totalQuantity = 0;
            if(carts.length > 0){
                carts.forEach(cart => {
                    totalQuantity = totalQuantity +  cart.quantity;
                    let newCart = document.createElement('div');
                    newCart.classList.add('items');
                    newCart.dataset.id= cart.product_id;
                    let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
                    let info = listProducts[positionProduct];
                    let totalPrice = info.price*cart.quantity;
                    newCart.innerHTML = `
                    <div class="image">
                    <img src="${info.image}">
                    </div>
                    <div class ="info">
                    <div class="name">
                    ${info.name}
                    </div>
                    <div class="totalPrice">${formatPrice(totalPrice)}</div>
                    <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                    </div>
                    </div>
                    `;
                    listCartHTML.appendChild(newCart);
                })
            }
            console.log(totalQuantity);
            iconCartSpan.innerText = totalQuantity;
            let totalHarga = allPrice();
            let elemenTotalHarga = document.querySelector('.allPrice');
            elemenTotalHarga.textContent = formatPrice(totalHarga);
        }
        
        
        const addCartToMemory = () => {
            localStorage.setItem('cart', JSON.stringify(carts));
        }
        

        listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('addCart')) {
                let id_product = positionClick.closest('.items').dataset.id;
                addToCart(id_product);
                popUpCart.style.display = "block";
            }
        });
        
        listCartHTML.addEventListener('click', (event) => {
            let positionClick = event.target;
            if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
                let product_id = positionClick.closest('.items').dataset.id;
                console.log(product_id);
                    let type = 'minus';
                    if(positionClick.classList.contains('plus')){
                        type = 'plus';
                    }
                        changeQuantityCart(product_id, type);
                    }
                    
        })
        const changeQuantityCart = (product_id, type) => {
            let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
            if(positionItemInCart >= 0){
            switch (type) {
                case 'plus':
                    carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                    break;
                    
                    default:
                        let changeQuantity = carts[positionItemInCart].quantity - 1;
                        if (changeQuantity > 0) {
                            carts[positionItemInCart].quantity = changeQuantity;
                        }else{
                            carts.splice(positionItemInCart, 1);
                        }
                        break;
                    }
                }
                addCartToHTML();
                addCartToMemory();
            }

        // _Event listener_ untuk tombol "Check Out"
        let tombolCheckOut = document.querySelector('.popupCheckOut-btn');
        tombolCheckOut.addEventListener('click', () => {
            if (nama.validity.valid && alamat.validity.valid) {
                checkOut();
            }


        });

        // Fungsi untuk menghitung total harga dari semua barang di keranjang
        const allPrice = () => {
            let totalHarga = 0;

            if (carts.length > 0) {
                carts.forEach(cart => {
                    let posisiProduk = listProducts.findIndex(value => value.id == cart.product_id);
                    let produk = listProducts[posisiProduk];
                    totalHarga += produk.price * cart.quantity;
                });
            }
            return totalHarga;
            
        };


        // Fungsi untuk menangani proses _checkout_
        const checkOut = () => {
            carts = [];
            addCartToHTML();
            addCartToMemory();
        };

        const initApp = () => {
            // get data product
            fetch('js/products.json')
            .then(response => response.json())
            .then(data => {
                listProducts = data;
                console.log(listProducts);
                addDataToHTML();
                
                // get data cart from memory
                if(localStorage.getItem('cart')){
                    carts = JSON.parse(localStorage.getItem('cart'));
                    addCartToHTML();
                }
            })
        }
        initApp();
