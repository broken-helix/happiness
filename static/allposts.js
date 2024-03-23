const searchBar = document.getElementById("searchBar");
const allPosts = document.querySelectorAll(".post-article");

const postArticleArray = Array.from(allPosts);

searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();

  const posts = document.querySelectorAll("article");

  searchPosts(searchTerm, posts);
});

function searchPosts(searchTerm, posts) {
  const searchTerms = searchTerm.split(" ");

  posts.forEach((post) => {
    const postTitle = post
      .querySelector("[data-title]")
      .getAttribute("data-title")
      .toLowerCase();
    const tags = Array.from(post.querySelectorAll("[data-tag]")).map((tag) =>
      tag.getAttribute("data-tag").toLowerCase()
    );
    const author = post
      .querySelector("[data-author]")
      .getAttribute("data-author")
      .toLowerCase();

    const article = post.closest("article");

    if (
      searchTerms.some((term) => postTitle.includes(term)) ||
      searchTerms.some((term) => tags.some((tag) => tag.includes(term))) || // Corrected line
      searchTerms.some((term) => author.includes(term))
    ) {
      article.style.display = "";
    } else {
      article.style.display = "none";
    }
  });
}
