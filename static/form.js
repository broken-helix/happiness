const emojiPickerButton = document.getElementById("emojiPickerButton");
const emojiPickerInput = document.getElementById("id_emoji");
const pickerModel = document.getElementById("emoji-picker");
const tags = document.getElementById("id_tags");
const overlay = document.getElementById("overlay");

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
