/**
 * Saldoin.my.id - Main Script
 * Refactored for efficiency and modularity.
 */

const paymentInstructions = {
    qris: `
        <p><strong>Cara Pembayaran via QRIS:</strong></p>
        <p>1. Pindai kode QRIS yang muncul menggunakan aplikasi pembayaran (GoPay, OVO, DANA, mobile banking, dll.) Anda.</p>
        <p>2. Pastikan jumlah pembayaran sudah sesuai.</p>
        <p>3. Konfirmasi pembayaran.</p>
    `,
    dana: `
        <p><strong>Cara Pembayaran via DANA:</strong></p>
        <p>1. Pastikan saldo DANA Anda mencukupi.</p>
        <p>2. Anda akan diarahkan ke aplikasi DANA untuk menyelesaikan pembayaran.</p>
        <p>3. Ikuti instruksi di aplikasi DANA dan konfirmasi pembayaran.</p>
    `,
    ovo: `
        <p><strong>Cara Pembayaran via OVO:</strong></p>
        <p>1. Pastikan saldo OVO Anda mencukupi.</p>
        <p>2. Anda akan diarahkan ke aplikasi OVO untuk menyelesaikan pembayaran.</p>
        <p>3. Ikuti instruksi di aplikasi OVO dan konfirmasi pembayaran.</p>
    `,
    linkaja: `
        <p><strong>Cara Pembayaran via LinkAja:</strong></p>
        <p>1. Pastikan saldo LinkAja Anda mencukupi.</p>
        <p>2. Anda akan diarahkan ke aplikasi LinkAja untuk menyelesaikan pembayaran.</p>
        <p>3. Ikuti instruksi di aplikasi LinkAja dan konfirmasi pembayaran.</p>
    `,
    alfamart: `
        <p><strong>Cara Pembayaran via Alfamart:</strong></p>
        <p>1. Anda akan menerima kode pembayaran.</p>
        <p>2. Kunjungi gerai Alfamart terdekat.</p>
        <p>3. Berikan kode pembayaran kepada kasir dan lakukan pembayaran.</p>
        <p>4. Simpan struk sebagai bukti pembayaran.</p>
    `,
    indomaret: `
        <p><strong>Cara Pembayaran via Indomaret:</strong></p>
        <p>1. Anda akan menerima kode pembayaran.</p>
        <p>2. Kunjungi gerai Indomaret terdekat.</p>
        <p>3. Berikan kode pembayaran kepada kasir dan lakukan pembayaran.</p>
        <p>4. Simpan struk sebagai bukti pembayaran.</p>
    `,
    briva: `
        <p><strong>Cara Pembayaran via BRIVA (Bank BRI Virtual Account):</strong></p>
        <p>1. Salin nomor Virtual Account BRI Anda: <strong>XXX-XXXX-XXXX</strong> (akan muncul setelah konfirmasi).</p>
        <p>2. Lakukan pembayaran melalui ATM BRI, BRImo (Mobile Banking), atau Internet Banking BRI.</p>
        <p>3. Pilih 'Pembayaran' > 'BRIVA' dan masukkan nomor Virtual Account.</p>
        <p>4. Ikuti instruksi di layar hingga pembayaran berhasil.</p>
    `,
    'va-mandiri': `
        <p><strong>Cara Pembayaran via Virtual Account Mandiri:</strong></p>
        <p>1. Salin nomor Virtual Account Mandiri Anda: <strong>XXX-XXXX-XXXX</strong> (akan muncul setelah konfirmasi).</p>
        <p>2. Lakukan pembayaran melalui Livin' by Mandiri, ATM Mandiri, atau Internet Banking Mandiri.</p>
        <p>3. Pilih menu 'Bayar' atau 'Transfer' ke Virtual Account dan masukkan nomor Virtual Account.</p>
        <p>4. Ikuti instruksi di layar hingga pembayaran berhasil.</p>
    `,
    'va-bni': `
        <p><strong>Cara Pembayaran via Virtual Account BNI:</strong></p>
        <p>1. Salin nomor Virtual Account BNI Anda: <strong>XXX-XXXX-XXXX</strong> (akan muncul setelah konfirmasi).</p>
        <p>2. Lakukan pembayaran melalui BNI Mobile Banking, ATM BNI, atau Internet Banking BNI.</p>
        <p>3. Pilih 'Transfer' > 'Virtual Account Billing' dan masukkan nomor Virtual Account.</p>
        <p>4. Ikuti instruksi di layar hingga pembayaran berhasil.</p>
    `,
    'va-danamon': `
        <p><strong>Cara Pembayaran via Virtual Account Danamon:</strong></p>
        <p>1. Salin nomor Virtual Account Danamon Anda: <strong>XXX-XXXX-XXXX</strong> (akan muncul setelah konfirmasi).</p>
        <p>2. Lakukan pembayaran melalui D-Bank Mobile, ATM Danamon, atau Internet Banking Danamon.</p>
        <p>3. Pilih menu Transfer atau Pembayaran Virtual Account dan masukkan nomor Virtual Account.</p>
        <p>4. Ikuti instruksi di layar hingga pembayaran berhasil.</p>
    `,
    'va-permata': `
        <p><strong>Cara Pembayaran via Virtual Account Permata:</strong></p>
        <p>1. Salin nomor Virtual Account Permata Anda: <strong>XXX-XXXX-XXXX</strong> (akan muncul setelah konfirmasi).</p>
        <p>2. Lakukan pembayaran melalui PermataMobile X, ATM Permata, atau bank lain (via transfer ke Permata).</p>
        <p>3. Pilih menu Transfer atau Pembayaran Virtual Account dan masukkan nomor Virtual Account.</p>
        <p>4. Ikuti instruksi di layar hingga pembayaran berhasil.</p>
    `,
    'va-cimb': `
        <p><strong>Cara Pembayaran via Virtual Account CIMB Niaga:</strong></p>
        <p>1. Salin nomor Virtual Account CIMB Niaga Anda: <strong>XXX-XXXX-XXXX</strong> (akan muncul setelah konfirmasi).</p>
        <p>2. Lakukan pembayaran melalui OCTO Mobile, ATM CIMB Niaga, atau bank lain (via transfer ke CIMB Niaga).</p>
        <p>3. Pilih menu Transfer atau Pembayaran Virtual Account dan masukkan nomor Virtual Account.</p>
        <p>4. Ikuti instruksi di layar hingga pembayaran berhasil.</p>
    `,
    'va-bsi': `
        <p><strong>Cara Pembayaran via Virtual Account BSI:</strong></p>
        <p>1. Salin nomor Virtual Account BSI Anda: <strong>XXX-XXXX-XXXX</strong> (akan muncul setelah konfirmasi).</p>
        <p>2. Lakukan pembayaran melalui BSI Mobile, ATM BSI, atau bank lain (via transfer ke BSI).</p>
        <p>3. Pilih menu Transfer atau Pembayaran Virtual Account dan masukkan nomor Virtual Account.</p>
        <p>4. Ikuti instruksi di layar hingga pembayaran berhasil.</p>
    `,
};

