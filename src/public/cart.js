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

  const h6 = document.createElement("h6");
  h6.className = "my-0";
  h6.innerHTML = `${name} (${storage.cart[name].quantity})`;

  const span = document.createElement("span");
  span.className = "text-body-secondary";
  span.innerHTML = `$${storage.cart[name].price * storage.cart[name].quantity}`;

  li.appendChild(div);
  div.appendChild(h6);
  li.appendChild(span);

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
