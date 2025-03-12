document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded");

    // Mobile Navigation Menu Toggle
    const menuToggle = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent misclicks
            navMenu.classList.toggle("active");
        });

        document.addEventListener("click", function (event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove("active");
            }
        });
    }

    // Book Now button logic
    const bookNowButtons = document.querySelectorAll(".nav-btn, .book-now-btn");
    bookNowButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const isAuthenticated = localStorage.getItem("userToken");
            window.location.href = isAuthenticated ? "checkout.html" : "signin.html?signin=true"; // Pass sign-in parameter
        });
    });

    // Toggle Sign-In / Sign-Up Forms
    const toggleSwitch = document.getElementById("toggle-switch");
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");

    if (toggleSwitch && signInForm && signUpForm) {
        // Check if redirected from "Book Now"
        const urlParams = new URLSearchParams(window.location.search);
        const showSignIn = urlParams.get("signin") === "true";

        // Initial form display based on URL parameters
        if (showSignIn) {
            // Show Sign-In if redirected from Book Now
            toggleSwitch.classList.remove("active");
            signUpForm.style.display = "none";
            signInForm.style.display = "block";
        } else {
            // Default: Show Sign-Up
            toggleSwitch.classList.add("active");
            signUpForm.style.display = "block";
            signInForm.style.display = "none";
        }

        // Toggle form visibility when switch is clicked
        toggleSwitch.addEventListener("click", function () {
            toggleSwitch.classList.toggle("active");
            
            if (toggleSwitch.classList.contains("active")) {
                // Show Sign-Up
                signInForm.style.display = "none";
                signUpForm.style.display = "block";
            } else {
                // Show Sign-In
                signUpForm.style.display = "none";
                signInForm.style.display = "block";
            }
        });
    } else {
        console.error("Toggle switch or forms not found in the DOM.");
    }

    // Password Visibility Toggle
    function togglePasswordVisibility(passwordFieldId, toggleIconId) {
        const passwordField = document.getElementById(passwordFieldId);
        const toggleIcon = document.getElementById(toggleIconId);

        if (passwordField && toggleIcon) {
            toggleIcon.addEventListener("click", function () {
                const isPassword = passwordField.type === "password";
                passwordField.type = isPassword ? "text" : "password";
                toggleIcon.innerHTML = isPassword ? "🙈" : "👁️"; // Fix icon delay
            });
        }
    }

    togglePasswordVisibility("signin-password", "signin-toggle");
    togglePasswordVisibility("signup-password", "signup-toggle");
    togglePasswordVisibility("signup-retype-password", "signup-retype-toggle");

    // Handle Sign-In Logic
    window.handleSignIn = function () {
        const email = document.getElementById("signin-email").value;
        const password = document.getElementById("signin-password").value;

        if (email && password) {
            localStorage.setItem("userToken", "dummy-token");
            alert("Sign In Successful");
            window.location.href = "checkout.html";
        } else {
            alert("Please enter valid credentials.");
        }
    };

    // Handle Sign-Up Logic
    window.handleSignUp = function () {
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const retypePassword = document.getElementById("signup-retype-password").value;

        if (name && email && password && retypePassword) {
            if (password !== retypePassword) {
                alert("Passwords do not match. Please try again.");
                return;
            }
            localStorage.setItem("userToken", "dummy-token");
            alert("Sign Up Successful");
            window.location.href = "checkout.html";
        } else {
            alert("Please fill all fields correctly.");
        }
    };
});