let selectedMethod = null;
let currentPage = 'beranda.html';
let countdownInterval = null;

const showCustomAlert = (message) => {
    const modal = $('<div class="custom-modal"></div>').css({
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 10000
    });
    const content = $('<div class="modal-content"></div>').css({
        backgroundColor: 'white', padding: '20px', borderRadius: '8px',
        textAlign: 'center', maxWidth: '300px', width: '90%'
    }).append($('<p></p>').text(message))
      .append($('<button>OK</button>').css({
          backgroundColor: '#2b7a78', color: 'white', border: 'none',
          padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px'
      }).on('click', () => modal.remove()));
    modal.append(content).appendTo('body');
};

const updateSelectedMethodInfo = () => {
    const infoDiv = $('#selected-method-info');
    if (!infoDiv.length) return;
    infoDiv.html(selectedMethod && paymentInstructions[selectedMethod] ?
        paymentInstructions[selectedMethod] :
        '<p>Pilih metode pembayaran di atas untuk melihat instruksi.</p>');
};

const initializePaymentLogic = () => {
    $('.payment-method-item').on('click', function() {
        $('.payment-method-item').removeClass('selected');
        $(this).addClass('selected');
        selectedMethod = $(this).data('method');
        updateSelectedMethodInfo();
    });
};

