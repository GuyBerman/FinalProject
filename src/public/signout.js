const btn = document.getElementById("signout");
btn.addEventListener("click", () => {
  localStorage.removeItem("user");
  location.href = "/";
});
