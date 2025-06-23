// Load data on page load
loadDashboardData();

async function loadDashboardData() {
  try {
    // Fetch and render bookings
    const bookingsRes = await fetch('/api/admin/bookings');
    const bookings = await bookingsRes.json();

    const bookingsDiv = document.getElementById('bookings-list');
    bookingsDiv.innerHTML = `
      <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Service</th>
            <th>Car Size</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${bookings.map(b => `
            <tr>
              <td>${b.fullName}</td>
              <td>${b.phone}</td>
              <td>${b.location}</td>
              <td>${b.service}</td>
              <td>${b.carSize}</td>
              <td>${new Date(b.createdAt).toLocaleString()}</td>
              <td><button onclick="deleteBooking('${b._id}')">Delete</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // Fetch and render contact messages
    const contactsRes = await fetch('/api/admin/contacts');
    const contacts = await contactsRes.json();

    const contactsDiv = document.getElementById('contact-messages');
    contactsDiv.innerHTML = `
      <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${contacts.map(c => `
            <tr>
              <td>${c.name}</td>
              <td>${c.email}</td>
              <td>${c.message}</td>
              <td>${new Date(c.createdAt).toLocaleString()}</td>
              <td><button onclick="deleteContact('${c._id}')">Delete</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    alert("Error loading dashboard data");
  }
}

// Delete a booking
function deleteBooking(id) {
  fetch(`/admin/bookings/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Booking deleted');
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert('Error deleting booking');
    });
}

// Delete a contact message
function deleteContact(id) {
  fetch(`/admin/contacts/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Contact message deleted');
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert('Error deleting contact message');
    });
}
