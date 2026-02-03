const moodSelector = document.getElementById("moodSelector");
const body = document.body;
const moodTitle = document.getElementById("moodTitle");
const moodText = document.getElementById("moodText");

moodSelector.addEventListener("change", () => {
  body.className = ""; // reset

  const mood = moodSelector.value;

  if (mood === "happy") {
    body.classList.add("happy");
    moodTitle.innerText = "😊 Feeling Happy";
    moodText.innerText = "Bright colors, fast animations, positive vibes!";
  }

  if (mood === "sad") {
    body.classList.add("sad");
    moodTitle.innerText = "😔 Feeling Sad";
    moodText.innerText = "Soft colors and calm UI to comfort you.";
  }

  if (mood === "stressed") {
    body.classList.add("stressed");
    moodTitle.innerText = "😵‍💫 Feeling Stressed";
    moodText.innerText = "Minimal UI to reduce mental overload.";
  }

  if (mood === "focused") {
    body.classList.add("focused");
    moodTitle.innerText = "🎯 Feeling Focused";
    moodText.innerText = "Sharp contrast and clarity for deep work.";
  }
});
