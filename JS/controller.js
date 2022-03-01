import * as model from './model.js';
import startView from './startView.js';
import calcView from './calcView.js';

const addDigit = function (digit) {
  let curNumber = model.state.curNumber.toString();

  ///RETURNS///
  // If press . and num contains .
  if (curNumber.includes('.') && digit === '.') return;

  // if number is 0 and press 0
  if (curNumber === '0' && digit === '0') return;

  ////REPLACE////
  // if number is 0 and press 1-9 // replace 0
  if (curNumber === '0' && digit !== '.' && digit !== '0') {
    curNumber = digit;
  }

  ////ADD TO STRING////
  // if number is 0 and press .
  else if (curNumber === '0' && digit === '.') {
    curNumber = curNumber + digit;
  }

  // If number 1-9 and press anything
  else if (curNumber !== '0') {
    curNumber = curNumber + digit;
  }

  model.state.curNumber = curNumber;
  calcView.updateDisplay(model.state);
};

//////////////////////////////////////////
//// ADDING DIGITS, DELETING DIGITS, ////
////   CHANGING NUM TO NEGATIVE     /////
////////////////////////////////////////

const deleteDigit = function () {
  let curNum = model.state.curNumber.toString();

  if (curNum === '0' || curNum === '') return;

  if (curNum.length === 1) curNum = '0';
  else curNum = curNum.slice(0, -1);

  if (curNum === '-') curNum = '0';

  model.state.curNumber = curNum;

  calcView.updateDisplay(model.state);
};

const changeToNegative = function () {
  if (!model.state.curNumber) return;
  if (model.state.curNumber === '.') return;

  model.state.curNumber = (-model.state.curNumber).toString();

  calcView.updateDisplay(model.state);
};

const clear = function () {
  model.state.curNumber = '0';
  model.state.prevNumber = '';
  model.state.curOperation = '';
  model.state.errorMessage = '';

  calcView.clearError();

  calcView.updateDisplay(model.state);
};

//////////////////////////////////
////   OPERATIONS //////////////
///////////////////////////////

const setOperation = function (operator) {
  if (model.state.curNumber === '') return;
  if (model.state.curNumber === '.') return;

  if (model.state.prevNumber !== '') model.calculate();

  model.state.curOperation = operator;
  model.state.prevNumber = model.state.curNumber;
  model.state.curNumber = '';

  calcView.updateDisplay(model.state);
};

const factorial = function () {
  if (!model.state.curNumber) return;
  if (model.state.curNumber === '') return;
  if (model.state.curNumber === '.') return;

  model.calcFactorial();

  if (model.state.errorMessage) calcView.renderError(model.state.errorMessage);
  else {
    model.state.curNumber = model
      .calcFactorial(model.state.curNumber)
      .toString();
  }
  calcView.updateDisplay(model.state);
};

const equals = function () {
  if (!model.state.curNumber || !model.state.prevNumber) return;
  if (model.state.curNumber === '.') return;

  model.calculate();
  model.state.curOperation = undefined;

  if (model.state.curNumber === NaN) return;

  if (typeof model.state.curNumber !== 'string')
    model.state.curNumber.toString();

  if (!model.state.errorMessage) {
    model.state.curOperation = '';
    model.state.prevNumber = '';
    calcView.updateDisplay(model.state);
  } else calcView.renderError(model.state.errorMessage);
};

///////////////////////////////
/////////   OTHER   ///////////
///////////////////////////////

const selectButtons = function (data) {
  calcView.disableEnableButtons(data);
};

const init = function () {
  startView.addHandlerToggleView();
  startView.addHandlerSelectButtons(selectButtons);
  calcView.addHandlerToggleView();
  calcView.addHandlerAddDigit(addDigit);
  calcView.addHandlerClear(clear);
  calcView.addHandlerDeleteDigit(deleteDigit);
  calcView.addHandlerChangeToNegative(changeToNegative);
  calcView.addHandlerSetOperation(setOperation);
  calcView.addHandlerFactorial(factorial);
  calcView.addHandlerEquals(equals);

  model.state.curNumber = '0';
  calcView.updateDisplay(model.state);
};

init();
