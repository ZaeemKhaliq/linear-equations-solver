let matrixSize = 2;
let equations = {};

let equationsTypes = {
  equation_2: {},
  equation_3: {},
  equation_4: {},
  equation_5: {},
  equation_6: {},
  equation_7: {},
  equation_8: {},
  equation_9: {},
  equation_10: {},
};

document.addEventListener("DOMContentLoaded", () => {
  renderMatrixInputs();
  setEquationsObject();
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

  equationInput.className = `equation-input`;
  matrixInput.className = `equation-input__matrix-input equation-input__matrix-input--size-${matrixSize}x${matrixSize}`;
  vectorInput.className = `equation-input__vector-input equation-input__vector-input--size-${matrixSize}`;

  let inputs = "";
  for (let i = 1; i <= Math.pow(matrixSize, 2); i++) {
    inputs += `
    ${
      i % matrixSize === 1
        ? `<select name="equation-input__operator"
       class="equation-input__operator"
       onchange="handleOperatorChange(event,${Math.ceil(i / matrixSize)},${0})"
     >
      <option value="+">+</option>
      <option value="-">-</option>
     </select>
    `
        : ""
    }
      <div class="equation-input__matrix-equation">
        <input type="number" 
        class="equation-input__matrix-input__box" 
        onchange="handleMatrixInputBox(event,${i})" 
        />
        <span>x<sub>${
          i % matrixSize === 0 ? matrixSize : i % matrixSize
        }</sub></span>
      </div>

      ${
        !(i % matrixSize === 0)
          ? `
        <select name="equation-input__operator" 
          class="equation-input__operator"
          onchange="handleOperatorChange(event,${Math.ceil(i / matrixSize)},${
              i % matrixSize
            })"
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
  for (let i = 1; i <= matrixSize; i++) {
    inputs += `
        <input type="number" 
            class="equation-input__vector-input__box" 
            onchange="handleVectorInputBox(event,${i})" 
        />`;
  }

  vectorInput.innerHTML = inputs;

  for (let i = 1; i <= matrixSize; i++) {
    inputtedEquation.innerHTML += `<span></span>`;
  }

  inputtedEquation.innerHTML = `
  ${Array.from({ length: matrixSize }, (v, i) => {
    return "<span></span>";
  }).join("")}
  `;
};

