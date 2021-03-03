//body flexbox
const $ = (x) => document.querySelector(x);
const body = $("body");
body.style.height = "100vh";
body.style.padding = "4rem";
body.style.display = "flex";
body.style["justify-content"] = "center";
body.style["align-items"] = "center";
//chart grid
const gridDiv = document.createElement("div");
gridDiv.classList.add("gridChart");
body.appendChild(gridDiv);
gridDiv.style.padding = "0.5rem";
gridDiv.style.display = "grid";
gridDiv.style.height = "500px";
gridDiv.style.width = "auto";
gridDiv.style["grid-template-rows"] = "repeat(12, 1fr)";
gridDiv.style["grid-template-columns"] = "200px 150px 100px 200px 200px";
gridDiv.style["justify-content"] = "center";
gridDiv.style["align-content"] = "center";
gridDiv.style.gap = "5px";
// creating grid
function intializeGrids(obj) {
  let worldrow = 12;
  for (let row = 0; row < worldrow; row++) {
    let worldcol = 5;
    let matrix = [];
    matrix[row] = [];
    if (row == 0) {
      const gridHeader = document.createElement("div");
      gridHeader.style["grid-area"] = "1/1/2/6";
      gridHeader.classList.add("table-box");
      gridHeader.classList.add("header");
      gridHeader.innerText = "star wars";
      gridDiv.appendChild(gridHeader);
    } else {
      for (let col = 0; col < worldcol; col++) {
        matrix[row][col] = document.createElement("div");
        matrix[row][col].style["grid-area"] = `${row + 1} / ${col + 1} / ${
          row + 2
        } / ${col + 1}`;
        matrix[row][col].classList.add("table-box");
        if (row == 1) {
          if (col == 0) {
            matrix[row][col].innerText = "name";
          }
          if (col == 1) {
            matrix[row][col].innerText = "hair";
          }
          if (col == 2) {
            matrix[row][col].innerText = "height";
          }
          if (col == 3) {
            matrix[row][col].innerText = "planet name";
          }
          if (col == 4) {
            matrix[row][col].innerText = "planet population";
          }
        } else {
          if (col == 0) {
            matrix[row][col].innerText = obj[row - 2].name;
          }
          if (col == 1) {
            matrix[row][col].innerText = obj[row - 2].hair_color;
          }
          if (col == 2) {
            matrix[row][col].innerText = obj[row - 2].height;
          }
          if (col == 3) {
            matrix[row][col].innerText = obj[row - 2].planet.name;
          }
          if (col == 4) {
            matrix[row][col].innerText = obj[row - 2].planet.population;
          }
        }

        gridDiv.appendChild(matrix[row][col]);
      }
    }
  }
}

//inject inner html from objects and add classses
// collecting data into objects
async function starWars() {
  const starWarsData = [];
  for (let i = 1; i < 11; i++) {
    const dataObj = {};
    const personPromise = await fetch(`https://swapi.dev/api/people/${i}/`);
    const personData = await personPromise.json();
    planetPromise = await fetch(personData.homeworld);
    const planetData = await planetPromise.json();
    dataObj.name = personData.name;
    dataObj.hair_color = personData.hair_color;
    dataObj.height = personData.height;
    dataObj.planet = {
      name: planetData.name,
      population: planetData.population,
    };
    starWarsData.push(dataObj);
  }
  return starWarsData;
}
const starWarsObjects = starWars();

const injectDataToGrid = async () => {
  const tableData = await starWarsObjects;
  intializeGrids(tableData);
};

injectDataToGrid();
