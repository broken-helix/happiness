// Alert messages fade out animation
$(document).ready(function () {
  setTimeout(function () {
    $(".alert").fadeOut("slow");
  }, 3000);
});

// Function to get a random happiness message
function getRandomHappinessMessage() {
  const randomIndex = Math.floor(Math.random() * audioArray.length);
  const soundEffect = audioArray[randomIndex];
  soundEffect.play();
  const messages = [
    "Spread joy wherever you go!",
    "Happiness is a choice. Choose it!",
    "The happiest people don't have the best of everything, they make the best of everything.",
    "Every day may not be good, but there's something good in every day.",
    "Count your age by friends, not years. Count your life by smiles, not tears.",
    // Add more happiness messages as needed
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Function to update the footer date and message
function updateFooter() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  document.getElementById("footer-date").textContent =
    "Today is " + currentDate;
  document.getElementById("footer-message").textContent =
    getRandomHappinessMessage();
}

// Call updateFooter function when the page loads
window.onload = updateFooter;
