var popupCart = document.getElementById("popupCart-container");
var popup = document.getElementById("popup-container");
var popupContent = document.querySelector(".popupCart-content");
var closePopupBtn = document.querySelector(".close-popupCart");
var closePopupCheckOutBtn = document.querySelector(".close-popupCheckOut");
var closePopupCheckOutSuccessBtn = document.querySelector(".close-popupCheckOutSuccess");
var PopupAddrress = document.querySelector(".popupCheckOut");
var PopupSuccess = document.querySelector(".popupCheckOutSuccess");

closePopupBtn.addEventListener("click", function () {
    popupCart.style.display = "none";
});
closePopupCheckOutBtn.addEventListener("click", function () {
    PopupAddrress.style.display = "none";
});
closePopupCheckOutSuccessBtn.addEventListener("click", function () {
    PopupSuccess.style.display = "none";
});

// Menyembunyikan popupCart jika pengguna mengklik di luar area popupCart content
popupContent.addEventListener("click", function (event) {
    event.stopPropagation(); // Menghentikan event klik agar tidak mencapai popupCart
});


// Menyembunyikan popupCart jika pengguna mengklik di luar area popupCart
window.addEventListener("click", function (event) {
    if (event.target === popupCart) {
        popupCart.style.display = "none";
    }
});

// Mengambil referensi ke elemen tombol dengan ID "cart-move"
var moveCartButton = document.getElementById("cart-move");
let cartTab = document.querySelector('.cartTab');
let productTab = document.querySelector('.productTab');
let title = document.querySelector('.product-title');
let cart = document.querySelector('.cart-icon');
let imageCart = "images/icons/cart-icon-1.png";

function showCartTab() {
    cartTab.style.display = "block";
    productTab.style.display = "none";
    popupCart.style.display = "none";
    title.innerHTML = `<div class="bounceInDown">
    Keranjang</div>`;
    cart.src = imageCart;
}
// Menambahkan event listener untuk menangani klik tombol
moveCartButton.addEventListener("click", function () {
    // Mengarahkan pengguna ke halaman "cart.html"
    showCartTab();
});
