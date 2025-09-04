const loadLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((cardData) => displayLevelWord(cardData.data));
};
const displayLevelWord = (levelWords) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = " ";
  levelWords.forEach((levelWord) => {
    const cardWord = document.createElement("div");
    cardWord.innerHTML = `
    <div class="">
    <div class="bg-white p-4 m-2 text-center rounded-lg shadow-lg">
          <h1 class="mt-4">${levelWord.word}</h1>
          <p class="mt-4"><span>Meaning </span>/ <span>Pronuunciation</span></p>
          <p class="font-bangla mt-2">
            <span>"${levelWord.meaning} </span>/ <span> ${levelWord.pronunciation}"</span>
          </p>
          <div class="mt-4 flex justify-between">
            <button class="bg-[#1A91FF20] hover:bg-[#1A91FF80] p-2 rounded-sm">
              <i class="fa-solid fa-circle-info ]"></i>
            </button>
            <button class="bg-[#1A91FF20] hover:bg-[#1A91FF80] p-2 rounded-sm">
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
     <button  onclick="loadLevelWord(${level.level_no})"  class="btn btn-outline btn-primary ">
                <i class="fa-solid fa-book-open"></i> Learn - ${level.level_no}

              </button>

    `;

    lessonsContainer.append(divBtn);
  }
};

loadLevel();
