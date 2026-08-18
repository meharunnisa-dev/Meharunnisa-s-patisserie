/* =========================================================
   MEHARUNNISA'S PATISSERIE
   COMPLETE WEBSITE JAVASCRIPT
   Gallery + Order Cart + Contact + Home Slider
   ========================================================= */


/* =========================================================
   CART STORAGE
========================================================= */

let cart = JSON.parse(
    localStorage.getItem("meharunnisaPatisserieCart")
) || [];


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "meharunnisaPatisserieCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   UPDATE ORDER COUNT
========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    let totalQuantity = 0;

    cart.forEach(function(item) {

        totalQuantity +=
            Number(item.quantity) || 0;

    });

    cartCount.textContent = totalQuantity;

}


/* =========================================================
   ADD TO ORDER
========================================================= */

function addToOrder(name, price, image) {

    price = Number(price) || 0;

    const existingItem =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existingItem) {

        existingItem.quantity += 1;

    }

    else {

        cart.push({

            name: name,

            price: price,

            image: image || "",

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();


    alert(
        name + " has been added to your order."
    );

}


/* =========================================================
   GALLERY PLUS BUTTONS
========================================================= */

function setupGalleryProducts() {

    const plusButtons =
        document.querySelectorAll(
            ".gallery-card .image-view-btn"
        );


    plusButtons.forEach(function(button) {

        const card =
            button.closest(".gallery-card");

        if (!card) {
            return;
        }


        const name =
            card.dataset.name;


        const price =
            Number(card.dataset.price) || 0;


        const image =
            card.querySelector(
                ".gallery-image img"
            );


        const imagePath =
            image
                ? image.getAttribute("src")
                : "";


        button.onclick =
            function(event) {

                event.preventDefault();

                event.stopPropagation();


                addToOrder(
                    name,
                    price,
                    imagePath
                );

            };

    });

}


/* =========================================================
   GALLERY FILTER
========================================================= */

function setupGalleryFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );


    const galleryCards =
        document.querySelectorAll(
            ".gallery-card"
        );


    filterButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                filterButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const selectedCategory =
                    button.dataset.filter;


                galleryCards.forEach(
                    function(card) {

                        const cardCategory =
                            card.dataset.category;


                        if (
                            selectedCategory === "all" ||
                            cardCategory === selectedCategory
                        ) {

                            card.style.display = "";

                        }

                        else {

                            card.style.display = "none";

                        }

                    }
                );

            }
        );

    });

}


/* =========================================================
   OPEN IMAGE
========================================================= */

function openImage(imagePath) {

    const viewer =
        document.createElement("div");


    viewer.style.position = "fixed";
    viewer.style.top = "0";
    viewer.style.left = "0";
    viewer.style.width = "100%";
    viewer.style.height = "100%";

    viewer.style.background =
        "rgba(0,0,0,0.85)";

    viewer.style.display = "flex";

    viewer.style.alignItems =
        "center";

    viewer.style.justifyContent =
        "center";

    viewer.style.zIndex =
        "99999";

    viewer.style.cursor =
        "pointer";


    viewer.innerHTML = `

        <div style="
            position:relative;
        ">

            <button
                type="button"
                id="closeImage"
                style="
                    position:absolute;
                    right:-15px;
                    top:-15px;
                    width:35px;
                    height:35px;
                    border:none;
                    border-radius:50%;
                    background:white;
                    color:#5a3825;
                    font-size:24px;
                    cursor:pointer;
                    z-index:100000;
                "
            >
                ×
            </button>


            <img
                src="${imagePath}"
                alt="Bakery product"
                style="
                    max-width:85vw;
                    max-height:85vh;
                    object-fit:contain;
                    border-radius:12px;
                    display:block;
                "
            >

        </div>

    `;


    document.body.appendChild(viewer);


    const closeButton =
        document.getElementById(
            "closeImage"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                viewer.remove();

            }
        );

    }


    viewer.addEventListener(
        "click",
        function(event) {

            if (
                event.target === viewer
            ) {

                viewer.remove();

            }

        }
    );

}


/* =========================================================
   DISPLAY ORDER PAGE
========================================================= */

function displayOrders() {

    const orderContainer =
        document.getElementById(
            "orderItems"
        );


    const orderTotal =
        document.getElementById(
            "orderTotal"
        );


    const rewardMessage =
        document.getElementById(
            "rewardMessage"
        ) ||
        document.getElementById(
            "giftNote"
        );


    if (!orderContainer) {
        return;
    }


    orderContainer.innerHTML = "";


    /* EMPTY ORDER */

    if (cart.length === 0) {

        orderContainer.innerHTML = `

            <div class="empty-order">

                <h3>
                    Your order is empty
                </h3>

                <p>
                    Please visit our Gallery
                    and add something delicious.
                </p>

            </div>

        `;


        if (orderTotal) {

            orderTotal.textContent =
                "₹0";

        }


        if (rewardMessage) {

            rewardMessage.style.display =
                "none";

        }


        return;

    }


    let total = 0;


    cart.forEach(
        function(item, index) {

            const quantity =
                Number(item.quantity) || 1;


            const price =
                Number(item.price) || 0;


            const itemTotal =
                price * quantity;


            total += itemTotal;


            const orderItem =
                document.createElement("div");


            orderItem.className =
                "order-item";


            orderItem.innerHTML = `

                <div class="order-item-details">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${price} × ${quantity}
                    </p>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>


                <div class="order-item-actions">

                    <button
                        type="button"
                        class="quantity-btn"
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>


                    <span>
                        ${quantity}
                    </span>


                    <button
                        type="button"
                        class="quantity-btn"
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="remove-order-btn"
                        onclick="removeFromOrder(${index})"
                    >
                        Remove
                    </button>

                </div>

            `;


            orderContainer.appendChild(
                orderItem
            );

        }
    );


    if (orderTotal) {

        orderTotal.textContent =
            "₹" + total;

    }


    /* ₹1000 GIFT */

    if (rewardMessage) {

        rewardMessage.style.display =
            "block";


        if (total >= 1000) {

            rewardMessage.innerHTML = `

                🎁 <strong>
                    Congratulations!
                </strong>

                Your order is ₹1,000 or more,
                so you will receive an

                <strong>
                    Exclusive Dessert Box
                </strong>

                complimentary!

            `;

        }

        else {

            const remaining =
                1000 - total;


            rewardMessage.innerHTML = `

                🎁 Spend ₹1,000 or more
                and get an

                <strong>
                    Exclusive Dessert Box
                </strong>

                complimentary.

                <br>

                Add ₹${remaining} more
                to unlock your gift!

            `;

        }

    }

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(index, change) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        Number(cart[index].quantity) + change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCartCount();

    displayOrders();

}


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeFromOrder(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    saveCart();

    updateCartCount();

    displayOrders();

}


