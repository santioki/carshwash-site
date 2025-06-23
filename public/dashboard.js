document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch bookings
    const bookingsRes = await fetch("/api/admin/bookings");
    const bookings = await bookingsRes.json();

    const bookingsContainer = document.getElementById("bookings-list");
    if (bookings.length === 0) {
      bookingsContainer.innerHTML = "<p>No bookings yet.</p>";
    } else {
      bookings.forEach(booking => {
        const bookingEl = document.createElement("div");
        bookingEl.className = "booking-entry";
        bookingEl.innerHTML = `
          <strong>Name:</strong> ${booking.fullName}<br>
          <strong>Phone:</strong> ${booking.phone}<br>
          <strong>Location:</strong> ${booking.location}<br>
          <strong>Service:</strong> ${booking.service}<br>
          <strong>Car Size:</strong> ${booking.carSize}<br>
          <hr>
        `;
        bookingsContainer.appendChild(bookingEl);
      });
    }

    // Fetch contacts
    const contactsRes = await fetch("/api/admin/contacts");
    const contacts = await contactsRes.json();

    const contactsContainer = document.getElementById("contact-messages");
    if (contacts.length === 0) {
      contactsContainer.innerHTML = "<p>No contact messages yet.</p>";
    } else {
      contacts.forEach(contact => {
        const contactEl = document.createElement("div");
        contactEl.className = "contact-entry";
        contactEl.innerHTML = `
          <strong>Name:</strong> ${contact.name}<br>
          <strong>Email:</strong> ${contact.email}<br>
          <strong>Message:</strong> ${contact.message}<br>
          <hr>
        `;
        contactsContainer.appendChild(contactEl);
      });
    }

  } catch (err) {
    console.error("Failed to load data", err);
    alert("Error loading data");
  }
});
