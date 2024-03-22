const emojiPickerButton = document.getElementById("emojiPickerButton");
const emojiPickerInput = document.getElementById("emoji");

console.log("load form.js");

const pickerOptions = { onEmojiSelect: selectEmoji };
const picker = new EmojiMart.Picker(pickerOptions);

const pickerModel = document.getElementById("emoji-picker").appendChild(picker);

pickerModel.style.display = "none";

emojiPickerButton.addEventListener("click", () => {
  console.log("clicked");
  pickerModel.style.display =
    pickerModel.style.display === "none" ? "flex" : "none";
});

function selectEmoji(emoji) {
  console.log(emoji);

  emojiPickerInput.value += emoji.native;
}
