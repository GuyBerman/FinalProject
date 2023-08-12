const clientname = document.getElementById("username");
const settings = document.getElementById("settings");
const admin = document.getElementById("adminbtn");
const graphs = document.getElementById("graphbtn");
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
  graphs.className= "disabled";
} else {
  clientname.innerHTML = ` Welcome, ${storage.firstname}`;
  settings.className = "active nav-link";
  register.className = "disabled";
  login.className = "disabled";

  if (storage.admin) {
    admin.className = "active nav-link";

    graphs.className= "active nav-link";
  }
}

const filterButtons = document.querySelectorAll("#filtering button");
const searchInput = document.getElementById('search-input');
let typingTimeout;

searchInput.addEventListener('input', async (event) => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  showAllFilter.classList.add("active");
  event.preventDefault(); // Prevent form submission
  clearTimeout(typingTimeout);
  const searchTerm = searchInput.value.toLowerCase();
  typingTimeout = setTimeout(async () => {
    try {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const searchResults = await response.json();
      displaySearchResults(searchResults);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  }, 100); // Delay in milliseconds
});

const showAllFilter = document.getElementById('btn-all');
const capsulesFilter = document.getElementById('btn-capsules');
const accessoriesFilter = document.getElementById('btn-accessories');
const machinesFilter = document.getElementById('btn-machines');
const nespresspFilter = document.getElementById('btn-nespresso');
const eliteFilter = document.getElementById('btn-elite');


showAllFilter.addEventListener("click", async () => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  showAllFilter.classList.add("active");
  try {
    const response = await fetch("/api/getProducts");
    const products = await response.json();
    displaySearchResults(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

capsulesFilter.addEventListener("click", async () => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  capsulesFilter.classList.add("active");
  const selectedType = "Capsules"; // Replace with the desired type
  try {
    const response = await fetch(`/api/getProducts?type=${selectedType}`);
    const products = await response.json();
    displaySearchResults(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

accessoriesFilter.addEventListener("click", async () => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  accessoriesFilter.classList.add("active");
  const selectedType = "Accessories"; // Replace with the desired type
  try {
    const response = await fetch(`/api/getProducts?type=${selectedType}`);
    const products = await response.json();
    displaySearchResults(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

machinesFilter.addEventListener("click", async () => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  machinesFilter.classList.add("active");
  const selectedType = "Machines"; // Replace with the desired type
  try {
    const response = await fetch(`/api/getProducts?type=${selectedType}`);
    const products = await response.json();
    displaySearchResults(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

nespresspFilter.addEventListener("click", async () => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  nespresspFilter.classList.add("active");
  const selectedBrand = "Nespresso"; // Replace with the desired type
  try {
    const response = await fetch(`/api/getProducts?brand=${selectedBrand}`);
    const products = await response.json();
    displaySearchResults(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

eliteFilter.addEventListener("click", async () => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  eliteFilter.classList.add("active");
  const selectedBrand = "Elite"; // Replace with the desired type
  try {
    const response = await fetch(`/api/getProducts?brand=${selectedBrand}`);
    const products = await response.json();
    displaySearchResults(products);
  } catch (error) {
    console.error('Error fetching products:', error);
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
    price.style.fontSize = "20px";
    price.innerHTML = "Price: " + item.price;
    price.style.fontFamily = "Roboto";

    const buy = document.createElement("button");
    buy.id = item.name;
    buy.className = "btn ";
    buy.style.background = "efebe5";
    buy.style.color="darkgrey";
    buy.style.fontFamily = "Roboto";
    buy.innerHTML = "Add To Cart";
    buy.style.fontWeight = "bold";

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


const sortingSelect = document.getElementById('sortingSelect');

// Add event listener to the sorting select
sortingSelect.addEventListener('change', async () => {
  filterButtons.forEach(btn => btn.classList.remove("active"));
  showAllFilter.classList.add("active");
  console.log('Sorting option changed:', sortingSelect.value);
  const selectedSortOption = sortingSelect.value;
  const response = await fetch("/api/getProducts");
  const products = await response.json();

  // Sort the products based on the selected option
  if (selectedSortOption === "default") {
    displaySearchResults(products);
  } 
  else if (selectedSortOption === 'Price low to high') {
    const sortedProducts = products.slice().sort((a, b) => a.price - b.price);
    displaySearchResults(sortedProducts);
  } 
  else if (selectedSortOption === 'Price high to low') {
    const sortedProducts = products.slice().sort((a, b) => b.price - a.price);
    displaySearchResults(sortedProducts);
  }
});


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
    image.style.margin="20px";
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
    buy.className = "btn ";
    buy.style.background = "efebe5";
    buy.style.color="darkgrey";
    buy.style.fontWeight = "bold";
    buy.style.fontFamily = "Roboto";
    buy.innerHTML = "Add To Cart";

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
