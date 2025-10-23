
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const ageInput = document.getElementById("age");
const addUserBtn = document.getElementById("addUser");
const usersContainer = document.querySelector(".usersContainer");

addUserBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  let res = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify({
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      age: Number(ageInput.value),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  firstNameInput.value = "";
  lastNameInput.value = "";
  ageInput.value = "";
  renderUsers();
});

async function getUsers() {
  const res = await fetch("http://localhost:3000/users");
  const users = await res.json();
  return users;
}
window.addEventListener("load", async () => {
  renderUsers();
});
async function eleteUserById(id) {
  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  renderUsers();
}
async function renderUsers() {
  const users = await getUsers();
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    usersContainer.innerHTML += `
        <div class="usercard">
            <p>First Name: <b class="title">${user.firstName}</b></p>
            <p>Last Name: <b class="title">${user.lastName}</b></p>
            <p>Age: <b class="title">${user.age}</b></p>
            <button class="deleteBtn" onClick="eleteUserById(${user.id})">Delete User ${user.id}</button>
        </div>
        `;
  });
}
async function editUserById() {
  const res = await fetch(`http://localhost:3000/users/3`,{
    method : 'PUT',
    body : JSON.stringify({
      firstName : 'Pedri',
      lastName : 'Haland',
      age : 26
    }),
    headers : {
      'Content-Type' : 'application/json'
    }

  })
  const data = await res.json()
}
editUserById()