/* =========================================================
   CLEAR ALL ORDERS
========================================================= */

function clearOrders() {

    cart = [];


    saveCart();

    updateCartCount();

    displayOrders();

}


/* =========================================================
   SEND ORDER REQUEST
========================================================= */

function sendOrderRequest() {

    if (cart.length === 0) {

        alert(
            "Please add at least one item to your order."
        );

        return;

    }


    let total = 0;


    cart.forEach(function(item) {

        total +=
            Number(item.price) *
            Number(item.quantity);

    });


    if (total >= 1000) {

        alert(

            "Thank you! Your order request has been recorded.\n\n" +

            "🎁 Congratulations! You will receive an exclusive, complimentary Dessert Box as a gift.\n\n" +

            "Please contact the bakery to confirm availability and final pricing."

        );

    }

    else {

        alert(

            "Thank you! Your order request has been recorded.\n\n" +

            "Please contact the bakery to confirm availability and final pricing."

        );

    }

}


/* =========================================================
   HOME PAGE SLIDER
========================================================= */

function setupHomeSlider() {

    const slider =
        document.querySelector(".slider");


    if (!slider) {
        return;
    }


    const slides =
        slider.querySelectorAll(".slide");


    const dots =
        document.querySelectorAll(".slider-dots .dot");


    const previousButton =
        document.querySelector(".slider-btn.prev");


    const nextButton =
        document.querySelector(".slider-btn.next");


    /* Make sure there are slides */

    if (slides.length === 0) {
        return;
    }


    let currentSlide = 0;

    let sliderTimer = null;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showSlide(index) {

        /* Go from last to first */

        if (index >= slides.length) {

            currentSlide = 0;

        }

        /* Go from first to last */

        else if (index < 0) {

            currentSlide =
                slides.length - 1;

        }

        else {

            currentSlide = index;

        }


        /* Remove active from every slide */

        slides.forEach(function(slide) {

            slide.classList.remove("active");

        });


        /* Add active to current slide */

        slides[currentSlide]
            .classList.add("active");


        /* Update dots */

        dots.forEach(function(dot, index) {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextSlide() {

        showSlide(
            currentSlide + 1
        );

    }


    /* =====================================================
       PREVIOUS SLIDE
    ===================================================== */

    function previousSlide() {

        showSlide(
            currentSlide - 1
        );

    }


    /* =====================================================
       START AUTOMATIC SLIDER
       Every 3 seconds
    ===================================================== */

    function startSlider() {

        clearInterval(sliderTimer);


        sliderTimer =
            setInterval(
                function() {

                    nextSlide();

                },
                3000
            );

    }


    /* =====================================================
       RESET TIMER
       Used after manual clicks
    ===================================================== */

    function resetSliderTimer() {

        clearInterval(sliderTimer);

        startSlider();

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function() {

                nextSlide();

                resetSliderTimer();

            }
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function() {

                previousSlide();

                resetSliderTimer();

            }
        );

    }


    /* =====================================================
       DOT BUTTONS
    ===================================================== */

    dots.forEach(function(dot) {

        dot.addEventListener(
            "click",
            function() {

                const slideIndex =
                    Number(
                        dot.dataset.index
                    );


                if (
                    !Number.isNaN(
                        slideIndex
                    )
                ) {

                    showSlide(
                        slideIndex
                    );

                    resetSliderTimer();

                }

            }
        );

    });


    /* =====================================================
       INITIAL SLIDE
    ===================================================== */

    showSlide(0);


    /* Start automatic movement */

    startSlider();

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );


    const mainNav =
        document.querySelector(
            ".main-nav"
        );


    if (!menuToggle || !mainNav) {

        return;

    }


    menuToggle.addEventListener(
        "click",
        function() {

            mainNav.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function setupContactForm() {

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    const contactMessage =
        document.getElementById(
            "contactMessage"
        );


    if (
        !contactForm ||
        !contactMessage
    ) {

        return;

    }


    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            contactMessage.style.display =
                "block";


            contactMessage.textContent =
                "✓ Thank you! Your message has been sent successfully. We will get back to you soon.";


            contactMessage.style.color =
                "#397049";


            contactMessage.style.fontWeight =
                "700";


            contactForm.reset();

        }
    );

}


/* =========================================================
   PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        /* CART */

        updateCartCount();


        /* GALLERY */

        setupGalleryProducts();

        setupGalleryFilters();


        /* ORDER */

        displayOrders();


        /* HOME SLIDER */

        setupHomeSlider();


        /* MOBILE MENU */

        setupMobileMenu();


        /* CONTACT */

        setupContactForm();

    }
);
