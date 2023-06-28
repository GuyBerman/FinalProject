const storage = JSON.parse(localStorage.getItem("user"));
if (!storage) {
  location.href = "/";
}

const cartlist = document.getElementById("cartlist");
let totalprice = 0,
  count = 0;

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
  const res = await fetch("/api/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid: storage._id }),
  });
  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data));
  while (cartlist.firstChild) {
    cartlist.removeChild(cartlist.firstChild);
  }
});
