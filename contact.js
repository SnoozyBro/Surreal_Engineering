/* =========================================================
   SURREAL CONTACT PAGE JAVASCRIPT
   INDEX THEME / INTERACTIVE CONTACT EXPERIENCE

   Features:
   - EmailJS contact form
   - Existing EmailJS credentials
   - Form validation
   - Loading state
   - Success / error messages
   - Duplicate submission protection
   - Company field support
   - Newsletter interaction
   - Smooth scrolling
   - Phone input cleanup
   - Reveal animations
   - Pointer-follow card lighting
   - 3D hover tilt
   - Hero visual parallax
   - Magnetic buttons
   - Input focus interactions
   - Responsive / touch-safe behavior
   - Reduced-motion support
========================================================= */


/* =========================================================
   EMAILJS CONFIGURATION
========================================================= */

const EMAILJS_PUBLIC_KEY =
    "3acIhgg32PRhhzCd_";

const EMAILJS_SERVICE_ID =
    "service_yzmd5rl";

const EMAILJS_TEMPLATE_ID =
    "template_8vf53eh";


/* =========================================================
   DEVICE / ACCESSIBILITY
========================================================= */

const contactReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


const contactTouchDevice =
    window.matchMedia(
        "(pointer: coarse)"
    ).matches;


/* =========================================================
   DOM ELEMENTS
========================================================= */

let contactForm = null;

let contactSubmitBtn = null;

let submitText = null;

let formStatus = null;


/* =========================================================
   INITIALIZE PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ---------------------------------------------
           FORM ELEMENTS
        --------------------------------------------- */

        contactForm =
            document.getElementById(
                "professionalContactForm"
            );


        contactSubmitBtn =
            document.getElementById(
                "contactSubmitBtn"
            );


        submitText =
            document.getElementById(
                "submitText"
            );


        formStatus =
            document.getElementById(
                "formStatus"
            );


        /* ---------------------------------------------
           EMAILJS
        --------------------------------------------- */

        initializeEmailJS();


        /* ---------------------------------------------
           PAGE FEATURES
        --------------------------------------------- */

        initializeContactPage();

    }
);


/* =========================================================
   EMAILJS INITIALIZATION
========================================================= */

function initializeEmailJS() {

    if (
        typeof emailjs ===
        "undefined"
    ) {

        console.error(
            "SURREAL: EmailJS library was not loaded."
        );

        return;

    }


    try {

        emailjs.init({

            publicKey:
                EMAILJS_PUBLIC_KEY

        });


        console.log(
            "SURREAL EmailJS initialized."
        );

    } catch (error) {

        console.error(
            "SURREAL EmailJS initialization error:",
            error
        );

    }

}


/* =========================================================
   CONTACT PAGE INITIALIZATION
========================================================= */

function initializeContactPage() {

    setupContactForm();

    setupNewsletterForm();

    setupSmoothScrolling();

    setupPhoneInput();

    setupStatusClearing();

    setupRevealAnimations();

    setupContactMethodEffects();

    setupHeroVisual();

    setupMagneticButtons();

    setupInputInteractions();

    setupFloatingCards();

    setupMapInteraction();

    setupResizeCleanup();

}


/* =========================================================
   FORM STATUS
========================================================= */

function setFormStatus(
    message,
    type = ""
) {

    if (!formStatus) {

        return;

    }


    formStatus.textContent =
        message;


    formStatus.className =
        "form-status";


    if (type) {

        formStatus.classList.add(
            type
        );

    }

}


/* =========================================================
   SUBMIT LOADING STATE
========================================================= */

function setSubmitLoading(
    isLoading
) {

    if (
        !contactSubmitBtn ||
        !submitText
    ) {

        return;

    }


    contactSubmitBtn.disabled =
        isLoading;


    contactSubmitBtn.classList.toggle(
        "loading",
        isLoading
    );


    submitText.textContent =
        isLoading
            ? "SENDING..."
            : "SEND MESSAGE";

}


/* =========================================================
   CONTACT FORM SETUP
========================================================= */

function setupContactForm() {

    if (!contactForm) {

        console.warn(
            "SURREAL: Contact form not found."
        );

        return;

    }


    contactForm.addEventListener(
        "submit",
        handleContactSubmit
    );

}


/* =========================================================
   HANDLE CONTACT SUBMIT
========================================================= */

