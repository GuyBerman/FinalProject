const fetchimages = async () => {
  const res = await fetch("/api/getProducts");
  const products = await res.json();
  const images = products.map((item) => {
    const image = document.createElement("img");
    image.style.width = "100px";
    image.style.height = "100px";
    image.className = "card-img-top";
    image.setAttribute("src", item.image);

    return {
      image,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    };
  });

  images.map((image) => {
    const table = document.getElementById("products"); // Get the table element
    const tr = document.createElement("tr");
    const imageCell = document.createElement("td");
    imageCell.appendChild(image.image);
    tr.appendChild(imageCell);

    const name = document.createElement("td");
    name.style.paddingLeft = "130px";
    name.innerHTML = image.name;
    tr.appendChild(name);

    const price = document.createElement("td");
    price.style.paddingLeft = "180px";
    price.innerHTML = image.price;
    tr.appendChild(price);

    const stock = document.createElement("td");
    stock.style.paddingLeft = "175px";
    stock.innerHTML = image.quantity;
    tr.appendChild(stock);

    table.appendChild(tr); // Append the table row to the table
  });
};

fetchimages();
