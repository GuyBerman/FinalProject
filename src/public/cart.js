document.addEventListener("DOMContentLoaded", function () {
  var firstNameInput = document.getElementById("firstName");
  var lastNameInput = document.getElementById("lastName");
  var emailInput = document.getElementById("email");
  var ccNumberInput = document.getElementById("cc-number");
  var ccCvvInput = document.getElementById("cc-cvv");
  var ccNameInput = document.getElementById("cc-name");


ccNumberInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

ccCvvInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

ccNameInput.addEventListener("input", function () {
  this.value = this.value.replace(/[0-9]/g, "");
  });

firstNameInput.addEventListener("input", function () {
  this.value = this.value.replace(/[0-9]/g, "");
});
  
lastNameInput.addEventListener("input", function () {
  this.value = this.value.replace(/[0-9]/g, "");
});

const storage = JSON.parse(localStorage.getItem("user"));
if (!storage) {
  location.href = "/";
}

const cartlist = document.getElementById("cartlist");
let totalprice = 0,
  count = 0;
document.getElementById("numofprod").innerHTML = count;

for (const name of Object.keys(storage.cart)) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between lh-sm";

  const div = document.createElement("div");
  div.id = name;

  const h6 = document.createElement("h6");
  h6.className = "my-0";
  h6.innerHTML = `${name} (${storage.cart[name].quantity})`;

  const span = document.createElement("span");
  span.className = "text-body-secondary";
  span.innerHTML = `$${storage.cart[name].price * storage.cart[name].quantity}`;

  const btn = document.createElement("button");
  btn.innerHTML = "Delete";
  btn.id = name;

  btn.addEventListener("click", async (e) => {
    const productName = e.target.id;
    const userId = storage._id;

    try {
      const response = await fetch("/api/deleteProductFromCart", {
        method: "DELETE",
        body: JSON.stringify({ userId, productName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the local storage with the updated cart data
        storage.cart = data.cart;
        localStorage.setItem("user", JSON.stringify(storage));

        // Remove the deleted product from the DOM
        const productElement = document.getElementById(name);
        if (productElement) {
          productElement.parentElement.remove();
        }

        // Recalculate the total price and count
        totalprice -= storage.cart[name].price * storage.cart[name].quantity;
        count -= storage.cart[name].quantity;

        // Update the total price and count in the DOM
        document.getElementById("numofprod").innerHTML = count;
        document.getElementById("totalprice").innerHTML = `$${totalprice}`;
      } else {
        console.error("Error deleting product from cart:", response.status);
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }

    location.reload();
  });

  li.appendChild(div);
  div.appendChild(h6);
  li.appendChild(span);
  li.appendChild(btn);

  cartlist.appendChild(li);
  totalprice += storage.cart[name].price * storage.cart[name].quantity;
  count += storage.cart[name].quantity;

}

const li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between";

const span = document.createElement("span");
span.innerHTML = "Total";

const strong = document.createElement("strong");
strong.innerHTML = `$${totalprice}`;

li.appendChild(span);
li.appendChild(strong);
cartlist.appendChild(li);

document.getElementById("numofprod").innerHTML = count;

document.getElementById("transaction").addEventListener("click", async (e) => {
  e.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const ccNumber = ccNumberInput.value.trim();
  const ccCvv = ccCvvInput.value.trim();
  const ccName = ccNameInput.value.trim();
  const expirationDate = new Date(document.getElementById("cc-expiration").value);
  const currentDate = new Date();

  if (firstName === "" || lastName === "" || email === "" || ccNumber === "" || ccCvv === "" || ccName === "") {
    alert("Please fill in all required fields.");
    return;
  }

  if (expirationDate <= currentDate) {
    alert("Please enter a valid expiration date in the future.");
    return;}

  const res = await fetch("/api/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid: storage._id }),
  });


   if (res.ok) {
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));

      // Clear the cart and update count
      while (cartlist.firstChild) {
        cartlist.removeChild(cartlist.firstChild);
      }
      count = 0;

      alert("Transaction successful! Thank you for your purchase.");

      // Update the numofprod element
      document.getElementById("numofprod").innerHTML = count;

      // Redirect to the home page
      location.href = "/home";
    } else {
      alert("Transaction failed. Please try again later.");
    }
});

});
