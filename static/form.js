const emojiPickerButton = document.getElementById("emojiPickerButton");
const emojiPickerInput = document.getElementById("emoji");
const pickerModel = document.getElementById("emoji-picker");

const pickerOptions = { onEmojiSelect: selectEmoji };
const picker = new EmojiMart.Picker(pickerOptions);

pickerModel.appendChild(picker);

pickerModel.style.display = "none";

emojiPickerButton.addEventListener("click", () => {
  console.log("clicked");
  const rect = emojiPickerButton.getBoundingClientRect();
  pickerModel.style.display = pickerModel.style.display === "none" ? "flex" : "none";
  pickerModel.style.position = "absolute";
  pickerModel.style.top = rect.bottom + "px";
  pickerModel.style.left = rect.left + emojiPickerButton.offsetWidth +"px";
});

function selectEmoji(emoji) {
  console.log(emoji);
  emojiPickerInput.value += emoji.native;
}