const loadLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLevel(data.data));
};

const displayLevel = (levels) => {
  console.log(levels);
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";
  for (const level of levels) {
    console.log(level);
    const divBtn = document.createElement("div");
    divBtn.innerHTML = `
     <button class="btn btn-outline btn-primary ">
                <i class="fa-solid fa-book-open"></i> Learn - ${level.level_no}
              </button>
    `;
    lessonsContainer.append(divBtn);
  }
};

loadLevel();
