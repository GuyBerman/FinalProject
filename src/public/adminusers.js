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
    del.appendChild(deleteButton);
    tr.appendChild(del);

    table.appendChild(tr); // Append the table row to the table
  });
};

fetchimages();

document.addEventListener("click", async (e) => {
  try {
    const response = await fetch("/api/deleteProduct", {
      method: "DELETE",
      body: JSON.stringify({
        name: e.target.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    // Product deleted successfully
    console.log("Product deleted successfully");

    // Check if the clicked element is a button
    if (e.target.tagName.toLowerCase() === "button") {
      // Refresh the site
      location.reload();
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
});
