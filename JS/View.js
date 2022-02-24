export default class View {
  
  //VIEWS
  _startScreen = document.querySelector('.view__settings');
  _overlay = document.querySelector('.view__overlay');

  //////////////////////
  //////METHODS //////
  /////////////////////

  _toggleView() {
    this._startScreen.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
}
