const fetchimages = async () => {
  try {
    const res = await fetch("/api/getUser");
    const User = await res.json();
    const table = document.getElementById("users"); // Get the table element

    User.forEach((item) => {
      const tr = document.createElement("tr");

      const emailCell = document.createElement("td");
      emailCell.innerHTML = item.email;
      tr.appendChild(emailCell);

      const firstnameCell = document.createElement("td");
      firstnameCell.innerHTML = item.firstname;
      tr.appendChild(firstnameCell);

      const lastnameCell = document.createElement("td");
      lastnameCell.innerHTML = item.lastname;
      tr.appendChild(lastnameCell);

      const passwordCell = document.createElement("td");
      passwordCell.innerHTML = item.password;
      tr.appendChild(passwordCell);

      const adminCell = document.createElement("td");
      adminCell.innerHTML = item.admin;
      tr.appendChild(adminCell);

      const del = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete user";
      deleteButton.dataset.email = item.email; // Store the email in the dataset

      deleteButton.addEventListener("click", async () => {
        try {
          if (!item.admin) {
          // Inside the deleteUser event listener
          console.log("Deleting user with email:", deleteButton.dataset.email);
          const response = await fetch("/api/deleteUser", {
            method: "DELETE",
            body: JSON.stringify({
              email: deleteButton.dataset.email,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
          }

          // User deleted successfully
          console.log("User deleted successfully");

          // Remove the deleted row from the table
          tr.remove();
        } else {
          // Show alert if admin tries to delete another admin
          alert("You cannot delete another admin user.");
        }
        } catch (error) {
          console.error("Error deleting user:", error.message);
        }
      });

      del.appendChild(deleteButton);
      tr.appendChild(del);

      table.appendChild(tr); // Append the table row to the table
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  fetchimages();
});

const searchInput = document.getElementById('search-input');
let typingTimeout;

searchInput.addEventListener('input', async (event) => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  showAllFilter.classList.add("active");
  event.preventDefault(); // Prevent form submission
  clearTimeout(typingTimeout);
  const searchTerm = searchInput.value.toLowerCase();
  typingTimeout = setTimeout(async () => {
    try {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const searchResults = await response.json();
      displaySearchResults(searchResults);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  }, 100); // Delay in milliseconds
});