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
    price.style.paddingLeft = "200px";
    price.innerHTML = image.price;
    tr.appendChild(price);

    const stock = document.createElement("td");
    stock.style.paddingLeft = "190px";
    stock.innerHTML = image.quantity;
    tr.appendChild(stock);

    const del = document.createElement("td");
    del.style.paddingLeft = "190px";
    const deleteprod = document.createElement("button");
    deleteprod.style.border = "white";
    deleteprod.style.backgroundColor = "darkred"; 
    deleteprod.style.borderRadius = "10%";
    deleteprod.style.color="white";
    deleteprod.style.padding = "10px 20px"; 
    deleteprod.style.fontSize = "16px";
    deleteprod.innerHTML = "Delete";
    deleteprod.id = "deleteBtn";
    deleteprod.name = image.name;
    del.appendChild(deleteprod);
    tr.appendChild(del);

    table.appendChild(tr); // Append the table row to the table
  });
};

fetchimages();

document.addEventListener("click", async (e) => {
  try {
    if(e.target.name)
    {
      // Product deleted successfully
    console.log("Product deleted successfully");
    alert("The product has deleted!");
    }
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

    

    // Check if the clicked element is a button
    if (e.target.tagName.toLowerCase() === "button") {
      // Refresh the site
      location.reload();
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
});
