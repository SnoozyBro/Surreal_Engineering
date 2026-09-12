/* =========================================================
   SURREAL ENGINEERING
   COMPLETE HOMEPAGE JAVASCRIPT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        "use strict";


        /* =====================================================
           GLOBAL
        ====================================================== */

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        const isTouchDevice =
            window.matchMedia(
                "(pointer: coarse)"
            ).matches;



        /* =====================================================
           EMAILJS
        ====================================================== */

        const EMAILJS_PUBLIC_KEY =
            "fNqiot-ag2AMAvrSp";


        const EMAILJS_SERVICE_ID =
            "service_uxvq9eq";


        const EMAILJS_TEMPLATE_ID =
            "template_tj0wsdg";


        let emailJSReady =
            false;


        if (
            typeof emailjs !==
            "undefined"
        ) {

            try {

                emailjs.init({
                    publicKey:
                        EMAILJS_PUBLIC_KEY
                });


                emailJSReady =
                    true;

            }

            catch (error) {

                console.error(
                    "EmailJS initialization failed:",
                    error
                );

            }

        }



        /* =====================================================
           HEADER
        ====================================================== */

        const header =
            document.querySelector(
                ".site-header"
            );


        function updateHeader() {

            if (!header) {
                return;
            }


            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );

        }


        updateHeader();


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive:
                    true
            }
        );



        /* =====================================================
           HIDE / SHOW HEADER
        ====================================================== */

        let lastScrollY =
            window.scrollY;


        let navbarTicking =
            false;


        function handleNavbarDirection() {

            if (!header) {

                navbarTicking =
                    false;

                return;

            }


            const currentScroll =
                window.scrollY;


            if (
                currentScroll <=
                80
            ) {

                header.classList.remove(
                    "nav-hidden"
                );


                lastScrollY =
                    currentScroll;


                navbarTicking =
                    false;


                return;

            }


            if (
                currentScroll >
                lastScrollY + 6
            ) {

                header.classList.add(
                    "nav-hidden"
                );

            }

            else if (
                currentScroll <
                lastScrollY - 6
            ) {

                header.classList.remove(
                    "nav-hidden"
                );

            }


            lastScrollY =
                currentScroll;


            navbarTicking =
                false;

        }


        window.addEventListener(
            "scroll",
            () => {

                if (
                    navbarTicking
                ) {

                    return;

                }


                navbarTicking =
                    true;


                requestAnimationFrame(
                    handleNavbarDirection
                );

            },
            {
                passive:
                    true
            }
        );



        /* =====================================================
           MOBILE MENU
        ====================================================== */

        const hamburger =
            document.getElementById(
                "hamburger"
            );


        const mainNav =
            document.getElementById(
                "mainNav"
            );


        function closeMobileNav() {

            if (mainNav) {

                mainNav.classList.remove(
                    "open"
                );

            }


            if (hamburger) {

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            document.body
                .classList
                .remove(
                    "nav-open"
                );

        }


        if (
            hamburger &&
            mainNav
        ) {

            hamburger.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const open =
                        mainNav
                            .classList
                            .toggle(
                                "open"
                            );


                    hamburger.setAttribute(
                        "aria-expanded",
                        String(open)
                    );


                    document.body
                        .classList
                        .toggle(
                            "nav-open",
                            open
                        );

                }
            );

        }


        document.addEventListener(
            "click",
            event => {

                if (
                    !mainNav ||
                    !hamburger
                ) {

                    return;

                }


                if (
                    !mainNav
                        .classList
                        .contains(
                            "open"
                        )
                ) {

                    return;

                }


                if (
                    !mainNav.contains(
                        event.target
                    ) &&
                    !hamburger.contains(
                        event.target
                    )
                ) {

                    closeMobileNav();

                }

            }
        );



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


        function closeSearch() {

            if (searchBox) {

                searchBox.classList.remove(
                    "open"
                );

            }

        }


        if (
            searchToggle &&
            searchBox
        ) {

            searchToggle.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    searchBox.classList.toggle(
                        "open"
                    );


                    if (
                        searchBox
                            .classList
                            .contains(
                                "open"
                            ) &&
                        siteSearch
                    ) {

                        setTimeout(
                            () => {

                                siteSearch.focus();

                            },
                            80
                        );

                    }

                }
            );

        }



        if (siteSearch) {

            siteSearch.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key !==
                        "Enter"
                    ) {

                        return;

                    }


                    const query =
                        siteSearch
                            .value
                            .trim()
                            .toLowerCase();


                    if (!query) {
                        return;
                    }


                    const searchable =
                        document.querySelectorAll(
                            "h1,h2,h3,h4,p,li"
                        );


                    let found =
                        null;


                    for (
                        const element
                        of searchable
                    ) {

                        if (
                            element
                                .textContent
                                .toLowerCase()
                                .includes(
                                    query
                                )
                        ) {

                            found =
                                element;

                            break;

                        }

                    }


                    if (!found) {

                        alert(
                            "No matching content was found."
                        );

                        return;

                    }


                    found.scrollIntoView({

                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth",

                        block:
                            "center"

                    });


                    found.classList.add(
                        "search-highlight"
                    );


                    setTimeout(
                        () => {

                            found.classList.remove(
                                "search-highlight"
                            );

                        },
                        2200
                    );


                    closeSearch();

                }
            );

        }



        /* =====================================================
           SMOOTH LINKS
        ====================================================== */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        event => {

                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                !href ||
                                href === "#"
                            ) {

                                return;

                            }


                            let target =
                                null;


                            try {

                                target =
                                    document.querySelector(
                                        href
                                    );

                            }

                            catch {

                                return;

                            }


                            if (!target) {
                                return;
                            }


                            event.preventDefault();


                            const headerHeight =
                                header
                                    ? header.offsetHeight
                                    : 0;


                            const targetTop =

                                target
                                    .getBoundingClientRect()
                                    .top +

                                window.pageYOffset -

                                headerHeight -

                                10;


                            window.scrollTo({

                                top:
                                    targetTop,

                                behavior:
                                    reducedMotion
                                        ? "auto"
                                        : "smooth"

                            });


                            closeMobileNav();

                        }
                    );

                }
            );



        /* =====================================================
           ACTIVE NAV
        ====================================================== */

        const navLinks =
            document.querySelectorAll(
                ".main-nav .nav-link"
            );


        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const navObserver =
                new IntersectionObserver(

                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {

                                    return;

                                }


                                navLinks.forEach(
                                    link => {

                                        link.classList.remove(
                                            "active"
                                        );


                                        if (
                                            link.getAttribute(
                                                "href"
                                            ) ===
                                            "#" +
                                            entry.target.id
                                        ) {

                                            link.classList.add(
                                                "active"
                                            );

                                        }

                                    }
                                );

                            }
                        );

                    },

                    {
                        rootMargin:
                            "-30% 0px -60% 0px"
                    }

                );


            sections.forEach(
                section => {

                    navObserver.observe(
                        section
                    );

                }
            );

        }



        /* =====================================================
           REVEAL
        ====================================================== */

        const revealItems =
            document.querySelectorAll(
                ".reveal-item"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const revealObserver =
                new IntersectionObserver(

                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {

                                    return;

                                }


                                entry.target.classList.add(
                                    "visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },

                    {

                        threshold:
                            .1,

                        rootMargin:
                            "0px 0px -35px 0px"

                    }

                );


            revealItems.forEach(
                item => {

                    revealObserver.observe(
                        item
                    );

                }
            );

        }

        else {

            revealItems.forEach(
                item => {

                    item.classList.add(
                        "visible"
                    );

                }
            );

        }



        /* =====================================================
           COUNTERS
        ====================================================== */

        const counterSection =
            document.querySelector(
                ".hero-stats"
            );


        const counters =
            document.querySelectorAll(
                ".counter"
            );


        let countersStarted =
            false;


        function animateCounters() {

            if (
                countersStarted
            ) {

                return;

            }


            countersStarted =
                true;


            counters.forEach(
                counter => {

                    const target =
                        Number(
                            counter.dataset.target
                        );


                    if (
                        Number.isNaN(
                            target
                        )
                    ) {

                        return;

                    }


                    if (reducedMotion) {

                        counter.textContent =
                            target;

                        return;

                    }


                    const duration =
                        1300;


                    const start =
                        performance.now();


                    function update(
                        now
                    ) {

                        const progress =
                            Math.min(

                                (
                                    now -
                                    start
                                ) /
                                duration,

                                1

                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 -
                                progress,
                                3
                            );


                        counter.textContent =
                            Math.floor(
                                target *
                                eased
                            );


                        if (
                            progress <
                            1
                        ) {

                            requestAnimationFrame(
                                update
                            );

                        }

                        else {

                            counter.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        update
                    );

                }
            );

        }


        if (
            counterSection &&
            "IntersectionObserver"
            in window
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
                        threshold:
                            .25
                    }

                );


            counterObserver.observe(
                counterSection
            );

        }

        else {

            animateCounters();

        }



        /* =====================================================
           HERO NETWORK
        ====================================================== */

        const networkCanvas =
            document.getElementById(
                "heroNetwork"
            );


        if (
            networkCanvas &&
            !reducedMotion
        ) {

            const ctx =
                networkCanvas
                    .getContext(
                        "2d"
                    );


            let width =
                0;


            let height =
                0;


            const nodes =
                [];


            const nodeCount =
                window.innerWidth <
                700
                    ? 15
                    : 27;


            function resizeNetwork() {

                const dpr =
                    Math.min(
                        window.devicePixelRatio ||
                        1,
                        1.5
                    );


                width =
                    networkCanvas.clientWidth;


                height =
                    networkCanvas.clientHeight;


                networkCanvas.width =
                    width *
                    dpr;


                networkCanvas.height =
                    height *
                    dpr;


                ctx.setTransform(
                    dpr,
                    0,
                    0,
                    dpr,
                    0,
                    0
                );

            }


            resizeNetwork();


            for (
                let i = 0;
                i < nodeCount;
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
                            .5
                        ) *
                        .18,

                    vy:
                        (
                            Math.random() -
                            .5
                        ) *
                        .18

                });

            }


            function renderNetwork() {

                ctx.clearRect(
                    0,
                    0,
                    width,
                    height
                );


                nodes.forEach(
                    node => {

                        node.x +=
                            node.vx;

                        node.y +=
                            node.vy;


                        if (
                            node.x < 0 ||
                            node.x > width
                        ) {

                            node.vx *=
                                -1;

                        }


                        if (
                            node.y < 0 ||
                            node.y > height
                        ) {

                            node.vy *=
                                -1;

                        }

                    }
                );


                for (
                    let i = 0;
                    i < nodes.length;
                    i++
                ) {

                    for (
                        let j =
                            i + 1;
                        j <
                        nodes.length;
                        j++
                    ) {

                        const dx =
                            nodes[i].x -
                            nodes[j].x;


                        const dy =
                            nodes[i].y -
                            nodes[j].y;


                        const distance =
                            Math.sqrt(
                                dx * dx +
                                dy * dy
                            );


                        if (
                            distance <
                            130
                        ) {

                            const opacity =
                                (
                                    1 -
                                    distance /
                                    130
                                ) *
                                .09;


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
                                `rgba(246,169,27,${opacity})`;


                            ctx.lineWidth =
                                .7;


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
                            1.25,
                            0,
                            Math.PI *
                            2
                        );


                        ctx.fillStyle =
                            "rgba(246,169,27,.24)";


                        ctx.fill();

                    }
                );


                requestAnimationFrame(
                    renderNetwork
                );

            }


            renderNetwork();


            window.addEventListener(
                "resize",
                resizeNetwork,
                {
                    passive:
                        true
                }
            );

        }



        /* =====================================================
           MAGNETIC BUTTONS
        ====================================================== */

        if (
            !isTouchDevice &&
            !reducedMotion
        ) {

            document
                .querySelectorAll(
                    ".magnetic"
                )
                .forEach(
                    element => {

                        element.addEventListener(
                            "mousemove",
                            event => {

                                const rect =
                                    element
                                        .getBoundingClientRect();


                                const x =

                                    event.clientX -

                                    rect.left -

                                    rect.width /
                                    2;


                                const y =

                                    event.clientY -

                                    rect.top -

                                    rect.height /
                                    2;


                                element.style.transform =
                                    `translate(${x * .07}px, ${y * .07}px)`;

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
           GENERAL TILT
        ====================================================== */

        if (
            !isTouchDevice &&
            !reducedMotion
        ) {

            document
                .querySelectorAll(
                    ".interactive-tilt"
                )
                .forEach(
                    card => {

                        card.addEventListener(
                            "mousemove",
                            event => {

                                const rect =
                                    card
                                        .getBoundingClientRect();


                                const x =
                                    event.clientX -
                                    rect.left;


                                const y =
                                    event.clientY -
                                    rect.top;


                                const rotateX =

                                    (
                                        y -
                                        rect.height /
                                        2
                                    ) /

                                    (
                                        rect.height /
                                        2
                                    ) *

                                    -1.05;


                                const rotateY =

                                    (
                                        x -
                                        rect.width /
                                        2
                                    ) /

                                    (
                                        rect.width /
                                        2
                                    ) *

                                    1.05;


                                card.style.transform =
                                    `
                                    perspective(1100px)
                                    rotateX(${rotateX}deg)
                                    rotateY(${rotateY}deg)
                                    translateY(-5px)
                                    `;

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
           HOW WE HELP INTERACTION
        ====================================================== */

        const helpCards =
            document.querySelectorAll(
                ".interactive-card"
            );


        helpCards.forEach(
            card => {

                card.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            card
                                .getBoundingClientRect();


                        const x =

                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width *
                            100;


                        const y =

                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height *
                            100;


                        card.style.setProperty(
                            "--pointer-x",
                            `${x}%`
                        );


                        card.style.setProperty(
                            "--pointer-y",
                            `${y}%`
                        );

                    }
                );

            }
        );



        if (
            !isTouchDevice &&
            !reducedMotion
        ) {

            helpCards.forEach(
                card => {

                    card.addEventListener(
                        "mousemove",
                        event => {

                            const rect =
                                card
                                    .getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left;


                            const y =
                                event.clientY -
                                rect.top;


                            const rotateX =

                                (
                                    y -
                                    rect.height /
                                    2
                                ) /
                                rect.height *
                                -4;


                            const rotateY =

                                (
                                    x -
                                    rect.width /
                                    2
                                ) /
                                rect.width *
                                4;


                            card.style.transform =
                                `
                                perspective(900px)
                                rotateX(${rotateX}deg)
                                rotateY(${rotateY}deg)
                                translateY(-7px)
                                `;

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
           PROCESS INTERACTION
        ====================================================== */

        const processSteps =
            Array.from(
                document.querySelectorAll(
                    ".process-step"
                )
            );


        const processProgress =
            document.getElementById(
                "processLineProgress"
            );


        function activateProcessStep(
            index
        ) {

            processSteps.forEach(
                (
                    step,
                    stepIndex
                ) => {

                    step.classList.toggle(
                        "active",
                        stepIndex === index
                    );

                }
            );


            if (
                processProgress
            ) {

                const progress =

                    processSteps.length <=
                    1

                        ? 100

                        : (
                            index /
                            (
                                processSteps.length -
                                1
                            )
                        ) *
                        100;


                processProgress.style.width =
                    `${progress}%`;

            }

        }


        processSteps.forEach(
            (
                step,
                index
            ) => {

                const trigger =
                    step.querySelector(
                        ".process-step-trigger"
                    );


                if (trigger) {

                    trigger.addEventListener(
                        "click",
                        () => {

                            activateProcessStep(
                                index
                            );

                        }
                    );

                }


                step.addEventListener(
                    "mouseenter",
                    () => {

                        if (
                            !isTouchDevice
                        ) {

                            activateProcessStep(
                                index
                            );

                        }

                    }
                );


                step.addEventListener(
                    "focus",
                    () => {

                        activateProcessStep(
                            index
                        );

                    }
                );

            }
        );


        activateProcessStep(
            0
        );



        /* =====================================================
           PROJECT DATA
        ====================================================== */

        const projectData = [

            /* =================================================
               CIVIL
            ================================================= */

            {

                discipline:
                    "civil",

                category:
                    "CIVIL ENGINEERING",

                type:
                    "COMMERCIAL DEVELOPMENT",

                title:
                    "Urban Business Complex",

                location:
                    "Commercial development showcase concept",

                image:
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A modern commercial development showcase demonstrating integrated structural coordination, architectural planning, circulation, facade strategy and efficient commercial space organization.",

                tags: [
                    "Structural Design",
                    "Architecture",
                    "Commercial",
                    "Planning"
                ]

            },


            {

                discipline:
                    "civil",

                category:
                    "CIVIL ENGINEERING",

                type:
                    "CONSTRUCTION",

                title:
                    "Integrated Construction Development",

                location:
                    "Construction coordination showcase",

                image:
                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A construction delivery concept covering estimation, site planning, technical coordination, supervision and practical project management from planning through implementation.",

                tags: [
                    "Construction",
                    "Estimation",
                    "Supervision",
                    "Project Coordination"
                ]

            },


            {

                discipline:
                    "civil",

                category:
                    "CIVIL ENGINEERING",

                type:
                    "RESIDENTIAL",

                title:
                    "Kathmandu Family Residence",

                location:
                    "Kathmandu, Nepal — Local residential showcase concept",

                image:
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A Nepal-focused residential house concept designed around comfortable family living, efficient spatial planning, natural light, climate response and practical urban construction requirements.",

                tags: [
                    "Nepal",
                    "Residential",
                    "House Design",
                    "Architecture"
                ]

            },


            {

                discipline:
                    "civil",

                category:
                    "CIVIL ENGINEERING",

                type:
                    "INFRASTRUCTURE",

                title:
                    "Municipal Infrastructure Upgrade",

                location:
                    "Infrastructure planning showcase concept",

                image:
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A municipal infrastructure concept focused on organized site development, accessibility, engineering coordination and long-term usability of public infrastructure.",

                tags: [
                    "Infrastructure",
                    "Site Planning",
                    "Civil Works",
                    "Development"
                ]

            },


            {

                discipline:
                    "civil",

                category:
                    "CIVIL ENGINEERING",

                type:
                    "ARCHITECTURE & INTERIOR",

                title:
                    "Contemporary Corporate Workspace",

                location:
                    "Commercial interior showcase concept",

                image:
                    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A contemporary corporate workspace concept combining architectural planning, functional interiors, collaboration areas and flexible working environments.",

                tags: [
                    "Architecture",
                    "Interior",
                    "Workspace",
                    "Commercial"
                ]

            },


            /* =================================================
               IT
            ================================================= */

            {

                discipline:
                    "it",

                category:
                    "IT & DIGITAL",

                type:
                    "WEB APPLICATION",

                title:
                    "Enterprise Management Platform",

                location:
                    "Enterprise software showcase concept",

                image:
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A centralized web platform concept for managing customers, business operations, analytics, reporting and team workflows from a secure digital workspace.",

                tags: [
                    "Web Application",
                    "CRM",
                    "Dashboard",
                    "Analytics"
                ]

            },


            {

                discipline:
                    "it",

                category:
                    "IT & DIGITAL",

                type:
                    "PROPERTY WEBSITE",

                title:
                    "Nepal Property Marketplace",

                location:
                    "Nepal — Local property platform showcase concept",

                image:
                    "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A Nepal-focused property marketplace concept where users can browse, search and compare houses, land, apartments and commercial properties with location-aware listings.",

                tags: [
                    "Nepal",
                    "Property Website",
                    "Listings",
                    "Search"
                ]

            },


            {

                discipline:
                    "it",

                category:
                    "IT & DIGITAL",

                type:
                    "CORPORATE WEBSITE",

                title:
                    "Modern Corporate Web Experience",

                location:
                    "Corporate website showcase concept",

                image:
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A polished corporate website concept combining brand storytelling, responsive interfaces, lead-generation features, content management and high-performance frontend development.",

                tags: [
                    "Website",
                    "Responsive",
                    "CMS",
                    "Lead Generation"
                ]

            },


            {

                discipline:
                    "it",

                category:
                    "IT & DIGITAL",

                type:
                    "BUSINESS AUTOMATION",

                title:
                    "Business Workflow Automation",

                location:
                    "Operations platform showcase concept",

                image:
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A custom digital workflow concept connecting routine business tasks, reporting, records and approvals to reduce repetitive manual work and improve operational visibility.",

                tags: [
                    "Automation",
                    "Workflow",
                    "Internal Tools",
                    "Software"
                ]

            },


            {

                discipline:
                    "it",

                category:
                    "IT & DIGITAL",

                type:
                    "CYBER SECURITY",

                title:
                    "Secure Business Infrastructure",

                location:
                    "Security infrastructure showcase concept",

                image:
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=92",

                description:
                    "A digital security architecture concept covering access control, infrastructure protection, data security, system hardening and practical safeguards for company environments.",

                tags: [
                    "Cyber Security",
                    "Data Security",
                    "Access Control",
                    "Infrastructure"
                ]

            }

        ];



        /* =====================================================
           PROJECT MODAL ELEMENTS
        ====================================================== */

        const projectModal =
            document.getElementById(
                "projectModal"
            );


        const projectModalClose =
            document.getElementById(
                "projectModalClose"
            );


        const modalImage =
            document.getElementById(
                "modalProjectImage"
            );


        const modalCategory =
            document.getElementById(
                "modalProjectCategory"
            );


        const modalType =
            document.getElementById(
                "modalProjectType"
            );


        const modalTitle =
            document.getElementById(
                "modalProjectTitle"
            );


        const modalLocation =
            document.getElementById(
                "modalProjectLocation"
            );


        const modalDescription =
            document.getElementById(
                "modalProjectDescription"
            );


        const modalTags =
            document.getElementById(
                "modalProjectTags"
            );


        const modalCurrent =
            document.getElementById(
                "modalCurrentProject"
            );


        const modalTotal =
            document.getElementById(
                "modalTotalProjects"
            );


        const modalPrev =
            document.getElementById(
                "modalPrev"
            );


        const modalNext =
            document.getElementById(
                "modalNext"
            );


        const modalMobilePrev =
            document.getElementById(
                "modalMobilePrev"
            );


        const modalMobileNext =
            document.getElementById(
                "modalMobileNext"
            );


        const modalDiscipline =
            document.getElementById(
                "modalProjectDiscipline"
            );


        const modalIcon =
            document.getElementById(
                "modalProjectIcon"
            );


        const showcaseCards =
            document.querySelectorAll(
                ".showcase-card"
            );


        let currentProjectIndex =
            0;


        let currentDiscipline =
            "civil";


        let lastFocusedProject =
            null;



        /* =====================================================
           DISCIPLINE INDEXES
        ====================================================== */

        function getCurrentDisciplineIndexes() {

            return projectData

                .map(
                    (
                        project,
                        index
                    ) => ({

                        project,
                        index

                    })
                )

                .filter(
                    item =>

                        item
                            .project
                            .discipline ===
                        currentDiscipline

                )

                .map(
                    item =>
                        item.index
                );

        }



        /* =====================================================
           RENDER MODAL
        ====================================================== */

        function renderProject(
            index
        ) {

            const project =
                projectData[index];


            if (!project) {
                return;
            }


            currentProjectIndex =
                index;


            currentDiscipline =
                project.discipline;


            if (modalImage) {

                modalImage.style.opacity =
                    "0";


                modalImage.style.transform =
                    "scale(1.025)";


                const preload =
                    new Image();


                preload.onload =
                    () => {

                        modalImage.src =
                            project.image;


                        modalImage.alt =
                            project.title;


                        requestAnimationFrame(
                            () => {

                                modalImage.style.opacity =
                                    "1";


                                modalImage.style.transform =
                                    "scale(1)";

                            }
                        );

                    };


                preload.src =
                    project.image;

            }


            if (modalCategory) {

                modalCategory.textContent =
                    project.category;


                modalCategory.style.background =

                    project.discipline ===
                    "civil"

                        ? "#f6a91b"

                        : "#9c86ff";

            }


            if (modalType) {

                modalType.textContent =
                    project.type;


                modalType.style.color =

                    project.discipline ===
                    "civil"

                        ? "#f4791d"

                        : "#7357d9";

            }


            if (modalTitle) {

                modalTitle.textContent =
                    project.title;

            }


            if (modalLocation) {

                modalLocation.textContent =
                    project.location;

            }


            if (modalDescription) {

                modalDescription.textContent =
                    project.description;

            }


            if (modalTags) {

                modalTags.innerHTML =
                    "";


                project.tags.forEach(
                    tag => {

                        const element =
                            document.createElement(
                                "span"
                            );


                        element.textContent =
                            tag;


                        modalTags.appendChild(
                            element
                        );

                    }
                );

            }


            if (modalDiscipline) {

                modalDiscipline.textContent =

                    project.discipline ===
                    "civil"

                        ? "Civil Engineering"

                        : "IT & Digital";

            }


            if (modalIcon) {

                modalIcon.className =

                    project.discipline ===
                    "civil"

                        ? "fa-solid fa-building"

                        : "fa-solid fa-laptop-code";

            }


            const disciplineIndexes =
                getCurrentDisciplineIndexes();


            const position =
                disciplineIndexes.indexOf(
                    index
                );


            if (modalCurrent) {

                modalCurrent.textContent =
                    String(
                        position +
                        1
                    ).padStart(
                        2,
                        "0"
                    );

            }


            if (modalTotal) {

                modalTotal.textContent =
                    String(
                        disciplineIndexes.length
                    ).padStart(
                        2,
                        "0"
                    );

            }

        }



        /* =====================================================
           OPEN PROJECT
        ====================================================== */

        function openProject(
            index,
            source = null
        ) {

            if (!projectModal) {
                return;
            }


            lastFocusedProject =
                source;


            renderProject(
                index
            );


            projectModal.classList.add(
                "active"
            );


            projectModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "modal-open"
            );


            if (projectModalClose) {

                setTimeout(
                    () => {

                        projectModalClose.focus();

                    },
                    100
                );

            }

        }



        /* =====================================================
           CLOSE PROJECT
        ====================================================== */

        function closeProject() {

            if (!projectModal) {
                return;
            }


            projectModal.classList.remove(
                "active"
            );


            projectModal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "modal-open"
            );


            if (lastFocusedProject) {

                lastFocusedProject.focus();

            }

        }



        /* =====================================================
           NEXT / PREVIOUS BY DISCIPLINE
        ====================================================== */

        function nextProject() {

            const indexes =
                getCurrentDisciplineIndexes();


            let position =
                indexes.indexOf(
                    currentProjectIndex
                );


            position =
                (
                    position +
                    1
                ) %
                indexes.length;


            renderProject(
                indexes[position]
            );

        }


        function previousProject() {

            const indexes =
                getCurrentDisciplineIndexes();


            let position =
                indexes.indexOf(
                    currentProjectIndex
                );


            position =
                (
                    position -
                    1 +
                    indexes.length
                ) %
                indexes.length;


            renderProject(
                indexes[position]
            );

        }



        /* =====================================================
           PROJECT CARD EVENTS
        ====================================================== */

        showcaseCards.forEach(
            card => {

                const index =
                    Number(
                        card.dataset
                            .projectIndex
                    );


                card.addEventListener(
                    "click",
                    () => {

                        openProject(
                            index,
                            card
                        );

                    }
                );


                card.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key ===
                            "Enter" ||
                            event.key ===
                            " "
                        ) {

                            event.preventDefault();


                            openProject(
                                index,
                                card
                            );

                        }

                    }
                );

            }
        );



        if (projectModalClose) {

            projectModalClose.addEventListener(
                "click",
                closeProject
            );

        }


        if (modalPrev) {

            modalPrev.addEventListener(
                "click",
                previousProject
            );

        }


        if (modalNext) {

            modalNext.addEventListener(
                "click",
                nextProject
            );

        }


        if (modalMobilePrev) {

            modalMobilePrev.addEventListener(
                "click",
                previousProject
            );

        }


        if (modalMobileNext) {

            modalMobileNext.addEventListener(
                "click",
                nextProject
            );

        }


        document
            .querySelectorAll(
                "[data-project-close]"
            )
            .forEach(
                element => {

                    element.addEventListener(
                        "click",
                        closeProject
                    );

                }
            );



        /* =====================================================
           KEYBOARD
        ====================================================== */

        document.addEventListener(
            "keydown",
            event => {

                const modalOpen =

                    projectModal &&

                    projectModal
                        .classList
                        .contains(
                            "active"
                        );


                if (modalOpen) {

                    if (
                        event.key ===
                        "Escape"
                    ) {

                        closeProject();

                        return;

                    }


                    if (
                        event.key ===
                        "ArrowRight"
                    ) {

                        nextProject();

                        return;

                    }


                    if (
                        event.key ===
                        "ArrowLeft"
                    ) {

                        previousProject();

                        return;

                    }

                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeMobileNav();

                    closeSearch();

                }

            }
        );



        /* =====================================================
           MOBILE SWIPE
        ====================================================== */

        const modalMedia =
            document.querySelector(
                ".project-modal-media"
            );


        let touchStartX =
            0;


        if (modalMedia) {

            modalMedia.addEventListener(
                "touchstart",
                event => {

                    touchStartX =
                        event
                            .changedTouches[0]
                            .screenX;

                },
                {
                    passive:
                        true
                }
            );


            modalMedia.addEventListener(
                "touchend",
                event => {

                    const touchEndX =
                        event
                            .changedTouches[0]
                            .screenX;


                    const difference =
                        touchStartX -
                        touchEndX;


                    if (
                        Math.abs(
                            difference
                        ) <
                        55
                    ) {

                        return;

                    }


                    if (
                        difference >
                        0
                    ) {

                        nextProject();

                    }

                    else {

                        previousProject();

                    }

                },
                {
                    passive:
                        true
                }
            );

        }



        /* =====================================================
           RIPPLE
        ====================================================== */

        document
            .querySelectorAll(
                ".btn"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "pointerdown",
                        event => {

                            if (reducedMotion) {
                                return;
                            }


                            const rect =
                                button
                                    .getBoundingClientRect();


                            const size =
                                Math.max(
                                    rect.width,
                                    rect.height
                                ) *
                                1.5;


                            const ripple =
                                document.createElement(
                                    "span"
                                );


                            ripple.className =
                                "surreal-ripple";


                            ripple.style.width =
                                `${size}px`;


                            ripple.style.height =
                                `${size}px`;


                            ripple.style.left =
                                `${
                                    event.clientX -
                                    rect.left -
                                    size /
                                    2
                                }px`;


                            ripple.style.top =
                                `${
                                    event.clientY -
                                    rect.top -
                                    size /
                                    2
                                }px`;


                            button.appendChild(
                                ripple
                            );


                            ripple.addEventListener(
                                "animationend",
                                () => {

                                    ripple.remove();

                                }
                            );

                        }
                    );

                }
            );



        /* =====================================================
           CONTACT
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


        function showFormMessage(
            message,
            color = ""
        ) {

            if (!formNote) {
                return;
            }


            formNote.textContent =
                message;


            formNote.style.color =
                color;

        }


        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                async event => {

                    event.preventDefault();


                    if (
                        !emailJSReady ||
                        typeof emailjs ===
                        "undefined"
                    ) {

                        showFormMessage(

                            "Email service is not ready. Please refresh the page and try again.",

                            "#d33"

                        );


                        return;

                    }


                    const name =
                        contactForm
                            .querySelector(
                                '[name="name"]'
                            )
                            ?.value
                            .trim() ||
                        "";


                    const email =
                        contactForm
                            .querySelector(
                                '[name="email"]'
                            )
                            ?.value
                            .trim() ||
                        "";


                    const company =
                        contactForm
                            .querySelector(
                                '[name="company"]'
                            )
                            ?.value
                            .trim() ||
                        "";


                    const phone =
                        contactForm
                            .querySelector(
                                '[name="phone"]'
                            )
                            ?.value
                            .trim() ||
                        "";


                    const message =
                        contactForm
                            .querySelector(
                                '[name="message"]'
                            )
                            ?.value
                            .trim() ||
                        "";


                    if (
                        !name ||
                        !email ||
                        !message
                    ) {

                        showFormMessage(

                            "Please enter your name, email and project details.",

                            "#d33"

                        );


                        return;

                    }


                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !emailPattern.test(
                            email
                        )
                    ) {

                        showFormMessage(

                            "Please enter a valid email address.",

                            "#d33"

                        );


                        return;

                    }


                    if (submitBtn) {

                        submitBtn.disabled =
                            true;

                    }


                    if (submitText) {

                        submitText.textContent =
                            "SENDING...";

                    }


                    showFormMessage(
                        "Sending your message..."
                    );


                    const templateParams = {

                        name:
                            name,

                        email:
                            email,

                        company:
                            company ||
                            "Not provided",

                        phone:
                            phone ||
                            "Not provided",

                        title:
                            "New Project Inquiry",

                        message:
                            message

                    };


                    try {

                        await emailjs.send(

                            EMAILJS_SERVICE_ID,

                            EMAILJS_TEMPLATE_ID,

                            templateParams

                        );


                        showFormMessage(

                            "Message sent successfully. We'll get back to you soon.",

                            "#3f9b72"

                        );


                        contactForm.reset();

                    }

                    catch (error) {

                        console.error(
                            "EmailJS error:",
                            error
                        );


                        showFormMessage(

                            error?.text
                                ? "EmailJS error: " +
                                  error.text
                                : "Unable to send your message. Please try again.",

                            "#d33"

                        );

                    }

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
                event => {

                    event.preventDefault();


                    const input =
                        newsletterForm.querySelector(
                            "input"
                        );


                    if (
                        !input ||
                        !input.value.trim()
                    ) {

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
           IMAGE FALLBACK
        ====================================================== */

        document
            .querySelectorAll(
                "img"
            )
            .forEach(
                image => {

                    image.addEventListener(
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
                                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85";

                        }
                    );

                }
            );



        /* =====================================================
           RESIZE
        ====================================================== */

        let resizeTimer =
            null;


        window.addEventListener(
            "resize",
            () => {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        () => {

                            if (
                                window.innerWidth >
                                850
                            ) {

                                closeMobileNav();

                            }

                        },
                        150
                    );

            },
            {
                passive:
                    true
            }
        );



        /* =====================================================
           READY
        ====================================================== */

        console.log(
            "%cSURREAL ENGINEERING",
            "font-size:16px;font-weight:700;color:#f6a91b;"
        );


        console.log(
            "SURREAL interactive homepage ready."
        );

    }
);