const clientname = document.getElementById("username");
const settings = document.getElementById("settings");
const admin = document.getElementById("adminbtn");
const signout = document.getElementById("signout");
const login = document.getElementById("login");
const register = document.getElementById("register");
let storage;

if (localStorage.getItem("user") !== null) {
  storage = JSON.parse(localStorage.getItem("user"));
}
if (!storage) {
  clientname.innerHTML = "";
  settings.className = "disabled";
  admin.className = "disabled";
  signout.className = "disabled";
} else {
  clientname.innerHTML = ` Welcome, ${storage.firstname}`;
  settings.className = "active nav-link";
  register.className = "disabled";
  login.className = "disabled";

  if (storage.admin) {
    admin.className = "active nav-link";
  }
}

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');

searchButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent form submission
  const searchTerm = searchInput.value.toLowerCase();
  try {
    const response = await fetch(`/api/search?q=${searchTerm}`);
    const searchResults = await response.json();
    displaySearchResults(searchResults);
  } catch (error) {
    console.error('Error searching products:', error);
  }
});

const displaySearchResults = (searchResults) => {
  const imagesContainer = document.getElementById("images");
  imagesContainer.innerHTML = ""; // Clear previous content

  searchResults.forEach((item) => {
    const image = document.createElement("img");
    image.style.width = "150px";
    image.style.height = "200px";
    image.className = "card-img-top";
    image.setAttribute("src", item.image);

    const name = document.createElement("h1");
    name.style.fontSize = "25px";
    name.innerHTML = item.name;
    name.style.fontFamily = "Roboto";

    const price = document.createElement("h1");
    price.style.fontSize = "25px";
    price.innerHTML = "Price: " + item.price;
    price.style.fontFamily = "Roboto";

    const buy = document.createElement("button");
    buy.id = item.name;
    buy.style.background = "white";
    buy.style.fontFamily = "Roboto";
    buy.innerHTML = "Buy";

    // Add event listener to the Buy button
    buy.addEventListener("click", () => {
      addToCart(buy.id, item.price);
    });

    const col = document.createElement("div");
    col.className = "col col-3";
    col.appendChild(image);
    col.appendChild(name);
    col.appendChild(price);
    col.appendChild(buy);
    col.style.width = "300px";

    imagesContainer.appendChild(col);
  });
};


document.addEventListener('DOMContentLoaded', function () {
  fetchimages();
});


const fetchimages = async () => {
  const res = await fetch("/api/getProducts");
  const products = await res.json();
  const images = products.map((item) => {
    const image = document.createElement("img");
    image.style.width = "150px";
    image.style.height = "200px";
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
    name.style.fontFamily = "Roboto";
    price.innerHTML = "Price:" + `${image.price}`;
    price.style.fontSize = "25px";
    price.style.fontFamily = "Roboto";
    const buy = document.createElement("button");
    buy.id = image.name;
    buy.style.background="white";
    buy.style.fontFamily = "Roboto";
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