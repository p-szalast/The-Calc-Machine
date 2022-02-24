import View from './View.js';

class StartView extends View {
  //CHECKBOXES
  _checkboxSum = document.querySelector('.checkbox__sum');
  _checkboxSubstract = document.querySelector('.checkbox__substract');
  _checkboxMultiply = document.querySelector('.checkbox__multiply');
  _checkboxDivide = document.querySelector('.checkbox__divide');
  _checkboxExponentiations = document.querySelector(
    '.checkbox__exponentiations'
  );
  _checkboxFactorial = document.querySelector('.checkbox__factorial');

  //CONTAINERS
  _settings__container = document.querySelector('.settings__container');

  //BUTTONS
  _btnStart = document.querySelector('.btn__start');

  ///////////////////////
  //////METHODS //////
  /////////////////////

  _toggleView() {
    this._startScreen.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  ///////////////////////
  /////HANDLER FUNCTIONS///
  ///////////////////////
  addHandlerToggleView() {
    this._btnStart.addEventListener('click', this._toggleView.bind(this));
  }

  addHandlerSelectButtons(handler) {
    this._settings__container.addEventListener('change', function (e) {
      if (!e.target.dataset.symbol) return;

      const data = e.target.dataset.symbol;
      handler(data);
    });
  }
}

export default new StartView();
