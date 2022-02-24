import View from './View.js';

class CalcView extends View {
  //CONTAINERS
  _digitsContainer = document.querySelector('.section__digits');
  _operationContainer = document.querySelector('.section__operations');
  _buttonsContainer = document.querySelector('.section__buttons');

  //DISPLAYS
  _displayCurrent = document.querySelector('.display__current');
  _displayPrevious = document.querySelector('.display__previous');
  _displayError = document.querySelector('.error');
  _displayErrorMessage = document.querySelector('.display--error-message');

  //BUTTONS
  _btnClear = document.querySelector('.btn__clear');
  _btnDelete = document.querySelector('.btn__delete');
  _btnSettings = document.querySelector('.btn__settings');

  _btnDigit = document.querySelectorAll('.btn__digit');
  _btnChange = document.querySelector('.btn__change');
  _btnOperator = document.querySelectorAll('.btn__operation');
  _btnFactorial = document.querySelector('.btn__factorial');
  _btnEquals = document.querySelector('.btn__equals');

  ///////////////////////
  //////METHODS //////
  /////////////////////

  updateDisplay(state) {
    if (
      // typeof state.prevNumber !== 'string' ||
      typeof state.curNumber !== 'string'
    )
      this.renderError('Unidentified Error');

    if (
      state.curNumber.toString().includes('e') ||
      state.prevNumber.toString().includes('e')
    )
      this.renderError(
        'The number is too large or too long 🤯 Please try scientific calculator'
      );

    this._displayCurrent.textContent = state.curNumber;
    // displayPrevious.textContent = prevNumber;

    if (state.curOperation) {
      this._displayPrevious.textContent = state.prevNumber + state.curOperation;
    } else {
      this._displayPrevious.textContent = '';
    }
  }

  renderError(message) {
    this._displayError.classList.remove('hidden');
    this._displayErrorMessage.textContent = message;
    this._displayErrorMessage.classList.remove('hidden');
    this._displayPrevious.classList.add('hidden');
    this._displayCurrent.classList.add('hidden');
  }

  clearError() {
    this._displayError.classList.add('hidden');
    this._displayErrorMessage.classList.add('hidden');
    this._displayPrevious.classList.remove('hidden');
    this._displayCurrent.classList.remove('hidden');
  }

  disableEnableButtons(data) {
    const digitButtons = this._digitsContainer.querySelectorAll('button');
    const operationButtons =
      this._operationContainer.querySelectorAll('button');
    const buttonsToSet = [...digitButtons, ...operationButtons];

    //MANUAL SETTING
    if (data === '*') data = '×';
    if (data === '/') data = '÷';

    const buttonToSwitch = buttonsToSet.find(
      btn => btn.dataset.symbol === data
    );

    buttonToSwitch.classList.toggle('hidden');
  }
  /////////////////////////////
  ////ADD HANDLER FUNCTIONS///
  ////////////////////////////

  addHandlerToggleView() {
    this._btnSettings.addEventListener('click', this._toggleView.bind(this));
  }

  addHandlerClear(handler) {
    this._btnClear.addEventListener('click', handler);
  }

  addHandlerDeleteDigit(handler) {
    this._btnDelete.addEventListener('click', handler);
  }

  addHandlerAddDigit(handler) {
    this._digitsContainer.addEventListener('click', function (e) {
      if (!e.target.classList.contains('btn__digit')) return;
      handler(e.target.textContent);
    });
  }

  addHandlerChangeToNegative(handler) {
    this._btnChange.addEventListener('click', handler);
  }

  addHandlerSetOperation(handler) {
    this._operationContainer.addEventListener('click', function (e) {
      if (!e.target.classList.contains('btn__operation')) return;

      handler(e.target.dataset.symbol);
    });
  }

  addHandlerFactorial(handler) {
    this._btnFactorial.addEventListener('click', handler);
  }

  addHandlerEquals(handler) {
    this._btnEquals.addEventListener('click', handler);
  }
}
export default new CalcView();