const loadProductFillItems = () => {
    const products = [
        { type: 'pulsa', img: 'assets/pulsa.png', text: 'Pulsa' },
        { type: 'data', img: 'assets/data.png', text: 'Paket Data' },
        { type: 'pln', img: 'assets/token.png', text: 'Token Listrik' },
        { type: 'e-wallet', img: 'assets/e-wallet.png', text: 'E-Wallet' },
        { type: 'all', img: 'assets/icons/arrow.png', text: 'Lainnya' }
    ];
    $('#productFillList').html(products.map(p => `
        <li class="item-prduk" data-type="${p.type}">
            <img src="${p.img}" alt="${p.text}" loading="lazy" />
            <span>${p.text}</span>
        </li>
    `).join(''));

    // Use delegated event to handle clicks
    $('#productFillList').off('click').on('click', '.item-prduk', function() {
        const type = $(this).data('type');
        currentPage = 'store.html';
        loadPage('store.html', { type });
    });
};

const loadData = () => {
    $.getJSON('data.json').done((data) => {
        // Populer List
        const $populerList = $('#populerList');
        if ($populerList.length) {
            $populerList.empty();
            data.produk.slice(0, 8).forEach((item, i) => {
                const fallbackImg = `https://placehold.co/70x70/aabbcc/ffffff?text=P${i + 1}`;
                $populerList.append(`
                    <li class="produk-item flex" onclick="window.location.href='${item.address || '#'}'" style="cursor:pointer">
                        <img src="${item.img_product}" loading="lazy" alt="${item.nm_product}"
                             onerror="this.onerror=null;this.src='${fallbackImg}'" />
                        <p>#${i + 1}</p>
                    </li>
                `);
            });
        }

        // Voucher List
        const $productVoucher = $('#productVoucher');
        if ($productVoucher.length && data.voucher) {
            $productVoucher.empty();
            data.voucher.forEach(item => {
                const fallbackImg = 'https://placehold.co/100x100/aabbcc/ffffff?text=Voucher';
                $productVoucher.append(`
                    <li class="produk-item flex">
                        <img src="${item.img}" loading="lazy" alt="Voucher ${item.id}"
                             onerror="this.onerror=null;this.src='${fallbackImg}'" />
                    </li>
                `);
            });
        }

        // Artikel Terbaru
        const $listArtikel = $('#list-artikel');
        if ($listArtikel.length) {
            $listArtikel.empty();
            data.artikel_terbaru.forEach(item => {
                $listArtikel.append(`<li><a href="${item.url}" target="_blank">${item.judul}</a></li>`);
            });
        }
    }).fail(() => showCustomAlert('Gagal memuat data.'));
};

const startMaintenanceCountdown = () => {
    const updateCountdown = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(7, 0, 0, 0);

        if (now.getHours() < 7) {
            tomorrow.setDate(now.getDate());
        }

        const timeDiff = tomorrow.getTime() - now.getTime();

        if (timeDiff <= 0) {
            $('#days, #hours, #minutes, #seconds').text('00');
            $('.message-title').html('Pemeliharaan Selesai!');
            $('.message-text').html('Website sudah dapat diakses kembali.');
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        $('#days').text(String(days).padStart(2, '0'));
        $('#hours').text(String(hours).padStart(2, '0'));
        $('#minutes').text(String(minutes).padStart(2, '0'));
        $('#seconds').text(String(seconds).padStart(2, '0'));
    };

    updateCountdown();
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
};

const handleContinueTransaction = () => {
    currentPage = 'beranda.html';
    $('.link-item').removeClass('active');
    $(`.link-item[data-page="beranda.html"]`).addClass('active');
    loadPage('beranda.html');
};

const initializeStoreRedirect = (params) => {
    let targetUrl = "https://buylink.id/saldoin.my.id";
    if (params && params.type) {
        targetUrl += `?type=${encodeURIComponent(params.type)}`;
    }
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 2000);
};

// Accessibility Utilities
const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const getPerceivedLuminance = (r, g, b) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

