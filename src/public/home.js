const clientname = document.getElementById("username");
const settings = document.getElementById("settings");
const admin = document.getElementById("adminbtn");
let storage;

if (localStorage.getItem("user") !== null) {
  storage = JSON.parse(localStorage.getItem("user"));
}
if (!storage) {
  clientname.innerHTML = "";
  settings.className = "disabled";
  admin.className = "disabled";
} else {
  clientname.innerHTML = ` Welcome, ${storage.firstname}`;
  settings.className = "active nav-link";

  if (storage.admin) {
    admin.className = "active nav-link";
  }
}

const fetchimages = async () => {
  const res = await fetch("/api/getProducts");
  const products = await res.json();
  const images = products.map((item) => {
    const image = document.createElement("img");
    image.style.width = "200px";
    image.style.height = "150px";
    image.className = "card-img-top";
    image.setAttribute("src", item.image);
    return { image, name: item.name, price: item.price };
  });
  images.map((image) => {
    const col = document.createElement("div");
    const name = document.createElement("h1");
    const price = document.createElement("h1");
    name.style.fontSize = "25px";
    name.innerHTML = image.name;
    name.style.fontFamily = "Monospace";
    price.innerHTML = "Price:" + `${image.price}`;
    price.style.fontSize = "25px";
    price.style.fontFamily = "Monospace";
    const buy = document.createElement("button");
    buy.id = image.name;
    buy.innerHTML = "Buy";

    col.className = "col col-3";
    col.appendChild(image.image);
    col.appendChild(name);
    col.appendChild(price);
    col.appendChild(buy);
    col.style.width = "300px";
    document.getElementById("images").appendChild(col);
  });
};
fetchimages();
