document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");

  if (!form) {
    console.error("Booking form not found");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      fullName: document.getElementById("full-name").value,
      phone: document.getElementById("phone").value,
      location: document.getElementById("location").value,
      service: document.getElementById("service").value,
      carSize: document.getElementById("car-size").value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking submitted successfully!");
        form.reset();
      } else {
        alert("Booking failed: " + (result.error || result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Server error: " + error.message);
    }
  });
});
