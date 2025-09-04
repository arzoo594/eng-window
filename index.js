const loadLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const removeActive = () => {
  const levelBtn = document.querySelectorAll(".lesson-btn");
  levelBtn.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((cardData) => {
      removeActive();
      const levelBtn = document.getElementById(`level-btn-${id}`);
      levelBtn.classList.add("active");
      displayLevelWord(cardData.data);
    });
};
const displayLevelWord = (levelWords) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (levelWords.length == 0) {
    cardContainer.innerHTML = `
  <div class="text-center bg-sky-100 col-span-full rounded-xl py-8 space-y6 font-bangla">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <p class="font-bangla mt-4 text-[#79716B]">
        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
      </p>
      <p class="font-bangla mt-4 text-3xl font-semibold">
        নেক্সট Lesson এ যান
      </p>
    
  </div>

`;
    return;
  }
  levelWords.forEach((levelWord) => {
    const cardWord = document.createElement("div");
    cardWord.innerHTML = `
    <div class="">
    <div class="bg-white p-4 m-2 text-center rounded-lg shadow-lg">
          <h1 class="mt-4">${
            levelWord.word ? levelWord.word : "not available"
          }</h1>
          <p class="mt-4"><span>Meaning </span>/ <span>Pronuunciation</span></p>
          <p class="font-bangla mt-2">
            <span>"${
              levelWord.meaning ? levelWord.meaning : "not available"
            } </span>/ <span> ${
      levelWord.pronunciation ? levelWord.pronunciation : "not available"
    }"</span>
          </p>
          <div class="mt-4 flex justify-between">
            <button class="bg-[#1A91FF20] hover:bg-[#1A91FF80] p-2 rounded-sm">
              <i class="fa-solid fa-circle-info ]"></i>
            </button>
            <button onclick="pronounceWord('${
              levelWord.word
            }')" class="bg-[#1A91FF20] hover:bg-[#1A91FF80] p-2 rounded-sm">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
        </div>

    `;
    cardContainer.append(cardWord);
  });
};

const displayLevel = (levels) => {
  console.log(levels);
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  for (const level of levels) {
    console.log(level);
    const divBtn = document.createElement("div");
    divBtn.innerHTML = `
     <button id="level-btn-${level.level_no}"
       onclick="loadLevelWord(${level.level_no})"  class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Learn - ${level.level_no}

              </button>

    `;

    lessonsContainer.append(divBtn);
  }
};

loadLevel();
