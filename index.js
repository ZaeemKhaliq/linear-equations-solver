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
  const equationInput = document.getElementById("equation-input");
  const matrixInput = document.getElementById("matrix-input");
  const vectorInput = document.getElementById("vector-input");
  const inputtedEquation = document.getElementById(
    "equation-input__inputted-equation-value"
  );

  if (matrixSize === 2) {
    equationInput.classList.add("equation-input--size-2x2");
    equationInput.classList.remove("equation-input--size-3x3");
    matrixInput.classList.add("equation-input__matrix-input--size-2x2");
    matrixInput.classList.remove("equation-input__matrix-input--size-3x3");
    vectorInput.classList.add("equation-input__vector-input--size-2");
    vectorInput.classList.remove("equation-input__vector-input--size-3");

    let inputs = "";
    for (let i = 1; i <= 4; i++) {
      inputs += `
      ${
        i % 2 === 1
          ? `<select name="equation-input__operator"
          class="equation-input__operator"
          onchange="handleOperatorChange(event,${Math.ceil(i / 2)},${0})"
        >
          <option value="+">+</option>
          <option value="-">-</option>
        </select>`
          : ""
      }
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
    equationInput.classList.add("equation-input--size-3x3");
    equationInput.classList.remove("equation-input--size-2x2");
    matrixInput.classList.add("equation-input__matrix-input--size-3x3");
    matrixInput.classList.remove("equation-input__matrix-input--size-2x2");
    vectorInput.classList.add("equation-input__vector-input--size-3");
    vectorInput.classList.remove("equation-input__vector-input--size-2");

    let inputs = "";
    for (let i = 1; i <= 9; i++) {
      inputs += `
      ${
        i % 3 === 1
          ? `<select name="equation-input__operator"
          class="equation-input__operator"
          onchange="handleOperatorChange(event,${Math.ceil(i / 3)},${0})"
        >
          <option value="+">+</option>
          <option value="-">-</option>
        </select>`
          : ""
      }
      <div class="equation-input__input-box-operator">
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
  equationSpan1Operator0: "+",
  equationSpan1Operator1: "+",
  equationSpan1Operator2: "+",
  equationSpan2: [],
  equationSpan2X1: [],
  equationSpan2X2: [],
  equationSpan2X3: [],
  equationSpan2V1: [],
  equationSpan2Operator0: "+",
  equationSpan2Operator1: "+",
  equationSpan2Operator2: "+",
  equationSpan3: [],
  equationSpan3X1: [],
  equationSpan3X2: [],
  equationSpan3X3: [],
  equationSpan3V1: [],
  equationSpan3Operator0: "+",
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
    equationSpan0Operator0: "+",
    equationSpan1Operator1: "+",
    equationSpan1Operator2: "+",
    equationSpan2: [],
    equationSpan2X1: [],
    equationSpan2X2: [],
    equationSpan2X3: [],
    equationSpan2V1: [],
    equationSpan2Operator0: "+",
    equationSpan2Operator1: "+",
    equationSpan2Operator2: "+",
    equationSpan3: [],
    equationSpan3X1: [],
    equationSpan3X2: [],
    equationSpan3X3: [],
    equationSpan3V1: [],
    equationSpan3Operator0: "+",
    equationSpan3Operator1: "+",
    equationSpan3Operator2: "+",
  };
};

let equation_2 = {
  row1: {
    operator0: equations.equationSpan1Operator0,
    X1: null,
    operator: equations.equationSpan1Operator1,
    X2: null,
    V1: null,
  },
  row2: {
    operator0: equations.equationSpan1Operator0,
    X1: null,
    operator: equations.equationSpan2Operator1,
    X2: null,
    V1: null,
  },
};

let equation_3 = {
  row1: {
    operator0: equations.equationSpan1Operator0,
    X1: null,
    operator1: equations.equationSpan1Operator1,
    X2: null,
    operator2: equations.equationSpan1Operator2,
    X3: null,
    V1: null,
  },
  row2: {
    operator0: equations.equationSpan2Operator0,
    X1: null,
    operator1: equations.equationSpan2Operator1,
    X2: null,
    operator2: equations.equationSpan2Operator2,
    X3: null,
    V1: null,
  },
  row3: {
    operator0: equations.equationSpan3Operator0,
    X1: null,
    operator1: equations.equationSpan3Operator1,
    X2: null,
    operator2: equations.equationSpan3Operator2,
    X3: null,
    V1: null,
  },
};

