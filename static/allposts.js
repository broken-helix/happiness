// Audio
const bloop = new Audio("/static/audio/bloop.mp3");
const box = new Audio("/static/audio/box.mp3");
const cat = new Audio("/static/audio/cat.mp3");
const pop = new Audio("/static/audio/pop.mp3");
const wee = new Audio("/static/audio/wee.mp3");
const wow = new Audio("/static/audio/wow.mp3");

const audioArray = [bloop, box, cat, pop, wee, wow];

// FUSE PACKAGE OPTIONS
const fuseOptions = {
  // isCaseSensitive: false,
  includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["title", "tags", "author"],
};

const searchBar = document.getElementById("searchBar");
const allPostsContainer = document.getElementById("allposts");
const emojiButtons = document.querySelectorAll(".emoji-btn");
const posts = document.querySelectorAll("article");

searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();

  searchPosts(searchTerm, posts);
});

function searchPosts(searchTerm, posts) {
  if (!searchTerm) {
    posts.forEach((post) => {
      post.style.display = "";
    });
    return;
  }
  const postList = [];

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

    const id = post.dataset.id;

    const object = {
      id: id,
      title: postTitle,
      tags,
      author,
    };

    postList.push(object);
  });

  const fuse = new Fuse(postList, fuseOptions);

  const filteredPosts = fuse.search(searchTerm);

  filteredPosts.forEach((filteredPost) => {
    const post = document.querySelector(`[data-id='${filteredPost.item.id}']`);
    if (post) {
      post.style.display = "";
      allPostsContainer.appendChild(post);
    }
  });

  Array.from(allPostsContainer.children).forEach((post) => {
    if (
      !filteredPosts.some(
        (filteredPost) => filteredPost.item.id === post.dataset.id
      )
    ) {
      post.style.display = "none";
    }
  });
}

emojiButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    filteredPosts(e.target.dataset.type);
    const randomIndex = Math.floor(Math.random() * audioArray.length);
    const soundEffect = audioArray[randomIndex];
    soundEffect.play();
  });
});

function filteredPosts(emoji) {
  const filteredPosts = [];

  posts.forEach((post) => {
    const postEmoji = post
      .querySelector("[data-emoji]")
      .getAttribute("data-emoji");

    if (postEmoji === emoji) {
      filteredPosts.push(post);
    }
  });

  posts.forEach((post) => {
    if (!filteredPosts.includes(post)) {
      post.style.display = "none";
    } else {
      post.style.display = "";
    }
  });

  filteredPosts.forEach((post) => {
    allPostsContainer.appendChild(post);
  });
}
