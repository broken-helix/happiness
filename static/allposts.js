const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("change", (event) => {
  console.log(event.target.value);
});

console.log(searchBar);

console.log("fire");
