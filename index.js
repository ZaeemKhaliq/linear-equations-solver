let matrixSize = 2;

document.addEventListener("DOMContentLoaded", () => {
  renderMatrixInputs();
});

const handleSizeChange = (event) => {
  matrixSize = Number(event.target.value);
  renderMatrixInputs();
  clearEquationSpans();
};

const renderMatrixInputs = () => {
  const matrixInput = document.getElementById("matrix-input");
  const vectorInput = document.getElementById("vector-input");
  const inputtedEquation = document.getElementById(
    "equation-input__inputted-equation-value"
  );

  if (matrixSize === 2) {
    matrixInput.classList.add("equation-input__matrix-input--size-2x2");
    matrixInput.classList.remove("equation-input__matrix-input--size-3x3");
    vectorInput.classList.add("equation-input__vector-input--size-2");
    vectorInput.classList.remove("equation-input__vector-input--size-2");

    let inputs = "";
    for (let i = 1; i <= 4; i++) {
      inputs += `
      <div>
      <input type="number" class="equation-input__matrix-input__box" onchange="handleMatrixInputBox(event,${i})" />
      <span>x<sub>${i % 2 === 0 ? 2 : i % 2}</sub></span>
      </div>
        `;
    }

    matrixInput.innerHTML = inputs;

    inputs = "";
    for (let i = 1; i <= 2; i++) {
      inputs += `<input type="number" class="equation-input__vector-input__box" />`;
    }
    vectorInput.innerHTML = inputs;

    inputtedEquation.innerHTML = `
    <span></span>
    <span></span>
    `;
  }
  if (matrixSize === 3) {
    matrixInput.classList.add("equation-input__matrix-input--size-3x3");
    matrixInput.classList.remove("equation-input__matrix-input--size-2x2");
    vectorInput.classList.add("equation-input__vector-input--size-3");
    vectorInput.classList.remove("equation-input__vector-input--size-3");

    let inputs = "";
    for (let i = 1; i <= 9; i++) {
      inputs += `
      <div>
      <input type="number" class="equation-input__matrix-input__box" />
      <span>x<sub>${i % 3 === 0 ? 3 : i % 3}</sub></span>
      </div>
        `;
    }

    matrixInput.innerHTML = inputs;

    inputs = "";
    for (let i = 1; i <= 3; i++) {
      inputs += `<input type="number" class="equation-input__vector-input__box" />`;
    }
    vectorInput.innerHTML = inputs;

    inputtedEquation.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
    `;
  }
};

let equationSpan1 = [];
let equationSpan1X1 = [];
let equationSpan1X2 = [];
let equationSpan1X3 = [];
let equationSpan2 = "";
let equationSpan2X1 = [];
let equationSpan2X2 = [];
let equationSpan2X3 = [];
let equationSpan3 = "";
let equationSpan3X1 = [];
let equationSpan3X2 = [];
let equationSpan3X3 = [];

const clearEquationSpans = () => {
  equationSpan1 = [];
  equationSpan1X1 = [];
  equationSpan1X2 = [];
  equationSpan1X3 = [];
  equationSpan2 = "";
  equationSpan2X1 = [];
  equationSpan2X2 = [];
  equationSpan2X3 = [];
  equationSpan3 = "";
  equationSpan3X1 = [];
  equationSpan3X2 = [];
  equationSpan3X3 = [];
};

const handleMatrixInputBox = (event, index) => {
  const inputtedEquation = document.getElementById(
    "equation-input__inputted-equation-value"
  );
  const spans = inputtedEquation.children;

  if (matrixSize === 2) {
    if (index === 1) {
      const str = `${event.target.value}x<sub>1</sub>`;
      for (let i = 0; i < str.length; i++) {
        equationSpan1X1[i] = `${str[i]}`;
      }

      equationSpan1X1 = equationSpan1X1.slice(0, str.length);

      equationSpan1 = [...equationSpan1X1, ...equationSpan1X2];

      spans[0].innerHTML = equationSpan1.join("");
    }
    if (index === 2) {
      const str = `${event.target.value}x<sub>2</sub>`;
      const strLength = str.length;

      for (let i = 0; i < strLength; i++) {
        equationSpan1X2[i] = `${str[i]}`;
      }

      equationSpan1X2 = equationSpan1X2.slice(0, strLength);

      equationSpan1 = [...equationSpan1X1, ...equationSpan1X2];

      spans[0].innerHTML = equationSpan1.join("");
    }

    if (index === 3) {
      const str = `${event.target.value}x<sub>1</sub>`;
      for (let i = 0; i < str.length; i++) {
        equationSpan2X1[i] = `${str[i]}`;
      }

      equationSpan2X1 = equationSpan2X1.slice(0, str.length);

      equationSpan2 = [...equationSpan2X1, ...equationSpan2X2];

      spans[1].innerHTML = equationSpan2.join("");
    }
    if (index === 4) {
      const str = `${event.target.value}x<sub>2</sub>`;
      const strLength = str.length;

      for (let i = 0; i < strLength; i++) {
        equationSpan2X2[i] = `${str[i]}`;
      }

      equationSpan2X2 = equationSpan2X2.slice(0, strLength);

      equationSpan2 = [...equationSpan2X1, ...equationSpan2X2];

      spans[1].innerHTML = equationSpan2.join("");
    }
  }
};
