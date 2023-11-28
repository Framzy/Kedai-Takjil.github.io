document.addEventListener('DOMContentLoaded', function () {
    let cartTab = document.querySelector('.cartTab');
    let productTab = document.querySelector('.productTab');
    let title = document.querySelector('.product-title');
    let cart = document.querySelector('.cart-icon');
    let logo = document.querySelector('.logo');

    let imageCart = "images/icons/cart-icon-1.png";
    let imageProduct = "images/icons/cart-icon.png";

    logo.addEventListener("click", function () {
        window.location.href = "index.html";
    });

    // Fungsi untuk menampilkan productTab dan menyembunyikan cartTab
    function showProductTab() {
        cartTab.style.display = "none";
        productTab.style.display = "block";
        title.innerHTML = `<div class="bounceInDown">
        Produk Kami</div>`;
        cart.src = imageProduct;
    }

    // Fungsi untuk menampilkan cartTab dan menyembunyikan productTab
    function showCartTab() {
        cartTab.style.display = "block";
        productTab.style.display = "none";
        title.innerHTML = `<div class="bounceInDown">
        Keranjang</div>`;
        cart.src = imageCart;
    }

    showProductTab();

    // Tambahkan event listener untuk tombol atau link yang akan mengubah tampilan
    let cartMove = document.getElementById("cart-icon");
    cartMove.addEventListener("click", function () {
        // Lakukan aksi yang diperlukan (contoh: tampilkan cartTab dan sembunyikan productTab)
        showCartTab();

        // Misalnya, jika ada elemen dengan id "product-link"
        let linkProduct = document.getElementById('product-link');
        let replaceProduct = document.getElementById('product-link-replace');
        linkProduct.remove();
        replaceProduct.innerHTML = `
    <a href="product.html" class="nav-link">Product</a>
    `;
    });


    let productMove = document.getElementById('product-link');
    productMove.addEventListener("click", function () {
        // Lakukan aksi yang diperlukan (contoh: tampilkan productTab dan sembunyikan cartTab)
        showProductTab();
    });

    cartMove.addEventListener("click", function () {
    });

    let checkOut = document.querySelector('.checkOut');
    let checkOutAddress = document.querySelector('.popupCheckOut');
    let checkOutSuccess = document.querySelector('.popupCheckOutSuccess');
    let checkOutSend= document.querySelector('.popupCheckOut-btn');
    let namaRequired= document.querySelector('.nama-required');
    let alamatRequired= document.querySelector('.alamat-required');
    let nama= document.getElementById('nama');
    let alamat= document.getElementById('alamat');

    function showAddress() {
        checkOutAddress.style.display = "block";
        checkOutSuccess.style.display = "none";
    }

    function showSuccess() {
        // Validasi sebelum menunjukkan pop-up sukses
        if (nama.validity.valid && alamat.validity.valid) {
            checkOutSuccess.style.display = "block";
            checkOutAddress.style.display = "none";
            nama.value="";
            alamat.value="";
        } 
     if(!nama.validity.valid &&!alamat.validity.valid){
        namaRequired.style.display="block";
        alamatRequired.style.display="block";
        }else if(!nama.validity.valid) {
            namaRequired.style.display="block";
        } else if(!alamat.validity.valid) {
            alamatRequired.style.display="block";
        }
    }

    nama.addEventListener("input",function(){
        namaRequired.style.display="none";
    })
    alamat.addEventListener("input",function(){
        alamatRequired.style.display="none";
    })

    checkOut.addEventListener("click", function() {
        showAddress();   
    });
    checkOutSend.addEventListener("click", function() {
        showSuccess();
    });

});
