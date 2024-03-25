const audio = new Audio("/static/audio/happyclick.mp3");
const audio2 = new Audio("/static/audio/announcement.mp3");
const audio3 = new Audio("/static/audio/laugh.mp3");

const emojiPickerButton = document.getElementById("emojiPickerButton");
const emojiPickerInput = document.getElementById("id_emoji");
const pickerModel = document.getElementById("emoji-picker");
const tags = document.getElementById("id_tags");
const overlay = document.getElementById("overlay");
const submit = document.getElementById("submit");
const heading = document.getElementById("heading");

const pickerOptions = { onEmojiSelect: selectEmoji };
const picker = new EmojiMart.Picker(pickerOptions);

pickerModel.appendChild(picker);

pickerModel.style.display = "none";

overlay.addEventListener("click", () => {
  pickerModel.style.display = "none";
  overlay.style.display = "none";
});

emojiPickerButton.addEventListener("click", () => {
  pickerModel.style.display = "flex";
  overlay.style.display = "block";
});

function selectEmoji(emoji) {
  tags.value = emoji.keywords.join(",");
  emojiPickerInput.value = emoji.native;

  pickerModel.style.display = "none";
  overlay.style.display = "none";
}

function clearTextarea() {
  var textarea = document.getElementById("id_title");
  if (textarea.value == "To make myself happy I like to...") {
    textarea.value = "";
  }
}

submit.addEventListener("click", (e) => {
  heading.innerText = "Thank you for sharing!";
  audio.play();
  audio2.play();
  for (let i = 0; i < 5; i++) {
    setTimeout(() => explode(e, options), i * 1000);
    setTimeout(() => audio3.play(), 4000);
  }
});

// STAR ANIMATION
const options = {
  radius: 500, // explosion size
  variation: 30, // randomized variation on each point's angle
  points: 25, // number of points in explosion
  character: "⭐", // the character in each particle
};

const inputs = document.querySelectorAll("input, select");
const main = document.querySelector("main");
let clicked = false;

// ==============
// Functions

function explode(e, options) {
  const container = document.createElement("div");
  container.classList.add("particles-container");
  container.style.left = e.clientX + "px";
  container.style.top = e.clientY + "px";
  document.body.appendChild(container);

  for (let i = 0; i < options.points; i++) {
    const referenceAngle = (360 / options.points) * (i + 1);
    const maxAngle = referenceAngle + parseFloat(options.variation);
    const minAngle = referenceAngle - parseFloat(options.variation);

    const angle = randomAngleBetween(minAngle, maxAngle);

    const x = Math.cos(angle) * options.radius;
    const y = Math.sin(angle) * options.radius;
    const popup = document.createElement("div");
    popup.textContent = `${options.character}`;
    popup.classList.add("particle");
    popup.style.top = y + "px";
    popup.style.left = x + "px";
    container.appendChild(popup);

    if (i == 0) {
      popup.addEventListener("animationend", () => {
        document.body.removeChild(container);
      });
    }
  }
}

function randomAngleBetween(minAngle, maxAngle) {
  return (
    ((Math.random() * (maxAngle - minAngle) + minAngle) / 180) * Math.PI -
    Math.PI / 2
  );
}

// ==========================================