const setEquationsObject = () => {
  equations = {};
  for (let i = 1; i <= 10; i++) {
    Object.defineProperties(equations, {
      [`equationSpan${i}`]: {
        value: [],
        writable: true,
      },
      [`equationSpan${i}V1`]: {
        value: [],
        writable: true,
      },
    });
    for (let j = 0; j < 10; j++) {
      Object.defineProperties(equations, {
        [`equationSpan${i}X${j + 1}`]: {
          value: [],
          writable: true,
        },
        [`equationSpan${i}Operator${j}`]: {
          value: "+",
          writable: true,
        },
      });
    }
  }

  for (let i = 2; i <= 10; i++) {
    if (i !== matrixSize) {
      equationsTypes[`equation_${i}`] = {};
    }
  }

  const myObj = equationsTypes[`equation_${matrixSize}`];
  for (let i = 1; i <= matrixSize; i++) {
    Object.defineProperty(myObj, `row${i}`, {
      value: {},
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }

  for (let i = 1; i <= matrixSize; i++) {
    const key = equationsTypes[`equation_${matrixSize}`][`row${i}`];

    Object.defineProperty(key, "V1", {
      value: null,
      writable: true,
    });

    for (let j = 1; j <= matrixSize; j++) {
      Object.defineProperties(key, {
        [`X${j}`]: {
          value: null,
          writable: true,
        },
        [`operator${j - 1}`]: {
          value: equations[`equationSpan${i}Operator${j - 1}`],
          writable: true,
        },
      });
    }
  }
};

const clearEquationSpans = () => {
  setEquationsObject();
};

const setEquation = (value, rowNum, variableNum, variable) => {
  equationsTypes[`equation_${matrixSize}`][`row${rowNum}`][
    `${variable}${variableNum}`
  ] = value === "" ? "" : Number(value);
};

const setEquationOperator = (rowNum, operatorNum, operator) => {
  equationsTypes[`equation_${matrixSize}`][`row${rowNum}`][
    `operator${operatorNum}`
  ] = operator;
};

const handleMatrixInputBox = (event, index) => {
  for (let i = 1; i <= Math.pow(matrixSize, 2); i++) {
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

  let expressions = [];
  for (let i = 0; i < matrixSize; i++) {
    let expression;
    if (i === 0) {
      expression = [
        equations[`equationSpan${spanNumber}X${i + 1}`].length > 0
          ? equations[`equationSpan${spanNumber}Operator${i}`] === "-"
            ? equations[`equationSpan${spanNumber}Operator${i}`]
            : ""
          : "",
        ...equations[`equationSpan${spanNumber}X${i + 1}`],
      ];
    } else {
      expression = [
        equations[`equationSpan${spanNumber}X${i + 1}`].length > 0
          ? equations[`equationSpan${spanNumber}Operator${i}`]
          : "",
        ...equations[`equationSpan${spanNumber}X${i + 1}`],
      ];
    }

    expressions.push(...expression);
  }

  const vectorValue = [
    equations[`equationSpan${spanNumber}V1`].length ? "=" : "",
    ...equations[`equationSpan${spanNumber}V1`],
  ];

  const finalEquation = [...expressions, ...vectorValue];

  equations[`equationSpan${spanNumber}`] = finalEquation;

  spans[spanNumber - 1].innerHTML =
    equations[`equationSpan${spanNumber}`].join("");
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

  const localEquation = equationsTypes[`equation_${matrixSize}`];
  const falsyConditions = [null, undefined, ""];

  for (const key in localEquation) {
    if (falsyConditions.includes(localEquation[key].V1)) {
      return alert("Please enter full equations!");
    }

    for (let i = 1; i <= matrixSize; i++) {
      if (falsyConditions.includes(localEquation[key][`X${i}`])) {
        return alert("Please enter full equations!");
      }
    }
  }

  const isDiagonallyDominant = [];
  let valuesArray = [];
  Object.keys(localEquation).forEach((row, index) => {
    valuesArray = [];
    for (let i = 1; i <= matrixSize; i++) {
      if (i === index + 1) {
        valuesArray.unshift(localEquation[row][`X${i}`]);
      } else {
        valuesArray.push(localEquation[row][`X${i}`]);
      }
    }

    isDiagonallyDominant.push(checkDiagonalDominance(valuesArray));
  });

  if (isDiagonallyDominant.includes(false)) {
    return alert("The equations are not diagonally dominant!");
  }

  let variables = {};

  for (let i = 1; i <= matrixSize; i++) {
    variables[`x${i}`] = 0;
  }

  const calculateValues = (iterationNum) => {
    let iterationValues = [];
    const equation = equationsTypes[`equation_${matrixSize}`];

    for (let i = 1; i <= matrixSize; i++) {
      let RHS;

      for (let j = 1; j <= matrixSize; j++) {
        if (i !== j) {
          RHS = RHS
            ? RHS -
              (equation[`row${i}`][`operator${j - 1}`] === "-" ? -1 : +1) *
                equation[`row${i}`][`X${j}`] *
                variables[`x${j}`]
            : -(equation[`row${i}`][`operator${j - 1}`] === "-" ? -1 : +1) *
              equation[`row${i}`][`X${j}`] *
              variables[`x${j}`];
        } else {
          continue;
        }
      }

      variables[`x${i}`] =
        (equation[`row${i}`].V1 + RHS) /
        ((equation[`row${i}`][`operator${i - 1}`] === "-" ? -1 : +1) *
          equation[`row${i}`][`X${i}`]);

      iterationValues.push(variables[`x${i}`]);
    }

    return iterationValues;
  };

  const formResultContainer = document.getElementById("form__result-container");
  const formResult = document.getElementById("form__result");

  const getHeadings = () => {
    let headings = "";
    for (let i = 1; i <= matrixSize; i++) {
      headings += `<h4>x${i}</h4>`;
    }
    return headings;
  };

  formResult.innerHTML = `
  <div class="form__result-row form__result-row--${matrixSize}x${matrixSize}">
    <h4>Iteration no</h4>
    ${getHeadings()}
  </div>
  `;

  for (let i = 0; i < numberOfIterations; i++) {
    const result = calculateValues(i);

    const getResult = () => {
      let localResult = "";
      for (let i = 0; i < matrixSize; i++) {
        localResult += `<p>${result[i]}</p>`;
      }
      return localResult;
    };

    formResult.innerHTML += `
      <div class="form__result-row form__result-row--${matrixSize}x${matrixSize}">
        <p>${i}</p>
        ${getResult()}
      </div>
      `;
  }

  formResultContainer.style.display = "flex";
};

const checkDiagonalDominance = (valuesArray) => {
  const [diagonalValue, ...restValues] = valuesArray;
  const sumOfRestValues = restValues.reduce((acc, cur) => acc + cur);

  return diagonalValue >= sumOfRestValues;
};
