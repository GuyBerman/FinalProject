const fetchimages = async () => {
  const res = await fetch("/api/getUser");
  const User = await res.json();
  const user = User.map((item) => {
    return {
      email: item.email,
      firstname: item.firstname,
      lastname: item.lastname,
      password: item.password,
      admin: item.admin,
      cart: item.cart,
    };
  });

  user.map((user) => {
    const table = document.getElementById("users"); // Get the table element
    const tr = document.createElement("tr");

    // Create <td> elements for each data element
    const emailCell = document.createElement("td");
    emailCell.innerHTML = user.email;
    tr.appendChild(emailCell);

    const firstnameCell = document.createElement("td");
    firstnameCell.innerHTML = user.firstname;
    tr.appendChild(firstnameCell);

    const lastnameCell = document.createElement("td");
    lastnameCell.innerHTML = user.lastname;
    tr.appendChild(lastnameCell);

    const passwordCell = document.createElement("td");
    passwordCell.innerHTML = user.password;
    tr.appendChild(passwordCell);

    const adminCell = document.createElement("td");
    adminCell.innerHTML = user.admin;
    tr.appendChild(adminCell);

    const del = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete user";
    deleteButton.dataset.email = user.email; // Store the email in the dataset
    del.appendChild(deleteButton);
    tr.appendChild(del);

    table.appendChild(tr); // Append the table row to the table
  });
};

fetchimages();

document.addEventListener("click", async (e) => {
  try {
    if (e.target.tagName.toLowerCase() === "button" && e.target.textContent === "Delete user") {
      const userEmail = e.target.dataset.email; // Get the stored email from the dataset
      const response = await fetch("/api/deleteUser", {
        method: "DELETE",
        body: JSON.stringify({
          email: userEmail, // Use the captured user's email for deletion
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
      const row = e.target.closest("tr");
      row.remove();
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
});