import View from "./View";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _message = "Recipe was successfully uploaded!";

  /**
   * Constructor method initializes event handlers to show and hide the modal window.
   * @constructor
   */
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  /**
   * Toggles the visibility of the add recipe modal window and overlay.
   * @method
   */
  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  /**
   * Adds an event handler to the open button to show the add recipe modal window.
   * @private
   * @method
   */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  /**
   * Adds event handlers to the close button and overlay to hide the add recipe modal window.
   * @private
   * @method
   */
  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  /**
   * Adds an event handler to handle the recipe upload process when the form is submitted.
   * @method
   * @param {Function} handler - The function to be called when the form is submitted.
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