async function handleContactSubmit(
    event
) {

    event.preventDefault();


    /* -----------------------------------------------------
       PREVENT DUPLICATE SUBMISSION
    ----------------------------------------------------- */

    if (
        contactSubmitBtn &&
        contactSubmitBtn.disabled
    ) {

        return;

    }


    /* -----------------------------------------------------
       EMAILJS AVAILABLE?
    ----------------------------------------------------- */

    if (
        typeof emailjs ===
        "undefined"
    ) {

        setFormStatus(

            "Our contact service is temporarily unavailable. Please contact us directly by email.",

            "error"

        );


        console.error(
            "SURREAL: EmailJS is not loaded."
        );


        return;

    }


    /* -----------------------------------------------------
       VALUES
    ----------------------------------------------------- */

    const name =
        document
            .getElementById(
                "name"
            )
            ?.value
            .trim() || "";


    const email =
        document
            .getElementById(
                "email"
            )
            ?.value
            .trim() || "";


    const phone =
        document
            .getElementById(
                "phone"
            )
            ?.value
            .trim() || "";


    const company =
        document
            .getElementById(
                "company"
            )
            ?.value
            .trim() || "";


    const message =
        document
            .getElementById(
                "message"
            )
            ?.value
            .trim() || "";


    /* =====================================================
       NAME VALIDATION
    ===================================================== */

    if (!name) {

        showValidationError(

            "Please enter your full name.",

            "name"

        );

        return;

    }


    if (
        name.length <
        2
    ) {

        showValidationError(

            "Please enter a valid name.",

            "name"

        );

        return;

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    if (!email) {

        showValidationError(

            "Please enter your email address.",

            "email"

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

        showValidationError(

            "Please enter a valid email address.",

            "email"

        );

        return;

    }


    /* =====================================================
       MESSAGE VALIDATION
    ===================================================== */

    if (!message) {

        showValidationError(

            "Please enter your message.",

            "message"

        );

        return;

    }


    if (
        message.length <
        10
    ) {

        showValidationError(

            "Please provide a little more information about your requirement.",

            "message"

        );

        return;

    }


    /* =====================================================
       START LOADING
    ===================================================== */

    setFormStatus(
        "Sending your message..."
    );


    setSubmitLoading(
        true
    );


    /* =====================================================
       EMAILJS TEMPLATE PARAMETERS
    ===================================================== */

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


    /* =====================================================
       SEND EMAIL
    ===================================================== */

    try {

        const response =
            await emailjs.send(

                EMAILJS_SERVICE_ID,

                EMAILJS_TEMPLATE_ID,

                templateParams

            );


        console.log(
            "SURREAL EmailJS response:",
            response
        );


        /* -------------------------------------------------
           SUCCESS
        ------------------------------------------------- */

        setFormStatus(

            "Thank you! Your message has been sent successfully. We will get back to you soon.",

            "success"

        );


        /* -------------------------------------------------
           SUCCESS BUTTON FEEDBACK
        ------------------------------------------------- */

        if (
            contactSubmitBtn &&
            submitText
        ) {

            submitText.textContent =
                "MESSAGE SENT";


            const icon =
                contactSubmitBtn
                    .querySelector(
                        "i"
                    );


            if (icon) {

                icon.className =
                    "fa-solid fa-check";

            }


            setTimeout(
                () => {

                    submitText.textContent =
                        "SEND MESSAGE";


                    if (icon) {

                        icon.className =
                            "fa-solid fa-arrow-right";

                    }

                },
                2200
            );

        }


        /* -------------------------------------------------
           RESET FORM
        ------------------------------------------------- */

        contactForm.reset();


        /* -------------------------------------------------
           REMOVE FOCUSED STATES
        ------------------------------------------------- */

        contactForm
            .querySelectorAll(
                ".professional-input"
            )
            .forEach(
                group => {

                    group.classList.remove(
                        "focused"
                    );

                }
            );


        /* -------------------------------------------------
           SCROLL TO STATUS
        ------------------------------------------------- */

        setTimeout(
            () => {

                if (!formStatus) {

                    return;

                }


                formStatus.scrollIntoView({

                    behavior:
                        contactReducedMotion
                            ? "auto"
                            : "smooth",

                    block:
                        "center"

                });

            },
            150
        );


    } catch (error) {

        console.error(
            "SURREAL EmailJS Error:",
            error
        );


        let errorMessage =
            "Sorry, we couldn't send your message. Please try again or contact us directly by email.";


        /* Gmail connection issue */

        const errorText =
            String(
                error?.text ||
                error?.message ||
                error ||
                ""
            );


        if (
            errorText
                .toLowerCase()
                .includes(
                    "invalid grant"
                )
        ) {

            errorMessage =
                "The email service needs to be reconnected. Please contact us directly while we restore it.";

        }


        setFormStatus(

            errorMessage,

            "error"

        );


    } finally {

        setSubmitLoading(
            false
        );

    }

}


/* =========================================================
   VALIDATION ERROR
========================================================= */

function showValidationError(
    message,
    fieldID
) {

    setFormStatus(
        message,
        "error"
    );


    const field =
        document.getElementById(
            fieldID
        );


    if (!field) {

        return;

    }


    field.focus();


    const wrapper =
        field.closest(
            ".input-wrapper"
        );


    if (
        wrapper &&
        !contactReducedMotion
    ) {

        wrapper.animate(

            [

                {
                    transform:
                        "translateX(0)"
                },

                {
                    transform:
                        "translateX(-5px)"
                },

                {
                    transform:
                        "translateX(5px)"
                },

                {
                    transform:
                        "translateX(-3px)"
                },

                {
                    transform:
                        "translateX(0)"
                }

            ],

            {

                duration:
                    340,

                easing:
                    "ease"

            }

        );

    }

}


/* =========================================================
   NEWSLETTER FORM
========================================================= */

function setupNewsletterForm() {

    const newsletterForm =
        document.getElementById(
            "newsletterForm"
        );


    if (!newsletterForm) {

        return;

    }


    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const input =
                newsletterForm
                    .querySelector(
                        'input[name="newsletter_email"]'
                    );


            const newsletterEmail =
                input
                    ?.value
                    .trim() || "";


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !newsletterEmail ||
                !emailPattern.test(
                    newsletterEmail
                )
            ) {

                if (input) {

                    input.focus();


                    if (
                        !contactReducedMotion
                    ) {

                        input.animate(

                            [

                                {
                                    transform:
                                        "translateX(0)"
                                },

                                {
                                    transform:
                                        "translateX(-4px)"
                                },

                                {
                                    transform:
                                        "translateX(4px)"
                                },

                                {
                                    transform:
                                        "translateX(0)"
                                }

                            ],

                            {
                                duration:
                                    280
                            }

                        );

                    }

                }


                return;

            }


            const button =
                newsletterForm
                    .querySelector(
                        "button"
                    );


            if (button) {

                const originalHTML =
                    button.innerHTML;


                button.innerHTML =
                    '<i class="fa-solid fa-check"></i>';


                button.disabled =
                    true;


                setTimeout(
                    () => {

                        button.innerHTML =
                            originalHTML;


                        button.disabled =
                            false;

                    },
                    1500
                );

            }


            newsletterForm.reset();

        }
    );

}


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

