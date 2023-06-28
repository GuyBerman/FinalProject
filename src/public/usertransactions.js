const userTable = document.getElementById("userTable");
const storage = JSON.parse(localStorage.getItem("user"));
if (!storage) {
  location.href = "/";
}

storage.transaction.forEach((transaction) => {
  for (const key of Object.keys(transaction[0])) {
    const tr = document.createElement("tr");
    const keyCell = document.createElement("td");
    keyCell.textContent = key;
    const priceCell = document.createElement("td");
    priceCell.textContent = `$${transaction[0][key].price}`;
    tr.appendChild(keyCell);
    tr.appendChild(priceCell);
    userTable.querySelector("tbody").appendChild(tr);
  }
});
