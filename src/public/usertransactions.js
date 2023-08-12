const userTable = document.getElementById("userTable");
const storage = JSON.parse(localStorage.getItem("user"));

if (!storage) {
  location.href = "/";
}

storage.transaction.forEach((transaction, index) => {
  const transactionGroup = document.createElement("tr");
  transactionGroup.className = "transaction-group";

  const th = document.createElement("th");
  th.textContent = `Transaction ${index + 1}`;
  th.colSpan = 2;
  th.className = "transaction-header";
  transactionGroup.appendChild(th);

  userTable.querySelector("tbody").appendChild(transactionGroup);

  const productsInTransaction = [];
  let totalPrice = 0;

  transaction.forEach((productObj) => {
    for (const key of Object.keys(productObj)) {
      productsInTransaction.push(key);
      totalPrice += productObj[key].price;
    }
  });

  const tr = document.createElement("tr");
  const productCell = document.createElement("td");
  productCell.textContent = productsInTransaction.join(", ");
  productCell.colSpan = 2;
  tr.appendChild(productCell);
  userTable.querySelector("tbody").appendChild(tr);

  const totalPriceRow = document.createElement("tr");
  const totalCell = document.createElement("td");
  totalCell.textContent = "Total Price:";
  const totalPriceCell = document.createElement("td");
  totalPriceCell.textContent = `$${totalPrice}`;
  totalPriceRow.appendChild(totalCell);
  totalPriceRow.appendChild(totalPriceCell);
  userTable.querySelector("tbody").appendChild(totalPriceRow);
});
