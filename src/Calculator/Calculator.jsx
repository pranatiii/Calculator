import React, { useReducer } from "react";
import "./Calculator.css";

const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
};

const ACTIONS = {
  CLEAR: "clear",
  BACKSPACE: "backspaceclick",
  INPUT_DIGIT: "input-digit",
  INPUT_OPERATOR: "input-operator",
  INPUT_DECIMAL: "input-decimal",
  CHOOSE_OPERATOR: "choose-operator",
  PERFORM_OPERATION: "perform-operation",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CLEAR:
      return initialState;
    
    case ACTIONS.BACKSPACE:
      return { ...state, currentValue: state.currentValue.slice(0, -1) };
    
    case ACTIONS.INPUT_DIGIT:
      if (state.currentValue === "0") {
        return { ...state, currentValue: action.payload };
      }
      return { ...state, currentValue: state.currentValue + action.payload };
    
    case ACTIONS.INPUT_OPERATOR:
      if (!state.currentValue.includes(".")) {
        return { ...state, currentValue: state.currentValue + "." };
      }
      return state;
    
    case ACTIONS.CHOOSE_OPERATOR:
      return {
        ...state,
        operator: action.payload,
        previousValue: state.currentValue,
        currentValue: "",
      };
    
    case ACTIONS.PERFORM_OPERATION:
      const { previousValue, currentValue, operator } = state;
      const prev = parseFloat(previousValue);
      const current = parseFloat(currentValue);
      let result = "0";
      switch (operator) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "x":
          result = prev * current;
          break;
        case "÷":
          result = prev / current;
          break;
        default:
          break;
      }
      return {
        ...state,
        currentValue: String(result),
        operator: null,
        previousValue: null,
      };
    default:
      return state;
  }
};

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDigit = (digit) => {
    dispatch({ type: ACTIONS.INPUT_DIGIT, payload: digit });
  };

  const handleDecimal = () => {
    dispatch({ type: ACTIONS.INPUT_DECIMAL });
  };

  const handleOperator = (operator) => {
    dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: operator });
  };

  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };

  const handleEqual = () => {
    dispatch({ type: ACTIONS.PERFORM_OPERATION });
  };

  const handleBackspace = () => {
    dispatch({ type: ACTIONS.BACKSPACE });
  };

  return (
    <div className="calculator">
      <div className="display">{state.currentValue}</div>
      <div className="buttons">
        <button className="clear" onClick={handleClear}>AC</button>
        <button onClick={handleBackspace}>⌫</button>
        <button onClick={() => handleOperator("÷")}>÷</button>
        <button onClick={() => handleDigit("7")}>7</button>
        <button onClick={() => handleDigit("8")}>8</button>
        <button onClick={() => handleDigit("9")}>9</button>
        <button onClick={() => handleOperator("x")}>x</button>
        <button onClick={() => handleDigit("4")}>4</button>
        <button onClick={() => handleDigit("5")}>5</button>
        <button onClick={() => handleDigit("6")}>6</button>
        <button onClick={() => handleOperator("-")}>-</button>
        <button onClick={() => handleDigit("1")}>1</button>
        <button onClick={() => handleDigit("2")}>2</button>
        <button onClick={() => handleDigit("3")}>3</button>
        <button onClick={() => handleOperator("+")}>+</button>
        <button onClick={() => handleDigit("0")}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button className="equal" onClick={handleEqual}>=</button>
      </div>
    </div>
  );  
};

export default Calculator;
