
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active"); // Toggle active class
        });
    }
});




document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded");

    const toggleSwitch = document.getElementById("toggle-switch");
    const signInForm = document.getElementById("signin-form");
    const signUpForm = document.getElementById("signup-form");
    const signUpLabel = document.querySelector(".toggle-container span:first-of-type");
    const signInLabel = document.querySelector(".toggle-container span:last-of-type");

    // Ensure Sign Up form shows first
    signUpForm.style.display = "block";
    signInForm.style.display = "none";
    signUpLabel.style.color = "#ff6200";
    signInLabel.style.color = "#888";

    // Toggle forms on switch click
    toggleSwitch.addEventListener("click", function () {
        toggleSwitch.classList.toggle("active");

        if (toggleSwitch.classList.contains("active")) {
            signUpForm.style.display = "none";
            signInForm.style.display = "block";
            signUpLabel.style.color = "#888";
            signInLabel.style.color = "#ff6200";
        } else {
            signUpForm.style.display = "block";
            signInForm.style.display = "none";
            signUpLabel.style.color = "#ff6200";
            signInLabel.style.color = "#888";
        }
    });

    // ====================== REUSABLE PASSWORD VALIDATION ====================== //
    function validatePassword(password, errorElement) {
        if (!errorElement) return;

        if (password === "") {
            errorElement.textContent = ""; // Clear error if no input
            return;
        }

        const passwordValid = (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&   // At least one uppercase
            /[a-z]/.test(password) &&   // At least one lowercase
            /\d/.test(password)         // At least one number
        );

        if (!passwordValid) {
            errorElement.textContent =
                "Your password must have at least 8 characters, 1 uppercase, 1 lowercase, and 1 number.";
            errorElement.style.color = "red";
        } else {
            errorElement.textContent = ""; // Clear error if valid
        }
    }

    // ====================== SIGN IN VALIDATION ====================== //
    const signInEmail = document.getElementById("signin-email");
    const signInPassword = document.getElementById("signin-password");
    const signInError = document.getElementById("signin-error");

    // Email Validation (Show error only after typing stops)
    signInEmail?.addEventListener("blur", function () {
        const email = signInEmail.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            signInError.textContent = "Please enter a valid email address.";
            signInError.style.color = "red";
        } else {
            signInError.textContent = "";
        }
    });

    // Password Validation (Only show error after typing starts)
    signInPassword?.addEventListener("input", function () {
        validatePassword(signInPassword.value.trim(), signInError);
    });

    // ====================== SIGN UP VALIDATION (Existing Logic) ====================== //
    function checkPasswordStrength(password) {
        const strengthIndicator = document.getElementById("password-strength");
        if (!strengthIndicator) return;

        if (!password) {
            strengthIndicator.textContent = "";
            return;
        }

        let strengthText = "Weak";
        let strengthColor = "red";

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
            strengthText = "Strong";
            strengthColor = "green";
        } else if (password.length >= 6 && (hasUpperCase || hasLowerCase) && (hasNumber || hasSpecialChar)) {
            strengthText = "Medium";
            strengthColor = "orange";
        }

        strengthIndicator.textContent = `Password Strength: ${strengthText}`;
        strengthIndicator.style.color = strengthColor;
    }

    function validatePasswordMatch() {
        const password = document.getElementById("signup-password").value;
        const retypePassword = document.getElementById("signup-retype-password").value;
        const matchIndicator = document.getElementById("password-match");

        if (!matchIndicator) return;

        if (!retypePassword) {
            matchIndicator.textContent = "";
            return;
        }

        if (password === retypePassword) {
            matchIndicator.textContent = "Passwords match!";
            matchIndicator.style.color = "green";
        } else {
            matchIndicator.textContent = "Passwords do not match";
            matchIndicator.style.color = "red";
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showEmailWarning() {
        const email = document.getElementById("signup-email").value;
        const emailWarning = document.getElementById("signup-error");

        if (!emailWarning) return;

        if (!email) {
            emailWarning.textContent = "";
            return;
        }

        if (!validateEmail(email)) {
            emailWarning.textContent = "Please enter a valid email address";
            emailWarning.style.color = "red";
        } else {
            emailWarning.textContent = "";
        }
    }

    function validateSignUpForm() {
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const retypePassword = document.getElementById("signup-retype-password").value;

        const emailValid = validateEmail(email);
        const passwordsMatch = password === retypePassword;

        const signUpButton = document.getElementById("signup-btn");
        signUpButton.disabled = !(name && emailValid && password && passwordsMatch);
    }

    document.getElementById("signup-password")?.addEventListener("input", function (e) {
        checkPasswordStrength(e.target.value);
        validatePasswordMatch();
        validateSignUpForm();
    });

    document.getElementById("signup-retype-password")?.addEventListener("input", function () {
        validatePasswordMatch();
        validateSignUpForm();
    });

    document.getElementById("signup-name")?.addEventListener("input", validateSignUpForm);
    document.getElementById("signup-email")?.addEventListener("input", function () {
        showEmailWarning();
        validateSignUpForm();
    });
});
