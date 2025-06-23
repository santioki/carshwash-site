document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");

  if (!form) {
    console.error("Booking form not found");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("full-name").value;
    const phone = document.getElementById("phone").value;
    const location = document.getElementById("location").value;
    const service = document.getElementById("service").value;
    const carSize = document.getElementById("car-size").value;

    // Validate required fields
    if (!fullName || !phone || !location || !service || !carSize) {
      alert("Please fill in all fields");
      return;
    }

    const data = {
      fullName,
      phone,
      location,
      service,
      carSize,
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
        alert("Booking failed: " + (result.error || "Unknown error"));
        console.error("Server error response:", result);
      }
    } catch (error) {
      alert("Server error: " + error.message);
      console.error("Fetch error:", error);
    }
  });
});
 




document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseDiv = document.getElementById("contactResponse");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();
      responseDiv.textContent = data.message || data.error;
      responseDiv.style.color = res.ok ? "green" : "red";
    } catch (err) {
      responseDiv.textContent = "Failed to send message.";
      responseDiv.style.color = "red";
    }
  });
});
