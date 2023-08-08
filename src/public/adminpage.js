const prodname = document.getElementById("prodname");
const price = document.getElementById("prodprice");
const changeq = document.getElementById("prodqua");

document.getElementById("updatebtn").addEventListener("click", async () => {
  await fetch("/api/updatePrice", {
    method: "PUT",
    body: JSON.stringify({
      name: prodname.value,
      price: price.value,
      quantity: changeq.value,
      admin: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});
const newname = document.getElementById("newprod");
const producttype = document.getElementById("productType").value;
const newprice = document.getElementById("newprice");
const newimg = document.getElementById("newimg");
const newqua = document.getElementById("newqua");

document.getElementById("createbtn").addEventListener("click", async () => {
  const file = newimg.files[0];
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const filename = await res.json();

  await fetch("/api/createProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newname.value,
      price: newprice.value,
      image: `/img/${filename.fileName}`,
      quantity: newqua.value,
      producttype:producttype,
    }),
  });


  newname.value = "";
  producttype.value="";
  newprice.value = "";
  newimg.value = "";
  newqua.value = "";
});
