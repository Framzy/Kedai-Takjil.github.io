function scrollToSection(sectionId){
    var section = document.getElementById(sectionId);
    section.scrollIntoView({behavior: 'smooth'})
}

// Ambil semua tautan dengan kelas "nav-link"
var navLinks = document.querySelectorAll('.move-product');

// Iterasi melalui tautan dan tambahkan event listener untuk menangani klik
navLinks.forEach(function(navLink) {
    navLink.addEventListener('click', function(event) {
        // Hentikan perilaku default dari tautan
        event.preventDefault();
        
        // Ambil nilai href dari tautan yang ditekan
        var hrefValue = navLink.getAttribute('href');
        
        // Cek apakah tautan yang ditekan adalah tautan "Product"
        if (hrefValue === 'index.html#section2') {
            // Gulingkan halaman ke "section2" dengan efek scroll yang halus
            var section2 = document.getElementById('section2');
            section2.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Untuk tautan lain, panggil fungsi scrollToSection dengan ID yang sesuai
            var sectionId = hrefValue.substring(1); // Menghapus karakter '#' dari nilai href
            scrollToSection(sectionId);
        }
    });
});
