document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("active");
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

