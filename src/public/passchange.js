const password = document.getElementById("password1");
document.getElementById("passbtn").addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch("/api/updatePass", {
    method: "PUT",
    body: JSON.stringify({
      id: JSON.parse(localStorage.getItem("user"))._id,
      password: password.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("Password changed successfully!");
});
