const searchBar = document.getElementById("searchBar");
const allPosts = document.querySelectorAll(".post-article");

console.log("allPosts: ", allPosts);

const postArticleArray = Array.from(allPosts);

searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();

  const posts = document.querySelectorAll("[data-type]");

  posts.forEach((post) => {
    const postTitle = post.getAttribute("data-type").toLowerCase();

    const article = post.closest("article");

    if (postTitle.includes(searchTerm)) {
      article.style.display = "";
    } else {
      article.style.display = "none";
    }
  });
});
