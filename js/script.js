$(document).ready(function () {
    const mainContent = $("#wrapperContent");
    const skeletonLoader = $("#skeletonLoader");
    const navLinks = $(".nav-link");

    const routeMap = {
        "#/beranda": "page/beranda.html",
        "#/store": "page/store.html",
        "#/payment": "page/payment.html",
        "#/cara-order": "page/cara-order.html",
        "#/testimoni": "page/testimoni.html",
        "#/about": "page/about.html",
        "#/kontak": "page/kontak.html",
        "#/kebijakan": "page/kebijakan.html",
        "#/faq": "page/faq.html",
        "#/maintenance": "page/maintenance.html"
    };

    function showLoader() {
        skeletonLoader.show();
        mainContent.addClass("fade-out");
    }

    function hideLoader() {
        skeletonLoader.fadeOut(300, function() {
            mainContent.removeClass("fade-out");
        });
    }

    function updateActiveLink(hash) {
        navLinks.removeClass("active");
        $(`.nav-link[href="${hash}"]`).addClass("active");

        if (window.innerWidth <= 768) {
            $("#navLinks").slideUp();
        }
    }

    function loadPage(hash) {
        const pagePath = routeMap[hash] || "page/beranda.html";
        showLoader();

        mainContent.load(pagePath, function (response, status, xhr) {
            if (status === "error") {
                mainContent.html("<div class='container' style='padding: 100px 20px; text-align: center;'><h2>Halaman tidak ditemukan</h2><p>Maaf, halaman yang Anda cari tidak tersedia.</p><a href='#/beranda' class='btn btn-primary mt-6'>Kembali ke Beranda</a></div>");
            }

            initPageScripts(hash);
            hideLoader();
            window.scrollTo(0, 0);
            initRevealObserver();
            updateMetadata(hash);
        });

        updateActiveLink(hash);
    }

    function updateMetadata(hash) {
        const titles = {
            "#/beranda": "Beranda | Saldoin",
            "#/store": "Toko Resmi | Saldoin",
            "#/payment": "Metode Pembayaran | Saldoin",
            "#/cara-order": "Cara Order | Saldoin",
            "#/testimoni": "Testimoni Pelanggan | Saldoin",
            "#/faq": "FAQ | Saldoin"
        };
        document.title = titles[hash] || "SALDOIN - Premium Game Top-Up";
    }

    function initRevealObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.1 });

        $("section, .glass-card, .feature-card, .product-card").addClass("reveal");

        $(".reveal").each(function() {
            observer.observe(this);
        });
    }

    function initPageScripts(hash) {
        if (hash === "#/beranda" || hash === "" || !hash) {
            loadLandingPageData();
            applyCustomizations();
        }
        applyFooterCustomizations();
    }

    function applyCustomizations() {
        const headline = localStorage.getItem('admin_headline');
        const subtext = localStorage.getItem('admin_subtext');

        if (headline) $(".hero-headline").html(headline);
        if (subtext) $(".hero-subtext").text(subtext);
    }

    function applyFooterCustomizations() {
        const wa = localStorage.getItem('admin_wa');
        const ig = localStorage.getItem('admin_ig');

        if (wa) {
            $(".footer-brand-section .social-links a[href*='wa.me']").attr("href", `https://wa.me/${wa}`);
        }
        if (ig) {
            $(".footer-brand-section .social-links a[href*='instagram']").attr("href", ig);
        }
    }

    let allProducts = [];
    let allVouchers = [];

    function loadLandingPageData() {
        $.getJSON("data.json", function (data) {
            // Filter products based on admin hidden list
            allProducts = data.produk.filter(p => localStorage.getItem(`prod_${p.id}_hidden`) !== 'true');
            allVouchers = data.voucher;
            renderProducts(allProducts);
        });
    }

    function renderProducts(products) {
        const populerList = $("#populerList");
        populerList.empty();

        if (products && products.length > 0) {
            products.forEach((item) => {
                const productCard = `
                    <li class="product-card reveal" onclick="window.location.href='${item.address || '#'}'">
                        <img src="${item.img_product}" alt="${item.nm_product}" class="product-img" onerror="this.src='https://placehold.co/100x100/161c2d/ffffff?text=Game'">
                        <div class="product-name">${item.nm_product}</div>
                        <div class="product-tag">${item.nm_detail || 'Top Up'}</div>
                    </li>
                `;
                populerList.append(productCard);
            });
        }
        initRevealObserver();
    }

    function renderVouchers(vouchers) {
        const populerList = $("#populerList");
        populerList.empty();
        if (vouchers) {
            vouchers.forEach(v => {
                const card = `
                    <li class="product-card reveal">
                        <img src="${v.img}" alt="Voucher" class="product-img" style="aspect-ratio: 16/9; width: 100%; height: auto;">
                        <div class="product-name">Voucher Game</div>
                        <div class="product-tag">Voucher</div>
                    </li>
                `;
                populerList.append(card);
            });
        }
        initRevealObserver();
    }

    $(document).on("input", "#landingSearch", function() {
        const term = $(this).val().toLowerCase();
        const filtered = allProducts.filter(p =>
            p.nm_product.toLowerCase().includes(term) ||
            (p.nm_detail && p.nm_detail.toLowerCase().includes(term))
        );
        renderProducts(filtered);
    });

    $(document).on("click", ".tab-btn", function() {
        $(".tab-btn").removeClass("active");
        $(this).addClass("active");
        const filter = $(this).data("filter");

        if (filter === "voucher") {
            renderVouchers(allVouchers);
        } else if (filter === "game") {
            renderProducts(allProducts.filter(p => !p.nm_product.toLowerCase().includes("voucher")));
        } else if (filter === "ewallet") {
            renderProducts(allProducts.filter(p => p.nm_product.toLowerCase().includes("dana") || p.nm_product.toLowerCase().includes("ovo")));
        } else {
            renderProducts(allProducts);
        }
    });

    $("#btnMasuk").on("click", function() {
        window.location.href = "https://www.saldoin.my.id/masuk";
    });

    $("#btnDaftar").on("click", function() {
        window.location.href = "https://www.saldoin.my.id/daftar";
    });

    // Global helper for maintenance page
    window.handleContinueTransaction = function() {
        window.location.hash = "#/beranda";
    };

    $(window).on("hashchange", function () {
        loadPage(location.hash);
    });

    $("#btnMobileMenu").on("click", function() {
        $("#navLinks").slideToggle();
    });

    if (!location.hash) {
        location.hash = "#/beranda";
    } else {
        loadPage(location.hash);
    }
});
