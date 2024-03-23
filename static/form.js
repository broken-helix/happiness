const emojiPickerButton = document.getElementById("emojiPickerButton");
const emojiPickerInput = document.getElementById("emoji");

console.log("load form.js");

const pickerOptions = { onEmojiSelect: selectEmoji };
const picker = new EmojiMart.Picker(pickerOptions);

const pickerModel = document.getElementById("emoji-picker").appendChild(picker);
const tagInput = document.getElementById("id_tags");

pickerModel.style.display = "none";

emojiPickerButton.addEventListener("click", () => {
  console.log("clicked");
  pickerModel.style.display =
    pickerModel.style.display === "none" ? "flex" : "none";
});

function selectEmoji(emoji) {
  console.log(emoji);
  tagInput.value += emoji.keywords;

  emojiPickerInput.value += emoji.native;
}
