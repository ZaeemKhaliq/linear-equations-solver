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
    vectorInput.classList.remove("equation-input__vector-input--size-3");

    let inputs = "";
    for (let i = 1; i <= 4; i++) {
      inputs += `
      <div>
        <input type="number" 
            class="equation-input__matrix-input__box" 
            onchange="handleMatrixInputBox(event,${i})" 
        />
        <span>x<sub>${i % 2 === 0 ? 2 : i % 2}</sub></span>
      </div>
      ${
        i % 2 === 1
          ? `
      <select name="equation-input__operator" 
        class="equation-input__operator"
        onchange="handleOperatorChange(event,${Math.ceil(i / 2)},${i % 2})"
      >
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      `
          : ""
      }`;
    }

    matrixInput.innerHTML = inputs;

    inputs = "";
    for (let i = 1; i <= 2; i++) {
      inputs += `
        <input type="number" 
            class="equation-input__vector-input__box" 
            onchange="handleVectorInputBox(event,${i})" 
        />`;
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
    vectorInput.classList.remove("equation-input__vector-input--size-2");

    let inputs = "";
    for (let i = 1; i <= 9; i++) {
      inputs += `
      <div>
        <input type="number" 
            class="equation-input__matrix-input__box"
            onchange="handleMatrixInputBox(event,${i})" 
        />
        <span>x<sub>${i % 3 === 0 ? 3 : i % 3}</sub></span>
      </div>
      ${
        !(i % 3 === 0)
          ? `
      <select name="equation-input__operator" 
      class="equation-input__operator"
      onchange="handleOperatorChange(event,${Math.ceil(i / 3)},${i % 3})"
      >
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      `
          : ""
      }
        `;
    }

    matrixInput.innerHTML = inputs;

    inputs = "";
    for (let i = 1; i <= 3; i++) {
      inputs += `<input type="number" 
      class="equation-input__vector-input__box"
      onchange="handleVectorInputBox(event,${i})" 
      />`;
    }
    vectorInput.innerHTML = inputs;

    inputtedEquation.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
    `;
  }
};

let equations = {
  equationSpan1: [],
  equationSpan1X1: [],
  equationSpan1X2: [],
  equationSpan1X3: [],
  equationSpan1V1: [],
  equationSpan1Operator1: "+",
  equationSpan1Operator2: "+",
  equationSpan2: [],
  equationSpan2X1: [],
  equationSpan2X2: [],
  equationSpan2X3: [],
  equationSpan2V1: [],
  equationSpan2Operator1: "+",
  equationSpan2Operator2: "+",
  equationSpan3: [],
  equationSpan3X1: [],
  equationSpan3X2: [],
  equationSpan3X3: [],
  equationSpan3V1: [],
  equationSpan3Operator1: "+",
  equationSpan3Operator2: "+",
};

const clearEquationSpans = () => {
  equations = {
    equationSpan1: [],
    equationSpan1X1: [],
    equationSpan1X2: [],
    equationSpan1X3: [],
    equationSpan1V1: [],
    equationSpan1Operator1: "+",
    equationSpan1Operator2: "+",
    equationSpan2: [],
    equationSpan2X1: [],
    equationSpan2X2: [],
    equationSpan2X3: [],
    equationSpan2V1: [],
    equationSpan2Operator1: "+",
    equationSpan2Operator2: "+",
    equationSpan3: [],
    equationSpan3X1: [],
    equationSpan3X2: [],
    equationSpan3X3: [],
    equationSpan3V1: [],
    equationSpan3Operator1: "+",
    equationSpan3Operator2: "+",
  };
};

const handleMatrixInputBox = (event, index) => {
  for (let i = 1; i <= (matrixSize === 2 ? 4 : 9); i++) {
    if (i === index) {
      if (!event.target.value.length) {
        equations[
          `equationSpan${Math.ceil(index / matrixSize)}X${
            index % matrixSize === 0 ? matrixSize : index % matrixSize
          }`
        ] = [];
      } else {
        const str = `${event.target.value}x<sub>${
          index % matrixSize === 0 ? matrixSize : index % matrixSize
        }</sub>`;

        for (let j = 0; j < str.length; j++) {
          equations[
            `equationSpan${Math.ceil(index / matrixSize)}X${
              index % matrixSize === 0 ? matrixSize : index % matrixSize
            }`
          ][j] = `${str[j]}`;
        }

        equations[
          `equationSpan${Math.ceil(index / matrixSize)}X${
            index % matrixSize === 0 ? matrixSize : index % matrixSize
          }`
        ] = equations[
          `equationSpan${Math.ceil(index / matrixSize)}X${
            index % matrixSize === 0 ? matrixSize : index % matrixSize
          }`
        ].slice(0, str.length);
      }

      setEquationSpan(Math.ceil(index / matrixSize));
    } else {
      continue;
    }
  }
};

const handleVectorInputBox = (event, index) => {
  for (let i = 1; i <= matrixSize; i++) {
    if (i === index) {
      if (!event.target.value.length) {
        equations[`equationSpan${index}V1`] = [];
      } else {
        const str = `${event.target.value}`;
        for (let j = 0; j < str.length; j++) {
          equations[`equationSpan${index}V1`][j] = `${str[j]}`;
        }

        equations[`equationSpan${index}V1`] = equations[
          `equationSpan${index}V1`
        ].slice(0, str.length);
      }
      setEquationSpan(index);
    } else {
      continue;
    }
  }
};

const handleOperatorChange = (event, spanNumber, operatorNumber) => {
  equations[`equationSpan${spanNumber}Operator${operatorNumber}`] =
    event.target.value;
  setEquationSpan(spanNumber);
};

const setEquationSpan = (spanNumber) => {
  const inputtedEquation = document.getElementById(
    "equation-input__inputted-equation-value"
  );
  const spans = inputtedEquation.children;

  if (matrixSize === 2) {
    equations[`equationSpan${spanNumber}`] = [
      ...equations[`equationSpan${spanNumber}X1`],
      equations[`equationSpan${spanNumber}X1`].length > 0 &&
      equations[`equationSpan${spanNumber}X2`].length > 0
        ? equations[`equationSpan${spanNumber}Operator1`]
        : "",
      ...equations[`equationSpan${spanNumber}X2`],
      equations[`equationSpan${spanNumber}V1`].length ? "=" : "",
      ...equations[`equationSpan${spanNumber}V1`],
    ];

    spans[spanNumber - 1].innerHTML =
      equations[`equationSpan${spanNumber}`].join("");
  }
  if (matrixSize === 3) {
    equations[`equationSpan${spanNumber}`] = [
      ...equations[`equationSpan${spanNumber}X1`],
      equations[`equationSpan${spanNumber}X1`].length > 0 &&
      equations[`equationSpan${spanNumber}X2`].length > 0
        ? equations[`equationSpan${spanNumber}Operator1`]
        : "",
      ...equations[`equationSpan${spanNumber}X2`],
      (equations[`equationSpan${spanNumber}X2`].length > 0 &&
        equations[`equationSpan${spanNumber}X3`].length > 0) ||
      (equations[`equationSpan${spanNumber}X1`].length > 0 &&
        equations[`equationSpan${spanNumber}X3`].length > 0)
        ? equations[`equationSpan${spanNumber}Operator2`]
        : "",
      ...equations[`equationSpan${spanNumber}X3`],
      equations[`equationSpan${spanNumber}V1`].length ? "=" : "",
      ...equations[`equationSpan${spanNumber}V1`],
    ];

    spans[spanNumber - 1].innerHTML =
      equations[`equationSpan${spanNumber}`].join("");
  }
};