const setEquation = (value, rowNum, variableNum, variable) => {
  if (matrixSize === 2) {
    equation_2[`row${rowNum}`][`${variable}${variableNum}`] = Number(value);
  }
  if (matrixSize === 3) {
    equation_3[`row${rowNum}`][`${variable}${variableNum}`] = Number(value);
  }
};

const setEquationOperator = (rowNum, operatorNum, operator) => {
  if (matrixSize === 2) {
    equation_2[`row${rowNum}`][
      `operator${operatorNum == 0 ? operatorNum : ""}`
    ] = operator;
  }
  if (matrixSize === 3) {
    equation_3[`row${rowNum}`][`operator${operatorNum}`] = operator;
  }
};

const handleMatrixInputBox = (event, index) => {
  for (let i = 1; i <= Math.pow(matrixSize, matrixSize); i++) {
    if (i === index) {
      const spanNumber = Math.ceil(index / matrixSize);
      const variableNumber =
        index % matrixSize === 0 ? matrixSize : index % matrixSize;

      if (!event.target.value.length) {
        equations[`equationSpan${spanNumber}X${variableNumber}`] = [];
      } else {
        const str = `${event.target.value}x<sub>${variableNumber}</sub>`;

        for (let j = 0; j < str.length; j++) {
          equations[`equationSpan${spanNumber}X${variableNumber}`][
            j
          ] = `${str[j]}`;
        }

        equations[`equationSpan${spanNumber}X${variableNumber}`] = equations[
          `equationSpan${spanNumber}X${variableNumber}`
        ].slice(0, str.length);
      }

      setEquation(event.target.value, spanNumber, variableNumber, "X");
      setEquationSpan(spanNumber);
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

      setEquation(event.target.value, index, 1, "V");
      setEquationSpan(index);
    } else {
      continue;
    }
  }
};

const handleOperatorChange = (event, spanNumber, operatorNumber) => {
  equations[`equationSpan${spanNumber}Operator${operatorNumber}`] =
    event.target.value;

  setEquationOperator(spanNumber, operatorNumber, event.target.value);
  setEquationSpan(spanNumber);
};

