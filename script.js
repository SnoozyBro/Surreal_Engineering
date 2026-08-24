/* =========================================================
   SURREAL WEBSITE JAVASCRIPT
   FULL CORRECTED VERSION

   FEATURES:
   - EmailJS contact form
   - Smooth navigation
   - Active navigation
   - Mobile hamburger
   - Search
   - Scroll reveal
   - Animated counters
   - Hero network
   - Cursor particles
   - Magnetic buttons
   - Service card tilt
   - Hero service interaction
   - Newsletter
   - Image fallback
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       EMAILJS CONFIGURATION
    ====================================================== */

    const EMAILJS_PUBLIC_KEY =
        "3acIhgg32PRhhzCd_";

    const EMAILJS_SERVICE_ID =
        "service_yzmd5rl";

    const EMAILJS_TEMPLATE_ID =
        "template_8vf53eh";


    /* =====================================================
       EMAILJS INITIALIZATION
    ====================================================== */

    let emailJSReady = false;

    if (typeof emailjs !== "undefined") {

        try {

            emailjs.init({
                publicKey: EMAILJS_PUBLIC_KEY
            });

            emailJSReady = true;

            console.log(
                "EmailJS initialized successfully."
            );

        } catch (error) {

            console.error(
                "EmailJS initialization failed:",
                error
            );

        }

    } else {

        console.error(
            "EmailJS library was not loaded."
        );

    }


    /* =====================================================
       NAVIGATION
    ====================================================== */

    const navLinks =
        document.querySelectorAll("[data-nav]");


    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const target =
                this.getAttribute("href");


            if (
                !target ||
                !target.startsWith("#")
            ) {

                return;

            }


            const section =
                document.querySelector(target);


            if (!section) {

                return;

            }


            e.preventDefault();


            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            const mobileNav =
                document.getElementById("mainNav");


            if (mobileNav) {

                mobileNav.classList.remove(
                    "open"
                );

            }


            const hamburger =
                document.getElementById(
                    "hamburger"
                );


            if (hamburger) {

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const mainNavLinks =
        document.querySelectorAll(
            ".main-nav .nav-link"
        );


    if ("IntersectionObserver" in window) {

        const navObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const id =
                            entry.target.getAttribute(
                                "id"
                            );


                        mainNavLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) === "#" + id
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },

                {
                    rootMargin:
                        "-30% 0px -60% 0px"
                }

            );


        sections.forEach(section => {

            navObserver.observe(section);

        });

    }


    /* =====================================================
       HAMBURGER MENU
    ====================================================== */

    const hamburger =
        document.getElementById(
            "hamburger"
        );


    const mainNav =
        document.getElementById(
            "mainNav"
        );


    if (
        hamburger &&
        mainNav
    ) {

        hamburger.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNav.classList.toggle(
                        "open"
                    );


                hamburger.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    const searchBox =
        document.getElementById(
            "searchBox"
        );


    const searchToggle =
        document.getElementById(
            "searchToggle"
        );


    const siteSearch =
        document.getElementById(
            "siteSearch"
        );


    if (
        searchToggle &&
        searchBox
    ) {

        searchToggle.addEventListener(
            "click",
            () => {

                searchBox.classList.toggle(
                    "open"
                );


                if (
                    searchBox.classList.contains(
                        "open"
                    ) &&
                    siteSearch
                ) {

                    setTimeout(
                        () => {

                            siteSearch.focus();

                        },
                        150
                    );

                }

            }
        );

    }


    if (siteSearch) {

        siteSearch.addEventListener(
            "keydown",
            e => {

                if (
                    e.key !== "Enter"
                ) {

                    return;

                }


                const query =
                    siteSearch.value
                        .trim()
                        .toLowerCase();


                if (!query) {

                    return;

                }


                const searchable =
                    document.querySelectorAll(
                        "h1,h2,h3,h4,p,li"
                    );


                let found = false;


                searchable.forEach(
                    element => {

                        element.classList.remove(
                            "search-highlight"
                        );

                    }
                );


                for (
                    const element of searchable
                ) {

                    if (
                        element.textContent
                            .toLowerCase()
                            .includes(query)
                    ) {

                        element.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });


                        element.classList.add(
                            "search-highlight"
                        );


                        found = true;


                        setTimeout(
                            () => {

                                element.classList.remove(
                                    "search-highlight"
                                );

                            },
                            2500
                        );


                        break;

                    }

                }


                if (!found) {

                    alert(
                        "No matching content was found."
                    );

                }

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealItems =
        document.querySelectorAll(
            ".reveal-item"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        revealItems.forEach(item => {

            revealObserver.observe(item);

        });

    } else {

        revealItems.forEach(item => {

            item.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    let countersStarted = false;


    const counterSection =
        document.querySelector(
            ".about-stats"
        );


    function animateCounters() {

        if (countersStarted) {

            return;

        }


        countersStarted = true;


        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );


            const duration =
                1200;


            const startTime =
                performance.now();


            function updateCounter(
                currentTime
            ) {

                const elapsed =
                    currentTime -
                    startTime;


                const progress =
                    Math.min(
                        elapsed /
                            duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const current =
                    Math.floor(
                        target *
                        eased
                    );


                counter.textContent =
                    current + "+";


                if (
                    progress < 1
                ) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target + "+";

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        });

    }


    if (
        counterSection &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(

                entries => {

                    if (
                        entries[0]
                            .isIntersecting
                    ) {

                        animateCounters();

                        counterObserver.disconnect();

                    }

                },

                {
                    threshold: 0.25
                }

            );


        counterObserver.observe(
            counterSection
        );

    }


    /* =====================================================
       HERO NETWORK
    ====================================================== */

    const canvas =
        document.getElementById(
            "heroNetwork"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        canvas &&
        !reducedMotion
    ) {

        const ctx =
            canvas.getContext("2d");


        let width = 0;
        let height = 0;


        const nodes = [];


        const NODE_COUNT =
            28;


        const CONNECTION_DISTANCE =
            125;


        function resizeCanvas() {

            const dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    1.5
                );


            width =
                window.innerWidth;


            height =
                window.innerHeight;


            canvas.width =
                width * dpr;


            canvas.height =
                height * dpr;


            canvas.style.width =
                width + "px";


            canvas.style.height =
                height + "px";


            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

        }


        resizeCanvas();


        window.addEventListener(
            "resize",
            resizeCanvas,
            {
                passive: true
            }
        );


        for (
            let i = 0;
            i < NODE_COUNT;
            i++
        ) {

            nodes.push({

                x:
                    Math.random() *
                    window.innerWidth,

                y:
                    Math.random() *
                    window.innerHeight,

                vx:
                    (
                        Math.random() -
                        0.5
                    ) * 0.18,

                vy:
                    (
                        Math.random() -
                        0.5
                    ) * 0.18

            });

        }


        let lastFrame = 0;


        function drawNetwork(
            timestamp
        ) {

            if (
                timestamp -
                lastFrame <
                33
            ) {

                requestAnimationFrame(
                    drawNetwork
                );

                return;

            }


            lastFrame =
                timestamp;


            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            nodes.forEach(
                node => {

                    node.x += node.vx;
                    node.y += node.vy;


                    if (
                        node.x < 0 ||
                        node.x > width
                    ) {

                        node.vx *= -1;

                    }


                    if (
                        node.y < 0 ||
                        node.y > height
                    ) {

                        node.vy *= -1;

                    }

                }
            );


            for (
                let i = 0;
                i < nodes.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < nodes.length;
                    j++
                ) {

                    const dx =
                        nodes[i].x -
                        nodes[j].x;


                    const dy =
                        nodes[i].y -
                        nodes[j].y;


                    const distanceSquared =
                        dx * dx +
                        dy * dy;


                    if (
                        distanceSquared <
                        CONNECTION_DISTANCE *
                        CONNECTION_DISTANCE
                    ) {

                        ctx.beginPath();


                        ctx.moveTo(
                            nodes[i].x,
                            nodes[i].y
                        );


                        ctx.lineTo(
                            nodes[j].x,
                            nodes[j].y
                        );


                        ctx.strokeStyle =
                            "rgba(80,80,80,.06)";


                        ctx.lineWidth =
                            0.6;


                        ctx.stroke();

                    }

                }

            }


            nodes.forEach(
                node => {

                    ctx.beginPath();


                    ctx.arc(
                        node.x,
                        node.y,
                        1.2,
                        0,
                        Math.PI * 2
                    );


                    ctx.fillStyle =
                        "rgba(244,121,29,.18)";


                    ctx.fill();

                }
            );


            requestAnimationFrame(
                drawNetwork
            );

        }


        requestAnimationFrame(
            drawNetwork
        );

    }


    /* =====================================================
       CURSOR PARTICLES
    ====================================================== */

    const particleCanvas =
        document.getElementById(
            "cursorParticles"
        );


    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (
        particleCanvas &&
        !isTouchDevice &&
        !reducedMotion
    ) {

        const pctx =
            particleCanvas.getContext(
                "2d"
            );


        let mouseX =
            window.innerWidth / 2;


        let mouseY =
            window.innerHeight / 2;


        let particleWidth =
            window.innerWidth;


        let particleHeight =
            window.innerHeight;


        const PARTICLE_COUNT =
            14;


        const PARTICLE_DISTANCE =
            90;


        const MOUSE_DISTANCE =
            110;


        let mouseInside =
            false;


        function resizeParticleCanvas() {

            const dpr =
                Math.min(
                    window.devicePixelRatio || 1,
                    1.5
                );


            particleWidth =
                window.innerWidth;


            particleHeight =
                window.innerHeight;


            particleCanvas.width =
                particleWidth * dpr;


            particleCanvas.height =
                particleHeight * dpr;


            particleCanvas.style.width =
                particleWidth + "px";


            particleCanvas.style.height =
                particleHeight + "px";


            pctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

        }


        resizeParticleCanvas();


        window.addEventListener(
            "resize",
            resizeParticleCanvas,
            {
                passive: true
            }
        );


        window.addEventListener(
            "mousemove",
            e => {

                mouseX =
                    e.clientX;


                mouseY =
                    e.clientY;


                mouseInside =
                    true;

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                mouseInside =
                    false;


                pctx.clearRect(
                    0,
                    0,
                    particleWidth,
                    particleHeight
                );

            }
        );


        class CursorParticle {

            constructor() {

                this.reset();

            }


            reset() {

                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const radius =
                    50 +
                    Math.random() *
                    100;


                this.x =
                    mouseX +
                    Math.cos(angle) *
                    radius;


                this.y =
                    mouseY +
                    Math.sin(angle) *
                    radius;


                this.vx =
                    (
                        Math.random() -
                        0.5
                    ) * 0.35;


                this.vy =
                    (
                        Math.random() -
                        0.5
                    ) * 0.35;


                this.size =
                    0.8 +
                    Math.random() *
                    1.4;


                this.alpha =
                    0.18 +
                    Math.random() *
                    0.25;

            }


            update() {

                const dx =
                    mouseX -
                    this.x;


                const dy =
                    mouseY -
                    this.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance < 180
                ) {

                    const force =
                        (
                            180 -
                            distance
                        ) / 180;


                    this.vx +=
                        dx *
                        0.00025 *
                        force;


                    this.vy +=
                        dy *
                        0.00025 *
                        force;

                }


                this.vx *=
                    0.985;


                this.vy *=
                    0.985;


                this.x +=
                    this.vx;


                this.y +=
                    this.vy;


                if (
                    distance > 260 ||
                    this.x < -80 ||
                    this.x >
                        particleWidth + 80 ||
                    this.y < -80 ||
                    this.y >
                        particleHeight + 80
                ) {

                    this.reset();

                }

            }


            draw() {

                pctx.beginPath();


                pctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );


                pctx.fillStyle =
                    `rgba(244,121,29,${this.alpha})`;


                pctx.fill();

            }

        }


        const particles = [];


        for (
            let i = 0;
            i < PARTICLE_COUNT;
            i++
        ) {

            particles.push(
                new CursorParticle()
            );

        }


        let lastParticleFrame = 0;


        function drawCursorNetwork(
            timestamp
        ) {

            if (
                timestamp -
                lastParticleFrame <
                33
            ) {

                requestAnimationFrame(
                    drawCursorNetwork
                );

                return;

            }


            lastParticleFrame =
                timestamp;


            pctx.clearRect(
                0,
                0,
                particleWidth,
                particleHeight
            );


            if (!mouseInside) {

                requestAnimationFrame(
                    drawCursorNetwork
                );

                return;

            }


            particles.forEach(
                particle => {

                    particle.update();

                }
            );


            for (
                let i = 0;
                i < particles.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < particles.length;
                    j++
                ) {

                    const a =
                        particles[i];


                    const b =
                        particles[j];


                    const dx =
                        a.x -
                        b.x;


                    const dy =
                        a.y -
                        b.y;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance <
                        PARTICLE_DISTANCE
                    ) {

                        const opacity =
                            (
                                1 -
                                distance /
                                PARTICLE_DISTANCE
                            ) * 0.20;


                        pctx.beginPath();


                        pctx.moveTo(
                            a.x,
                            a.y
                        );


                        pctx.lineTo(
                            b.x,
                            b.y
                        );


                        pctx.strokeStyle =
                            `rgba(244,121,29,${opacity})`;


                        pctx.lineWidth =
                            0.6;


                        pctx.stroke();

                    }

                }

            }


            particles.forEach(
                particle => {

                    const dx =
                        particle.x -
                        mouseX;


                    const dy =
                        particle.y -
                        mouseY;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance <
                        MOUSE_DISTANCE
                    ) {

                        const opacity =
                            (
                                1 -
                                distance /
                                MOUSE_DISTANCE
                            ) * 0.28;


                        pctx.beginPath();


                        pctx.moveTo(
                            particle.x,
                            particle.y
                        );


                        pctx.lineTo(
                            mouseX,
                            mouseY
                        );


                        pctx.strokeStyle =
                            `rgba(244,121,29,${opacity})`;


                        pctx.lineWidth =
                            0.7;


                        pctx.stroke();

                    }

                }
            );


            particles.forEach(
                particle => {

                    particle.draw();

                }
            );


            requestAnimationFrame(
                drawCursorNetwork
            );

        }


        requestAnimationFrame(
            drawCursorNetwork
        );

    }


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ====================================================== */

    if (!isTouchDevice) {

        const magneticElements =
            document.querySelectorAll(
                ".magnetic"
            );


        magneticElements.forEach(
            element => {

                element.addEventListener(
                    "mousemove",
                    e => {

                        const rect =
                            element.getBoundingClientRect();


                        const x =
                            e.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            e.clientY -
                            rect.top -
                            rect.height / 2;


                        element.style.transform =
                            `translate(${x * 0.08}px, ${y * 0.08}px)`;

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       SERVICE CARD HOVER TILT
    ====================================================== */

    if (!isTouchDevice) {

        const tiltCards =
            document.querySelectorAll(
                ".service-card, .detail-card, .stat-item"
            );


        tiltCards.forEach(
            card => {

                card.addEventListener(
                    "mousemove",
                    e => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            e.clientX -
                            rect.left;


                        const y =
                            e.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;


                        const centerY =
                            rect.height / 2;


                        const rotateX =
                            (
                                y -
                                centerY
                            ) /
                            centerY *
                            -1.2;


                        const rotateY =
                            (
                                x -
                                centerX
                            ) /
                            centerX *
                            1.2;


                        card.style.transform =
                            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       HERO LABEL INTERACTION
    ====================================================== */

    const heroLabels =
        document.querySelectorAll(
            "[data-service-target]"
        );


    heroLabels.forEach(
        label => {

            label.addEventListener(
                "click",
                () => {

                    const target =
                        label.dataset.serviceTarget;


                    const card =
                        document.querySelector(
                            `.service-card[data-service="${target}"]`
                        );


                    if (!card) {

                        return;

                    }


                    card.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                    card.classList.add(
                        "service-focus"
                    );


                    setTimeout(
                        () => {

                            card.classList.remove(
                                "service-focus"
                            );

                        },
                        1800
                    );

                }
            );

        }
    );

/* =====================================================
   CIVIL ENGINEERING IMAGE LIGHTBOX
====================================================== */

const civilGalleryItems =
    document.querySelectorAll(
        ".civil-gallery-item"
    );

const civilLightbox =
    document.getElementById(
        "civilLightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxCategory =
    document.getElementById(
        "lightboxCategory"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


if (
    civilGalleryItems.length &&
    civilLightbox &&
    lightboxImage
) {

    civilGalleryItems.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    const image =
                        item.dataset.image;

                    const title =
                        item.dataset.title ||
                        "Civil Engineering";

                    lightboxImage.src =
                        image;

                    lightboxImage.alt =
                        title;

                    if (lightboxTitle) {

                        lightboxTitle.textContent =
                            title;

                    }

                    if (lightboxCategory) {

                        lightboxCategory.textContent =
                            "CIVIL ENGINEERING";

                    }


                    civilLightbox.classList.add(
                        "active"
                    );


                    civilLightbox.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );


    function closeCivilLightbox() {

        civilLightbox.classList.remove(
            "active"
        );


        civilLightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


        setTimeout(
            () => {

                lightboxImage.src = "";

            },
            300
        );

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeCivilLightbox
        );

    }


    /*
       Close when clicking
       outside the image
    */

    civilLightbox.addEventListener(
        "click",
        e => {

            if (
                e.target ===
                civilLightbox
            ) {

                closeCivilLightbox();

            }

        }
    );


    /*
       ESC key
    */

    document.addEventListener(
        "keydown",
        e => {

            if (
                e.key === "Escape" &&
                civilLightbox.classList.contains(
                    "active"
                )
            ) {

                closeCivilLightbox();

            }

        }
    );

}
    /* =====================================================
       CONTACT FORM — EMAILJS
    ====================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const formNote =
        document.getElementById(
            "formNote"
        );


    const submitBtn =
        document.getElementById(
            "submitBtn"
        );


    const submitText =
        document.getElementById(
            "submitText"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();


                console.log(
                    "================================="
                );

                console.log(
                    "SURREAL CONTACT FORM SUBMITTED"
                );

                console.log(
                    "================================="
                );


                /* -----------------------------------------
                   CHECK EMAILJS
                ------------------------------------------ */

                if (
                    !emailJSReady ||
                    typeof emailjs === "undefined"
                ) {

                    console.error(
                        "EmailJS is not ready."
                    );


                    if (formNote) {

                        formNote.textContent =
                            "Email service is not ready. Please refresh the page and try again.";

                        formNote.style.color =
                            "#d33";

                    }


                    return;

                }


                /* -----------------------------------------
                   VALIDATE FORM
                ------------------------------------------ */

                const nameInput =
                    contactForm.querySelector(
                        '[name="name"]'
                    );


                const emailInput =
                    contactForm.querySelector(
                        '[name="email"]'
                    );


                const companyInput =
                    contactForm.querySelector(
                        '[name="company"]'
                    );


                const phoneInput =
                    contactForm.querySelector(
                        '[name="phone"]'
                    );


                const messageInput =
                    contactForm.querySelector(
                        '[name="message"]'
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";


                const company =
                    companyInput
                        ? companyInput.value.trim()
                        : "";


                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";


                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    if (formNote) {

                        formNote.textContent =
                            "Please fill in your name, email and message.";

                        formNote.style.color =
                            "#d33";

                    }


                    return;

                }


                /* -----------------------------------------
                   BUTTON STATE
                ------------------------------------------ */

                if (submitBtn) {

                    submitBtn.disabled =
                        true;

                }


                if (submitText) {

                    submitText.textContent =
                        "SENDING...";

                }


                if (formNote) {

                    formNote.textContent =
                        "Sending your message...";

                    formNote.style.color =
                        "";

                }


                /* -----------------------------------------
                   CREATE EMAILJS PARAMETERS
                ------------------------------------------ */

                const templateParams = {

                    name: name,

                    email: email,

                    company: company || "Not provided",

                    phone: phone || "Not provided",

                    title: "New Project Inquiry",

                    message: message

                };


                console.log(
                    "EmailJS Service:",
                    EMAILJS_SERVICE_ID
                );


                console.log(
                    "EmailJS Template:",
                    EMAILJS_TEMPLATE_ID
                );


                console.log(
                    "EmailJS Parameters:",
                    templateParams
                );


                /* -----------------------------------------
                   SEND EMAIL
                   
                   send() is used instead of sendForm()
                   so we explicitly control every variable.
                ------------------------------------------ */

                try {

                    const response =
                        await emailjs.send(

                            EMAILJS_SERVICE_ID,

                            EMAILJS_TEMPLATE_ID,

                            templateParams

                        );


                    console.log(
                        "================================="
                    );

                    console.log(
                        "EMAILJS SUCCESS"
                    );

                    console.log(
                        "Status:",
                        response.status
                    );

                    console.log(
                        "Text:",
                        response.text
                    );

                    console.log(
                        "================================="
                    );


                    if (formNote) {

                        formNote.textContent =
                            "Message sent successfully! We'll get back to you soon.";

                        formNote.style.color =
                            "#4f9d69";

                    }


                    contactForm.reset();

                }


                /* -----------------------------------------
                   EMAILJS ERROR
                ------------------------------------------ */

                catch (error) {

                    console.error(
                        "================================="
                    );

                    console.error(
                        "EMAILJS ERROR"
                    );

                    console.error(
                        "Error object:",
                        error
                    );

                    console.error(
                        "Status:",
                        error?.status
                    );

                    console.error(
                        "Text:",
                        error?.text
                    );

                    console.error(
                        "================================="
                    );


                    let errorMessage =
                        "EmailJS rejected the request. Please check your EmailJS service and template settings.";


                    /*
                     * EmailJS commonly returns:
                     *
                     * error.status
                     * error.text
                     *
                     * We display the actual EmailJS
                     * error when available.
                     */

                    if (
                        error &&
                        error.text
                    ) {

                        errorMessage =
                            "EmailJS error: " +
                            error.text;

                    }


                    if (formNote) {

                        formNote.textContent =
                            errorMessage;

                        formNote.style.color =
                            "#d33";

                    }

                }


                /* -----------------------------------------
                   RESTORE BUTTON
                ------------------------------------------ */

                finally {

                    if (submitBtn) {

                        submitBtn.disabled =
                            false;

                    }


                    if (submitText) {

                        submitText.textContent =
                            "SEND MESSAGE";

                    }

                }

            }
        );

    }


    /* =====================================================
       NEWSLETTER
    ====================================================== */

    const newsletterForm =
        document.getElementById(
            "newsletterForm"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            e => {

                e.preventDefault();


                const input =
                    newsletterForm.querySelector(
                        "input"
                    );


                const email =
                    input
                        ? input.value.trim()
                        : "";


                if (!email) {

                    return;

                }


                alert(
                    "Thank you for subscribing!"
                );


                newsletterForm.reset();

            }
        );

    }


    /* =====================================================
       IMAGE ERROR FALLBACK
    ====================================================== */

    document
        .querySelectorAll("img")
        .forEach(
            img => {

                img.addEventListener(
                    "error",
                    function () {

                        if (
                            this.dataset
                                .fallbackApplied
                        ) {

                            return;

                        }


                        this.dataset
                            .fallbackApplied =
                            "true";


                        this.src =
                            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85";

                    }
                );

            }
        );


    /* =====================================================
       SERVICE FOCUS STYLE
    ====================================================== */

    const serviceFocusStyle =
        document.createElement(
            "style"
        );


    serviceFocusStyle.textContent = `

        .service-focus {

            animation:
                serviceFocusPulse
                1.8s ease;

        }


        @keyframes serviceFocusPulse {

            0% {

                box-shadow:
                    0 0 0 0
                    rgba(244,121,29,.55);

            }


            40% {

                box-shadow:
                    0 0 0 14px
                    rgba(244,121,29,.12);

            }


            100% {

                box-shadow:
                    0 0 0 30px
                    rgba(244,121,29,0);

            }

        }

    `;


    document.head.appendChild(
        serviceFocusStyle
    );


    /* =====================================================
       FINAL INITIALIZATION
    ====================================================== */

    console.log(
        "SURREAL website JavaScript loaded successfully."
    );

});