const bloop = new Audio("/static/audio/bloop.mp3");
const box = new Audio("/static/audio/box.mp3");
const cat = new Audio("/static/audio/cat.mp3");
const pop = new Audio("/static/audio/pop.mp3");
const wee = new Audio("/static/audio/wee.mp3");
const wow = new Audio("/static/audio/wow.mp3");

const audioArray = [bloop, box, cat, pop, wee, wow];

function generateRandomPost() {
  const randomIndex = Math.floor(Math.random() * audioArray.length);
  const soundEffect = audioArray[randomIndex];
  soundEffect.play();
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/random-posts/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  var csrfToken = document.querySelector(
    "input[name=csrfmiddlewaretoken]"
  ).value;
  xhr.setRequestHeader("X-CSRFToken", csrfToken);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var responseData = JSON.parse(xhr.responseText);
      document.getElementById("random-post").innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${responseData.title}</h2>
                    <p class="card-text h1" >${responseData.emoji}</p>
                    <p class="card-text">${"Author: " + responseData.author}</p>
                </div>
            `;
    }
  };
  xhr.send();
}

const audio = document.getElementById("audio");
const musicBtn = document.getElementById("btn-music");

const musicToggle = () => {
  if (musicBtn.classList.contains("playing")) {
    musicBtn.classList.remove("playing");
    musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    audio.pause();
  } else {
    musicBtn.classList.add("playing");
    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
  }
};

musicBtn.addEventListener("click", musicToggle);
