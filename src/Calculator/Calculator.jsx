import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState('');

  const handleNumberClick = (value) => {
    setCurrentValue(currentValue === '' ? value : currentValue + value);
  };

  const handleOperatorClick = (value) => {
    if (currentValue === '' && value !== '-') return;
    if (operator !== null) {
      const result = calculate(previousValue, currentValue, operator);
      setPreviousValue(result);
      setDisplay(result);
      setCurrentValue('');
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(value);
    setCurrentValue('');
  };

  const calculate = (prev, curr, op) => {
    const prevNum = parseFloat(prev);
    const currNum = parseFloat(curr);

    if (isNaN(prevNum) || isNaN(currNum)) return '';

    switch (op) {
      case '+':
        return (prevNum + currNum).toString();
      case '-':
        return (prevNum - currNum).toString();
      case 'x':
        return (prevNum * currNum).toString();
      case '÷':
        return (prevNum / currNum).toString();
      default:
        return '';
    }
  };

  const handleEqualClick = () => {
    if (currentValue === '' || operator === null) return;
    const result = calculate(previousValue, currentValue, operator);
    setDisplay(result);
    setCurrentValue(result);
    setOperator(null);
    setPreviousValue('');
  };

  const handleAllClearClick = () => {
    setDisplay('');
    setCurrentValue('');
    setOperator(null);
    setPreviousValue('');
  };

  const handleBackspaceClick = () => {
    setCurrentValue(currentValue.slice(0, -1));
  };

  const handleDecimalClick = () => {
    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  return (
    <div className="calculator">
      <div className="display">{currentValue === '' ? display : currentValue}</div>
      <button className="button" onClick={handleAllClearClick}>AC</button>
      <button className="button" onClick={handleBackspaceClick}>⌫</button>
      <button className="button" onClick={() => handleOperatorClick('÷')}>÷</button>
      <button className="button" onClick={() => handleNumberClick('7')}>7</button>
      <button className="button" onClick={() => handleNumberClick('8')}>8</button>
      <button className="button" onClick={() => handleNumberClick('9')}>9</button>
      <button className="button" onClick={() => handleOperatorClick('x')}>x</button>
      <button className="button" onClick={() => handleNumberClick('4')}>4</button>
      <button className="button" onClick={() => handleNumberClick('5')}>5</button>
      <button className="button" onClick={() => handleNumberClick('6')}>6</button>
      <button className="button" onClick={() => handleOperatorClick('-')}>-</button>
      <button className="button" onClick={() => handleNumberClick('1')}>1</button>
      <button className="button" onClick={() => handleNumberClick('2')}>2</button>
      <button className="button" onClick={() => handleNumberClick('3')}>3</button>
      <button className="button" onClick={() => handleOperatorClick('+')}>+</button>
      <button className="button" onClick={() => handleNumberClick('0')}>0</button>
      <button className="button" onClick={handleDecimalClick}>.</button>
      <button className="button equal" onClick={handleEqualClick}>=</button>
    </div>
  );
};

export default Calculator;