const adaptTextColor = (element, bgColor) => {
    let r, g, b;
    if (bgColor.startsWith('#')) {
        const rgb = hexToRgb(bgColor);
        if (rgb) { r = rgb.r; g = rgb.g; b = rgb.b; }
    } else if (bgColor.startsWith('rgb')) {
        const matches = bgColor.match(/\d+/g);
        if (matches && matches.length >= 3) {
            r = parseInt(matches[0]); g = parseInt(matches[1]); b = parseInt(matches[2]);
        }
    }

    if (r !== undefined) {
        const luminance = getPerceivedLuminance(r, g, b);
        $(element).removeClass('text-light text-dark').addClass(luminance > 0.5 ? 'text-dark' : 'text-light');
    } else {
        // Fallback for complex backgrounds or when color cannot be parsed
        $(element).addClass('text-light');
    }
};

const loadPage = (page, params = null) => {
    const $skeletonLoader = $('#skeletonLoader');
    const $realContent = $('#realContent');
    const $wrapperContent = $('#wrapperContent');

    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    $skeletonLoader.show();
    $realContent.hide();

    $wrapperContent.load('page/' + page, (res, status, xhr) => {
        if (status === 'error') {
            $wrapperContent.html('<p>Gagal memuat konten.</p>');
        } else {
            if (page === 'payment.html') initializePaymentLogic();
            if (page === 'beranda.html') {
                loadProductFillItems();
                loadData();
                initializeCarousel();
                $('#viewAllPopular').on('click', () => {
                    window.location.href = 'https://www.saldoin.my.id/cari?type=topup';
                });
            }
            if (page === 'maintenance.html') startMaintenanceCountdown();
            if (page === 'store.html') initializeStoreRedirect(params);
        }
        $skeletonLoader.fadeOut(200, () => $realContent.fadeIn(200));
    });
};

const initializeCarousel = () => {
    let currentIndex = 0;
    const slides = $('.carousel-slide');
    if (slides.length) {
        // Clear any existing intervals if necessary (though SPAs handle this better with clear/reset)
        if (window.carouselInterval) clearInterval(window.carouselInterval);
        window.carouselInterval = setInterval(() => {
            const currentSlides = $('.carousel-slide');
            if (currentSlides.length === 0) {
                clearInterval(window.carouselInterval);
                return;
            }
            currentSlides.removeClass('active');
            currentIndex = (currentIndex + 1) % currentSlides.length;
            currentSlides.eq(currentIndex).addClass('active');
        }, 4000);
    }
};

const routeMap = {
    '#/': 'beranda.html',
    '#/payment': 'payment.html',
    '#/cara-order': 'cara-order.html',
    '#/testimoni': 'testimoni.html',
    '#/about': 'about.html',
    '#/kontak': 'kontak.html',
    '#/kebijakan': 'kebijakan.html',
    '#/faq': 'faq.html',
    '#/maintenance': 'maintenance.html'
};

const handleRouting = () => {
    const hash = window.location.hash || '#/';
    const [path, queryString] = hash.split('?');
    const urlParams = new URLSearchParams(queryString || '');
    const params = Object.fromEntries(urlParams.entries());

    let page = routeMap[path] || (path.startsWith('#/store') ? 'store.html' : 'beranda.html');

    currentPage = page;
    $('.link-item').removeClass('active');
    $(`.link-item[data-page="${page}"]`).addClass('active');

    // Also update mobile menu icons if open
    if ($(window).width() <= 768 && $('#menuSection').is(':visible')) {
        $('#menuSection').hide();
        $('#menuIcon').show();
        $('#closeIcon').hide();
    }

    loadPage(page, params);
};

$(document).ready(() => {
    window.handleContinueTransaction = handleContinueTransaction;
    window.loadPage = loadPage;

    $('#btnDaftar').on('click', () => window.location.href = 'https://www.saldoin.my.id/daftar');
    $('#btnMasuk').on('click', () => window.location.href = 'https://www.saldoin.my.id/masuk');
    $('#btnBars').on('click', () => {
        $('#menuSection').toggle();
        const isVisible = $('#menuSection').is(':visible');
        $('#menuIcon').toggle(!isVisible);
        $('#closeIcon').toggle(isVisible);
    });

    const pageToHash = Object.fromEntries(Object.entries(routeMap).map(([k, v]) => [v, k]));

    $('.link-item').on('click', function() {
        const page = $(this).data('page');
        window.location.hash = pageToHash[page] || '#/';
    });

    window.addEventListener('hashchange', handleRouting);
    handleRouting(); // Initial load
});
