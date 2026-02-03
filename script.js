const moodSelector = document.getElementById("moodSelector");
const moodTitle = document.getElementById("moodTitle");
const moodText = document.getElementById("moodText");
const sentimentInput = document.getElementById("sentimentInput");
const timeline = document.getElementById("timeline");

let lastKeyTime = Date.now();
let typingSpeeds = [];

const moods = {
  happy: "😊 Feeling Happy",
  sad: "😔 Feeling Sad",
  stressed: "😵‍💫 Feeling Stressed",
  focused: "🎯 Feeling Focused"
};

/* ---------- APPLY MOOD ---------- */
function applyMood(mood) {
  document.body.className = "";
  document.body.classList.add(mood);

  if (mood === "sad" || mood === "stressed") {
    document.body.classList.add("dark");
  }

  moodTitle.innerText = moods[mood];
  localStorage.setItem("mood", mood);
  saveTimeline(mood);
}

/* ---------- TIMELINE ---------- */
function saveTimeline(mood) {
  const time = new Date().toLocaleTimeString();
  const li = document.createElement("li");
  li.innerText = `${time} → ${mood}`;
  timeline.prepend(li);
}

/* ---------- MANUAL MOOD ---------- */
moodSelector.addEventListener("change", () => {
  applyMood(moodSelector.value);
});

/* ---------- TYPING SPEED DETECTION ---------- */
sentimentInput.addEventListener("keydown", () => {
  const now = Date.now();
  typingSpeeds.push(now - lastKeyTime);
  lastKeyTime = now;

  if (typingSpeeds.length > 5) {
    const avg = typingSpeeds.reduce((a,b)=>a+b)/typingSpeeds.length;

    if (avg < 150) applyMood("stressed");
    else if (avg < 300) applyMood("focused");
    else applyMood("sad");

    typingSpeeds = [];
  }
});

/* ---------- AI SENTIMENT INPUT ---------- */
sentimentInput.addEventListener("blur", () => {
  const text = sentimentInput.value.toLowerCase();

  if (text.includes("happy") || text.includes("excited")) applyMood("happy");
  else if (text.includes("tired") || text.includes("sad")) applyMood("sad");
  else if (text.includes("stress") || text.includes("pressure")) applyMood("stressed");
  else if (text.includes("focus") || text.includes("work")) applyMood("focused");
});

/* ---------- HIGHLIGHT ---------- */
moodText.addEventListener("mouseup", () => {
  const sel = window.getSelection();
  if (sel.toString()) {
    const range = sel.getRangeAt(0);
    const mark = document.createElement("mark");
    range.surroundContents(mark);
    sel.removeAllRanges();
    localStorage.setItem("notes", moodText.innerHTML);
  }
});

/* ---------- LOAD NOTES ---------- */
const savedNotes = localStorage.getItem("notes");
if (savedNotes) moodText.innerHTML = savedNotes;

/* ---------- EXPORT NOTES ---------- */
document.getElementById("exportNotes").onclick = () => {
  const blob = new Blob([moodText.innerText], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "mood-notes.txt";
  a.click();
};

/* ---------- CLEAR ---------- */
document.getElementById("clearHighlight").onclick = () => {
  moodText.innerText = "Select text to highlight and save notes.";
  localStorage.removeItem("notes");
};
