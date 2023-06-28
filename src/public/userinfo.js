const email = document.getElementById("inputemail");
const firstname = document.getElementById("inputfirstname");
const lastname = document.getElementById("inputlastname");

const storage = JSON.parse(localStorage.getItem("user"));
if (!storage) {
  location.href = "/";
}
email.value = storage.email;
firstname.value = storage.firstname;
lastname.value = storage.lastname;
