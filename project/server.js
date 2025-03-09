require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// Booking Schema
const BookingSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    destination: String,
    travelDate: String,
    numberOfPeople: Number,
});

const Booking = mongoose.model("Booking", BookingSchema);

// Gmail SMTP Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
    },
});

// API Endpoint: Handle Booking Submission
app.post("/bookings", async (req, res) => {
    try {
        const { fullName, email, phone, destination, travelDate, numberOfPeople } = req.body;

        // Save booking to MongoDB
        const newBooking = new Booking({ fullName, email, phone, destination, travelDate, numberOfPeople });
        await newBooking.save();

        // Email content
        const emailContent = `
            <h2>Booking Confirmation</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Travel Date:</strong> ${travelDate}</p>
            <p><strong>Number of People:</strong> ${numberOfPeople}</p>
            <p>Thank you for booking with us! We will contact you soon.</p>
        `;

        // Send Confirmation Email to Customer
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Booking Confirmation",
            html: emailContent,
        });

        // Send Notification Email to Admin
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "travelwithvickzee@gmail.com",
            subject: "New Booking Received",
            html: emailContent,
        });

        res.status(200).json({ message: "Booking successful! Confirmation email sent." });
    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
