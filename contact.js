/* =========================================================
   SURREAL CONTACT PAGE JAVASCRIPT
   =========================================================

   Uses the SAME EmailJS configuration as the main
   SURREAL website script.js.

   Features:
   - EmailJS contact form
   - Same EmailJS credentials as index
   - Form validation
   - Loading state
   - Success / error messages
   - Duplicate submission protection
   - Newsletter handling
   - Smooth scrolling
   - Phone input cleanup
   - Professional UX

   ========================================================= */


/* =========================================================
   EMAILJS CONFIGURATION
   SAME CONFIGURATION AS MAIN SCRIPT.JS
========================================================= */

const EMAILJS_PUBLIC_KEY =
    "3acIhgg32PRhhzCd_";

const EMAILJS_SERVICE_ID =
    "service_yzmd5rl";

const EMAILJS_TEMPLATE_ID =
    "template_8vf53eh";


/* =========================================================
   INITIALIZE EMAILJS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            typeof emailjs !== "undefined"
        ) {

            emailjs.init({
                publicKey:
                    EMAILJS_PUBLIC_KEY
            });

            console.log(
                "SURREAL EmailJS initialized."
            );

        } else {

            console.error(
                "SURREAL: EmailJS library was not loaded."
            );

        }

        initializeContactPage();

    }
);


/* =========================================================
   CONTACT PAGE INITIALIZATION
========================================================= */

function initializeContactPage() {

    setupContactForm();

    setupNewsletterForm();

    setupSmoothScrolling();

    setupPhoneInput();

    setupStatusClearing();

}


/* =========================================================
   CONTACT FORM ELEMENTS
========================================================= */

const contactForm =
    document.getElementById(
        "professionalContactForm"
    );

const contactSubmitBtn =
    document.getElementById(
        "contactSubmitBtn"
    );

const submitText =
    document.getElementById(
        "submitText"
    );

const formStatus =
    document.getElementById(
        "formStatus"
    );


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
   SUBMIT BUTTON LOADING STATE
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


    if (isLoading) {

        contactSubmitBtn.disabled =
            true;

        contactSubmitBtn.classList.add(
            "loading"
        );

        submitText.textContent =
            "SENDING...";

    } else {

        contactSubmitBtn.disabled =
            false;

        contactSubmitBtn.classList.remove(
            "loading"
        );

        submitText.textContent =
            "SEND MESSAGE";

    }

}


/* =========================================================
   CONTACT FORM
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
   HANDLE CONTACT FORM SUBMISSION
========================================================= */

async function handleContactSubmit(
    event
) {

    event.preventDefault();


    /* -----------------------------------------------------
       PREVENT DOUBLE SUBMISSION
    ----------------------------------------------------- */

    if (
        contactSubmitBtn &&
        contactSubmitBtn.disabled
    ) {

        return;

    }


    /* -----------------------------------------------------
       CHECK EMAILJS
    ----------------------------------------------------- */

    if (
        typeof emailjs === "undefined"
    ) {

        setFormStatus(
            "Our contact service is temporarily unavailable. Please email us directly.",
            "error"
        );

        console.error(
            "SURREAL: EmailJS is not loaded."
        );

        return;

    }


    /* -----------------------------------------------------
       GET FORM VALUES
    ----------------------------------------------------- */

    const name =
        document
            .getElementById("name")
            ?.value
            .trim();


    const email =
        document
            .getElementById("email")
            ?.value
            .trim();


    const phone =
        document
            .getElementById("phone")
            ?.value
            .trim();


    const message =
        document
            .getElementById("message")
            ?.value
            .trim();


    /* -----------------------------------------------------
       NAME VALIDATION
    ----------------------------------------------------- */

    if (!name) {

        showValidationError(
            "Please enter your full name.",
            "name"
        );

        return;

    }


    if (name.length < 2) {

        showValidationError(
            "Please enter a valid name.",
            "name"
        );

        return;

    }


    /* -----------------------------------------------------
       EMAIL VALIDATION
    ----------------------------------------------------- */

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
        !emailPattern.test(email)
    ) {

        showValidationError(
            "Please enter a valid email address.",
            "email"
        );

        return;

    }


    /* -----------------------------------------------------
       MESSAGE VALIDATION
    ----------------------------------------------------- */

    if (!message) {

        showValidationError(
            "Please enter your message.",
            "message"
        );

        return;

    }


    if (message.length < 10) {

        showValidationError(
            "Please provide a little more information about your requirement.",
            "message"
        );

        return;

    }


    /* -----------------------------------------------------
       START LOADING
    ----------------------------------------------------- */

    setFormStatus(
        "Sending your message..."
    );

    setSubmitLoading(true);


    /* =====================================================
       EMAILJS TEMPLATE PARAMETERS

       These match your existing working script.js.
    ===================================================== */

    const templateParams = {

        name:
            name,

        email:
            email,

        company:
            "Not provided",

        phone:
            phone || "Not provided",

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
           RESET FORM
        ------------------------------------------------- */

        contactForm.reset();


        /* -------------------------------------------------
           SCROLL TO STATUS
        ------------------------------------------------- */

        setTimeout(
            () => {

                if (formStatus) {

                    formStatus.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            },
            150
        );


    } catch (error) {

        console.error(
            "SURREAL EmailJS Error:",
            error
        );


        /* -------------------------------------------------
           ERROR MESSAGE
        ------------------------------------------------- */

        setFormStatus(
            "Sorry, we couldn't send your message. Please try again or contact us directly by email.",
            "error"
        );


    } finally {

        setSubmitLoading(false);

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


    if (field) {

        field.focus();

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
        (event) => {

            event.preventDefault();


            const newsletterEmail =
                newsletterForm
                    .querySelector(
                        'input[name="newsletter_email"]'
                    )
                    ?.value
                    .trim();


            if (!newsletterEmail) {

                alert(
                    "Please enter your email address."
                );

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    newsletterEmail
                )
            ) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }


            alert(
                "Thank you for subscribing to SURREAL."
            );


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
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

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


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
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
   CLEAR ERROR WHEN USER TYPES
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
            (input) => {

                input.addEventListener(
                    "input",
                    () => {

                        if (
                            formStatus &&
                            formStatus.classList.contains(
                                "error"
                            )
                        ) {

                            setFormStatus("");

                        }

                    }
                );

            }
        );

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cSURREAL Contact Page Loaded",
    "font-size:16px;font-weight:bold;"
);

console.log(
    "SURREAL contact form is ready."
);