import View from './View.js';

class StartView extends View {
  //CONTAINERS
  _settings__container = document.querySelector('.settings__container');

  //BUTTONS
  _btnStart = document.querySelector('.btn__start');

  //////////////////////////
  /////HANDLER FUNCTIONS///
  /////////////////////////

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
