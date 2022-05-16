const name = document.querySelector("#name");
const email = document.querySelector("#email");
const number = document.querySelector("#number");

const leaderForm = document.querySelector("#leaderForm");
const leaderList = document.querySelector(".leaderList");

function leaderSubmitHandler(e) {
  e.preventDefault();

  axios
    .post("http://localhost:5000/leader", {
      name: name.value,
      email: email.value,
      number: number.value,
    })
    .then((data) => {
      getLeaders();
      name.value = "";
      email.value = "";
      number.value = "";
    })
    .catch((err) => alert(err.response.data));
}

leaderForm.addEventListener("submit", leaderSubmitHandler);

function getLeaders() {
  axios.get("http://localhost:5000/leaders").then(
    (res) =>
      (leaderList.innerHTML = `
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Number</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   ${res.data.result.map(
     (item) =>
       `<tr>
       <td>${item.name}</td>
       <td>${item.email}</td>
       <td>${item.number}</td>
       <td> <button onclick=deleteLeader("${item.email}") class="btn btn-sm btn-danger">Delete</button>
     </tr>`
   )}
  </tbody>
</table>
`)
  );
}

getLeaders();

function deleteLeader(email) {
  const url = `http://localhost:5000/leader/${email}`;

  console.log("calliing");

  axios
    .delete(url)
    .then((res) => {
      console.log(res.data.message);
      getLeaders();
    })
    .catch((err) => console.log(err));
}
