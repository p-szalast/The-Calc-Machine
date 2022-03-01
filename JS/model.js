import { checkIfNatural } from './helpers.js';

////////////////
/////STATE/////
///////////////

export const state = {
  curNumber: '',
  prevNumber: '',
  curOperation: undefined,
  errorMessage: '',
};

///////////////////
/////FUNCTIONS////
//////////////////

export const calculate = function () {
  if (!state.curNumber || !state.prevNumber) return;

  if (state.curNumber === '.' || state.prevNumber === '.') return;

  const a = Number.parseFloat(state.prevNumber);
  const b = Number.parseFloat(state.curNumber);

  if (isNaN(state.prevNumber) || isNaN(state.curNumber)) return;

  let result;

  switch (state.curOperation) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '×':
      result = a * b;
      break;
    case '÷':
      if (b === 0) {
        state.errorMessage =
          'Dzielenie przez 0 nie ma sensu liczbowego🛑 Wyszyść i spróbuj ponownie.';
        break;
      }
      result = a / b;
      break;
    case '^':
      if (!checkIfNatural(a) || !checkIfNatural(b)) {
        state.errorMessage =
          'Potęgowanie dostępne tylko dla liczb naturalnych😿 Spróbuj w innym kalkulatorze.';
        break;
      }

      result = Math.pow(a, b);
      break;
    default:
      state.errorMessage = 'Operation not found';
      return;
  }

  if (result === undefined) {
    state.curNumber = '';
    return;
  }

  state.curNumber = result.toString();
};

export const calcFactorial = function () {
  let num = state.curNumber;

  if (!checkIfNatural(num)) {
    state.errorMessage =
      'Silnia dostępna tylko dla liczb naturalnych💥 Spróbuj w innym kalkulatorze.';
    return;
  }

  let result = 1;
  if (num === 0 || num === 1) return result;
  else {
    for (let i = Number(num); i >= 1; i--) {
      result = result * i;
    }
  }

  if (!isFinite(result)) {
    state.errorMessage =
      'Zbyt skomplikowana operacja 🪐. Przegrzanie procesora ';
    return;
  } else {
    return result.toString();
  }
};
