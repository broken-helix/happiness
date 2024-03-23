const searchBar = document.getElementById("searchBar");
const allPosts = document.querySelectorAll(".post-article");

const postArticleArray = Array.from(allPosts);

searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase().split(" ");

  const posts = document.querySelectorAll("article");

  posts.forEach((post) => {
    const postTitle = post
      .querySelector("[data-title]")
      .getAttribute("data-title")
      .toLowerCase()
      .split(" ");
    const tags = Array.from(post.querySelectorAll("[data-tag]")).map((tag) =>
      tag.getAttribute("data-tag").toLowerCase()
    );
    const author = post
      .querySelector("[data-author]")
      .getAttribute("data-author")
      .toLowerCase();

    const article = post.closest("article");

    if (
      searchTerm.some((term) =>
        postTitle.some((title) => title.includes(term))
      ) ||
      tags.some((tag) => searchTerm.some((term) => tag.includes(term))) ||
      searchTerm.some((term) => author.includes(term))
    ) {
      article.style.display = "";
    } else {
      article.style.display = "none";
    }
  });
});