const setEquationSpan = (spanNumber) => {
  const inputtedEquation = document.getElementById(
    "equation-input__inputted-equation-value"
  );
  const spans = inputtedEquation.children;

  if (matrixSize === 2) {
    equations[`equationSpan${spanNumber}`] = [
      equations[`equationSpan${spanNumber}X1`].length > 0
        ? equations[`equationSpan${spanNumber}Operator0`] === "-"
          ? equations[`equationSpan${spanNumber}Operator0`]
          : ""
        : "",
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
      equations[`equationSpan${spanNumber}X1`].length > 0
        ? equations[`equationSpan${spanNumber}Operator0`] === "-"
          ? equations[`equationSpan${spanNumber}Operator0`]
          : ""
        : "",
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

let numberOfIterations;

const handleNumberOfIteration = (event) => {
  numberOfIterations = +event.target.value;
  numberOfIterations =
    numberOfIterations > 50
      ? 50
      : numberOfIterations === 0
      ? ""
      : numberOfIterations < 2
      ? 2
      : numberOfIterations;

  const inputBox = document.getElementById("num-of-iterations");
  inputBox.value = numberOfIterations;
};

const handleSubmit = () => {
  if (!numberOfIterations) {
    return alert("Please enter number of iterations!");
  }

  if (matrixSize === 2) {
    for (const key in equation_2) {
      if (!equation_2[key].X1 || !equation_2[key].X2 || !equation_2[key].V1) {
        return alert("Please enter full equations!");
      }
    }

    const isDiagonallyDominant =
      checkDiagonalDominance(1, {
        X1: equation_2.row1.X1,
        X2: equation_2.row1.X2,
      }) &&
      checkDiagonalDominance(2, {
        X1: equation_2.row2.X1,
        X2: equation_2.row2.X2,
      });

    if (!isDiagonallyDominant) {
      return alert("The equations are not diagonally dominant!");
    }

    let x1, x2;

    const calculateValues = (iterationNum) => {
      x1 =
        (equation_2.row1.V1 -
          (equation_2.row1.operator === "-" ? -1 : +1) *
            equation_2.row1.X2 *
            (iterationNum === 0 ? iterationNum : x2)) /
        ((equation_2.row1.operator0 === "-" ? -1 : +1) * equation_2.row1.X1);
      x2 =
        (equation_2.row2.V1 -
          (equation_2.row2.operator === "-" ? -1 : +1) *
            equation_2.row2.X1 *
            x1) /
        ((equation_2.row2.operator0 === "-" ? -1 : +1) * equation_2.row2.X2);

      return [x1, x2];
    };

    const formResultContainer = document.getElementById(
      "form__result-container"
    );
    const formResult = document.getElementById("form__result");

    formResult.innerHTML = `
    <div class="form__result-row form__result-row--2x2">
      <h4>Iteration no</h4>
      <h4>x1</h4>
      <h4>x2</h4>
    </div>
    `;

    for (let i = 0; i < numberOfIterations; i++) {
      const result = calculateValues(i);

      formResult.innerHTML += `
      <div class="form__result-row form__result-row--2x2">
        <p>${i}</p>
        <p>${result[0]}</p>
        <p>${result[1]}</p>
      </div>
      `;
    }

    formResultContainer.style.display = "flex";
  }

  if (matrixSize === 3) {
    for (const key in equation_3) {
      if (
        !equation_3[key].X1 ||
        !equation_3[key].X2 ||
        !equation_3[key].X3 ||
        !equation_3[key].V1
      ) {
        return alert("Please enter full equations!");
      }
    }

    const isDiagonallyDominant =
      checkDiagonalDominance(1, {
        X1: equation_3.row1.X1,
        X2: equation_3.row1.X2,
        X3: equation_3.row1.X3,
      }) &&
      checkDiagonalDominance(2, {
        X1: equation_3.row2.X1,
        X2: equation_3.row2.X2,
        X3: equation_3.row2.X3,
      }) &&
      checkDiagonalDominance(3, {
        X1: equation_3.row3.X1,
        X2: equation_3.row3.X2,
        X3: equation_3.row3.X3,
      });

    if (!isDiagonallyDominant) {
      return alert("The equations are not diagonally dominant!");
    }

    let x1, x2, x3;

    const calculateValues = (iterationNum) => {
      x1 =
        (equation_3.row1.V1 -
          (equation_3.row1.operator1 === "-" ? -1 : +1) *
            equation_3.row1.X2 *
            (iterationNum === 0 ? iterationNum : x2) -
          (equation_3.row1.operator2 === "-" ? -1 : +1) *
            (equation_3.row1.X3 * (iterationNum === 0 ? iterationNum : x3))) /
        ((equation_3.row1.operator0 === "-" ? -1 : +1) * equation_3.row1.X1);

      x2 =
        (equation_3.row2.V1 -
          (equation_3.row2.operator0 === "-" ? -1 : +1) *
            equation_3.row2.X1 *
            x1 -
          (equation_3.row2.operator2 === "-" ? -1 : +1) *
            (equation_3.row2.X3 * (iterationNum === 0 ? iterationNum : x3))) /
        ((equation_3.row2.operator1 === "-" ? -1 : +1) * equation_3.row2.X2);

      x3 =
        (equation_3.row3.V1 -
          (equation_3.row3.operator0 === "-" ? -1 : +1) *
            equation_3.row3.X1 *
            x1 -
          (equation_3.row3.operator1 === "-" ? -1 : +1) *
            (equation_3.row3.X2 * x2)) /
        ((equation_3.row3.operator2 === "-" ? -1 : +1) * equation_3.row3.X3);

      return [x1, x2, x3];
    };

    const formResultContainer = document.getElementById(
      "form__result-container"
    );
    const formResult = document.getElementById("form__result");

    formResult.innerHTML = `
    <div class="form__result-row form__result-row--3x3">
      <h4>Iteration no</h4>
      <h4>x1</h4>
      <h4>x2</h4>
      <h4>x3</h4>
    </div>
    `;

    for (let i = 0; i < numberOfIterations; i++) {
      const result = calculateValues(i);

      formResult.innerHTML += `
      <div class="form__result-row form__result-row--3x3">
        <p>${i}</p>
        <p>${result[0]}</p>
        <p>${result[1]}</p>
        <p>${result[2]}</p>
      </div>
      `;
    }

    formResultContainer.style.display = "flex";
  }
};

const checkDiagonalDominance = (rowNum, values) => {
  if (matrixSize === 2) {
    if (rowNum === 1) {
      return values.X1 >= values.X2;
    }
    if (rowNum === 2) {
      return values.X2 >= values.X1;
    }
  }
  if (matrixSize === 3) {
    if (rowNum === 1) {
      return values.X1 >= values.X2 + values.X3;
    }
    if (rowNum === 2) {
      return values.X2 >= values.X1 + values.X3;
    }
    if (rowNum === 3) {
      return values.X3 >= values.X1 + values.X2;
    }
  }
};