function setupSmoothScrolling() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetID =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetID ||
                            targetID === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetID
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        const header =
                            document.querySelector(
                                ".site-header"
                            );


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
                                contactReducedMotion
                                    ? "auto"
                                    : "smooth"

                        });

                    }
                );

            }
        );

}


/* =========================================================
   PHONE INPUT
========================================================= */

function setupPhoneInput() {

    const phoneInput =
        document.getElementById(
            "phone"
        );


    if (!phoneInput) {

        return;

    }


    phoneInput.addEventListener(
        "input",
        () => {

            phoneInput.value =
                phoneInput.value.replace(

                    /[^0-9+\-()\s]/g,

                    ""

                );

        }
    );

}


/* =========================================================
   CLEAR FORM ERROR WHEN USER TYPES
========================================================= */

function setupStatusClearing() {

    if (!contactForm) {

        return;

    }


    contactForm
        .querySelectorAll(
            "input, textarea"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    () => {

                        if (
                            formStatus &&
                            formStatus
                                .classList
                                .contains(
                                    "error"
                                )
                        ) {

                            setFormStatus(
                                ""
                            );

                        }

                    }
                );

            }
        );

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function setupRevealAnimations() {

    const revealItems =
        document.querySelectorAll(
            ".reveal-item"
        );


    if (!revealItems.length) {

        return;

    }


    if (
        contactReducedMotion ||
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        revealItems.forEach(
            item => {

                item.classList.add(
                    "visible"
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target
                            .classList
                            .add(
                                "visible"
                            );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {

                threshold:
                    0.12,

                rootMargin:
                    "0px 0px -55px 0px"

            }

        );


    revealItems.forEach(
        (item, index) => {

            const delay =
                Math.min(
                    index % 4,
                    3
                ) *
                65;


            item.style
                .transitionDelay =
                `${delay}ms`;


            observer.observe(
                item
            );

        }
    );

}


/* =========================================================
   CONTACT METHOD CARD INTERACTIONS
========================================================= */

function setupContactMethodEffects() {

    const cards =
        document.querySelectorAll(
            ".contact-method-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        card => {

            card.addEventListener(
                "pointermove",
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


                    /* Pointer-follow glow */

                    card.style
                        .setProperty(

                            "--pointer-x",

                            `${x}px`

                        );


                    card.style
                        .setProperty(

                            "--pointer-y",

                            `${y}px`

                        );


                    /* No tilt for mobile / reduced motion */

                    if (
                        contactTouchDevice ||
                        contactReducedMotion
                    ) {

                        return;

                    }


                    const rotateY =
                        (
                            x /
                            rect.width -
                            0.5
                        ) *
                        4;


                    const rotateX =
                        (
                            y /
                            rect.height -
                            0.5
                        ) *
                        -4;


                    card.style.transform =
                        `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)
                        `;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   HERO VISUAL INTERACTION
========================================================= */

function setupHeroVisual() {

    const visual =
        document.getElementById(
            "contactHeroVisual"
        );


    const card =
        document.getElementById(
            "contactVisualCard"
        );


    if (
        !visual ||
        !card
    ) {

        return;

    }


    if (
        contactTouchDevice ||
        contactReducedMotion
    ) {

        return;

    }


    visual.addEventListener(
        "pointermove",
        event => {

            const rect =
                visual
                    .getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const percentX =
                x /
                rect.width;


            const percentY =
                y /
                rect.height;


            const normalizedX =
                percentX -
                0.5;


            const normalizedY =
                percentY -
                0.5;


            /* Main center card */

            const rotateY =
                normalizedX *
                11;


            const rotateX =
                normalizedY *
                -11;


            card.style.transform =
                `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translate3d(
                    ${normalizedX * 5}px,
                    ${normalizedY * 5}px,
                    12px
                )
                `;


            card.style
                .setProperty(

                    "--shine-x",

                    `${percentX * 100}%`

                );


            card.style
                .setProperty(

                    "--shine-y",

                    `${percentY * 100}%`

                );


            /* Floating cards */

            const emailCard =
                visual.querySelector(
                    ".floating-email"
                );


            const locationCard =
                visual.querySelector(
                    ".floating-location"
                );


            if (emailCard) {

                emailCard.style.transform =
                    `
                    translate3d(
                        ${normalizedX * -11}px,
                        ${normalizedY * -8}px,
                        0
                    )
                    `;

            }


            if (locationCard) {

                locationCard.style.transform =
                    `
                    translate3d(
                        ${normalizedX * 10}px,
                        ${normalizedY * 7}px,
                        0
                    )
                    `;

            }

        }
    );


    visual.addEventListener(
        "pointerleave",
        () => {

            card.style.transform =
                "";


            visual
                .querySelectorAll(
                    ".contact-floating-card"
                )
                .forEach(
                    floatingCard => {

                        floatingCard.style
                            .transform =
                            "";

                    }
                );

        }
    );

}


/* =========================================================
   FLOATING CARD ENTRANCE
========================================================= */

function setupFloatingCards() {

    if (
        contactReducedMotion
    ) {

        return;

    }


    const floatingCards =
        document.querySelectorAll(
            ".contact-floating-card"
        );


    floatingCards.forEach(
        (card, index) => {

            card.animate(

                [

                    {
                        opacity:
                            0,

                        transform:
                            "translateY(18px)"
                    },

                    {
                        opacity:
                            1,

                        transform:
                            "translateY(0)"
                    }

                ],

                {

                    duration:
                        700,

                    delay:
                        500 +
                        index *
                        150,

                    easing:
                        "cubic-bezier(.22,.61,.36,1)",

                    fill:
                        "both"

                }

            );

        }
    );

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function setupMagneticButtons() {

    if (
        contactTouchDevice ||
        contactReducedMotion
    ) {

        return;

    }


    const buttons =
        document.querySelectorAll(
            ".magnetic"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        button
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


                    button.style.transform =
                        `
                        translate(
                            ${x * 0.07}px,
                            ${y * 0.07}px
                        )
                        `;

                }
            );


            button.addEventListener(
                "pointerleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   INPUT INTERACTIONS
========================================================= */

function setupInputInteractions() {

    const groups =
        document.querySelectorAll(
            ".professional-input"
        );


    groups.forEach(
        group => {

            const field =
                group.querySelector(
                    "input, textarea"
                );


            if (!field) {

                return;

            }


            field.addEventListener(
                "focus",
                () => {

                    group.classList.add(
                        "focused"
                    );

                }
            );


            field.addEventListener(
                "blur",
                () => {

                    group.classList.remove(
                        "focused"
                    );


                    group.classList.toggle(

                        "has-value",

                        Boolean(
                            field.value.trim()
                        )

                    );

                }
            );


            field.addEventListener(
                "input",
                () => {

                    group.classList.toggle(

                        "has-value",

                        Boolean(
                            field.value.trim()
                        )

                    );

                }
            );

        }
    );

}


/* =========================================================
   MAP INTERACTION
========================================================= */

function setupMapInteraction() {

    const mapContainer =
        document.querySelector(
            ".map-container"
        );


    const mapCard =
        document.querySelector(
            ".map-info-card"
        );


    if (
        !mapContainer ||
        !mapCard ||
        contactTouchDevice ||
        contactReducedMotion
    ) {

        return;

    }


    mapContainer.addEventListener(
        "pointermove",
        event => {

            const rect =
                mapContainer
                    .getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const normalizedX =
                x /
                rect.width -
                0.5;


            const normalizedY =
                y /
                rect.height -
                0.5;


            mapCard.style.transform =
                `
                translate(
                    ${normalizedX * 6}px,
                    ${normalizedY * 5}px
                )
                `;

        }
    );


    mapContainer.addEventListener(
        "pointerleave",
        () => {

            mapCard.style.transform =
                "";

        }
    );

}


/* =========================================================
   RESIZE CLEANUP
========================================================= */

function setupResizeCleanup() {

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                850
            ) {

                return;

            }


            document
                .querySelectorAll(
                    `
                    .contact-method-card,
                    .contact-visual-card,
                    .contact-floating-card,
                    .map-info-card
                    `
                )
                .forEach(
                    element => {

                        element.style.transform =
                            "";

                    }
                );

        },
        {
            passive:
                true
        }
    );

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState !==
            "visible"
        ) {

            return;

        }


        document
            .querySelectorAll(
                ".contact-method-card"
            )
            .forEach(
                card => {

                    card.style.transform =
                        "";

                }
            );

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cSURREAL Contact Page Loaded",
    "font-size:16px;font-weight:bold;color:#f6a91b;"
);


console.log(
    "SURREAL Index-theme contact experience ready."
);
/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function setupContactMobileNavigation() {

    const hamburger =
        document.getElementById(
            "hamburger"
        );


    const mainNav =
        document.getElementById(
            "mainNav"
        );


    if (
        !hamburger ||
        !mainNav
    ) {

        return;

    }


    /*
       Avoid installing a duplicate handler
       if main script already initialized it.
    */

    if (
        hamburger.dataset
            .contactNavReady ===
        "true"
    ) {

        return;

    }


    hamburger.dataset
        .contactNavReady =
        "true";


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


            hamburger
                .classList
                .toggle(
                    "active",
                    open
                );


            hamburger
                .setAttribute(

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


    /*
       Close after clicking a nav link
    */

    mainNav
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    closeContactMobileNav
                );

            }
        );


    /*
       Click outside closes menu
    */

    document.addEventListener(
        "click",
        event => {

            if (
                !mainNav.classList
                    .contains("open")
            ) {

                return;

            }


            if (
                mainNav.contains(
                    event.target
                ) ||
                hamburger.contains(
                    event.target
                )
            ) {

                return;

            }


            closeContactMobileNav();

        }
    );


    /*
       Escape closes menu
    */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeContactMobileNav();

            }

        }
    );


    /*
       Desktop reset
    */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                850
            ) {

                closeContactMobileNav();

            }

        },
        {
            passive: true
        }
    );


    function closeContactMobileNav() {

        mainNav
            .classList
            .remove(
                "open"
            );


        hamburger
            .classList
            .remove(
                "active"
            );


        hamburger
            .setAttribute(
                "aria-expanded",
                "false"
            );


        document.body
            .classList
            .remove(
                "nav-open"
            );

    }

}