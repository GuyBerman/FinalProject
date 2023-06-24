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
    table.style.width = "100%";
    const tr = document.createElement("tr");
    const imageCell = document.createElement("td");
    const email = document.createElement("td");
    email.innerHTML = user.email;
    tr.appendChild(email);

    const cartItems = document.createElement("td");
    const productNames = Object.keys(user.cart).join(", ");
    cartItems.innerHTML = productNames;
    console.log(productNames);

    const firstname = document.createElement("td");
    firstname.innerHTML = user.firstname;
    firstname.style.paddingLeft = "130px";
    tr.appendChild(firstname);

    const lastname = document.createElement("td");
    lastname.innerHTML = user.lastname;
    firstname.style.paddingLeft = "50px";
    tr.appendChild(lastname);

    const password = document.createElement("td");
    password.innerHTML = user.password;
    firstname.style.paddingLeft = "130px";
    tr.appendChild(password);

    const admin = document.createElement("td");
    admin.innerHTML = user.admin;
    tr.appendChild(admin);

    const del = document.createElement("td");
    del.style.paddingLeft = "190px";
    const deleteprod = document.createElement("button");
    deleteprod.style.color = "white";
    deleteprod.style.backgroundColor = "red";
    deleteprod.innerHTML = "Delete";
    deleteprod.id = "deleteBtn";
    deleteprod.name = user.name;
    del.appendChild(deleteprod);
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

const fetchCart = async () => {
  try {
    const res = await fetch("/api/getUser");
    const users = await res.json();

    users.map((user) => {
      const userId = user._id; // Assuming the user ID field is named _id

      // Check if the user has a cart
      if (user.cart) {
        const cartItems = user.cart;
        const productNames = Object.keys(cartItems).join(", ");

        // Create table row for the cart
        const cartRow = document.createElement("tr");

        // Create table cells for user ID and cart items
        const userIdCell = document.createElement("td");
        userIdCell.innerHTML = userId;
        console.log(userIdCell);
        cartRow.appendChild(userIdCell);

        const cartItemsCell = document.createElement("td");
        cartItemsCell.innerHTML = productNames;
        console.log(cartItemsCell);
        cartRow.appendChild(cartItemsCell);

        // Append the cart row to the table
        const cartTable = document.getElementById("cartTable");
        cartTable.appendChild(cartRow);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

fetchCart();
