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

// const playAudioOnce = () => {
//   musicToggle();
//   document.removeEventListener("click", playAudioOnce);
// };

// document.addEventListener("DOMContentLoaded", function () {
//   document.addEventListener("click", playAudioOnce);
// });

// Alert messages fade out animation
$(document).ready(function () {
  setTimeout(function () {
    $('.alert').fadeOut('slow');
  }, 3000);
});