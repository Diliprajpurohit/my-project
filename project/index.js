// Save selected destination when "Book Now" is clicked
document.addEventListener("DOMContentLoaded", function () {
    const bookNowButtons = document.querySelectorAll(".btn-book-now");
    
    bookNowButtons.forEach(button => {
        button.addEventListener("click", function () {
            const destination = this.getAttribute("data-destination");
            localStorage.setItem("selectedDestination", destination);
            window.location.href = "index.html"; // Redirect to booking page
        });
    });

    // Autofill the destination field on index.html
    const destinationInput = document.querySelector("#destination");
    if (destinationInput) {
        const savedDestination = localStorage.getItem("selectedDestination");
        if (savedDestination) {
            destinationInput.value = savedDestination;
        }
    }
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
                    alert("Booking confirmed! A confirmation email has been sent.");
                    window.location.href = "index.html"; // Redirect after booking
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
