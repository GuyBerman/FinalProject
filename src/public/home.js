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

  document.addEventListener('DOMContentLoaded', function () {
    var searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', function () {
      var searchInput = document.getElementById('search-input');
      var searchText = searchInput.value.trim();
      if (searchText !== '') {
        // Perform search operation here
        alert('Searching for: ' + searchText);
      }
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    var searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', function () {
      var searchInput = document.getElementById('search-input');
      var searchText = searchInput.value.trim();
      if (searchText !== '') {
        // Perform search operation here
        alert('Searching for: ' + searchText);
      }
    });
  });


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

    // Add event listener to the Buy button
    buy.addEventListener("click", () => {
      addToCart(buy.id, image.price);
    });

    col.className = "col col-3";
    col.appendChild(image.image);
    col.appendChild(name);
    col.appendChild(price);
    col.appendChild(buy);
    col.style.width = "300px";
    document.getElementById("images").appendChild(col);
  });
};

const userId = storage._id;
const addToCart = async (productName, price) => {
  try {
    const res = await fetch("/api/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productName,
        price,
      }),
    });
    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data));
    location.reload();
  } catch (error) {
    console.error(error);
  }
};

fetchimages();
