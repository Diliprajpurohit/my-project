document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active"); // Toggle menu visibility
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove("active"); // Close menu
        }
    });
});



// Handle form submission and send data to backend
document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.querySelector("#booking-form");

    if (bookingForm) {
        bookingForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            const formData = {
                fullName: document.querySelector("#fullName").value,
                email: document.querySelector("#email").value,
                phone: document.querySelector("#phone").value,
                destination: document.querySelector("#destination").value,
                travelDate: document.querySelector("#travelDate").value,
                numberOfPeople: document.querySelector("#numberOfPeople").value,
            };

            try {
                const response = await fetch("http://localhost:5000/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                if (response.ok) {
                    alert("Thank you for choosing us. We will get back to you soon.");
                    bookingForm.reset(); // Clear the form after submission
                } else {
                    alert("Booking failed: " + result.message);
                }
            } catch (error) {
                alert("Error submitting booking. Please try again.");
                console.error("Booking error:", error);
            }
        });
    }
});

