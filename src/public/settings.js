const userstats = document.getElementById("userstats");
const storage = JSON.parse(localStorage.getItem("user"));
if (!storage) {
  location.href = "/";
}
console.log(storage.transaction);

const span = document.createElement("span");
let text = "";
storage.transaction.map((transaction) => {
  for (const key of Object.keys(transaction[0])) {
    const li = document.createElement("li");
    li.innerHTML = `${key} ($${transaction[0][key].price})`;
    userstats.appendChild(li);
  }
});
