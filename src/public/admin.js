let storage;
const adminbtn = document.getElementById("adminbtn");
adminbtn.addEventListener("click", () => {
  if (localStorage.getItem("user") !== null) {
    storage = JSON.parse(localStorage.getItem("user"));
    console.log(localStorage.getItem("user"));
  }
  if (!storage.admin) {
    location.href = "/";
  }
});
