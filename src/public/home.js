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
    image.style.width = "100px";
    image.style.height = "100px";
    image.className = "card-img-top";
    image.setAttribute("src", item.image);
    return { image, name: item.name };
  });
  images.map((image) => {
    const col = document.createElement("div");

    const name = document.createElement("h1");
    name.style.fontSize = "25px";
    name.innerHTML = image.name;

    const buy = document.createElement("button");
    buy.innerHTML = "BUY";

    col.className = "col col-3";
    col.appendChild(image.image);
    col.appendChild(name);
    col.appendChild(buy);

    document.getElementById("images").appendChild(col);
  });
};
fetchimages();
