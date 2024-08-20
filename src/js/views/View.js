import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Rendered the received object to the DOM. (Documented using JSDoc)
   * @param {Object | Object[]} data The data to be rendered (e.g. a recipe)                            //Expect an object or an array of objects for our data parameter
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM      //Render argument is optional, so we surround it in brackets and identify its default value as true
   * @returns {undefined | ''} A markup string is returned if render=false                              //We either return undefined or our markup string if render is set to false
   * @this {Object} View Instance       //The 'this' keyword points to the instance of our View object (more accurately, our child instance) that's invoking this method. Notice we specified the type of View in curly braces
   * @author Eric Chen
   *
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError(); 
    }
    this._data = data; 

    const markup = this._generateMarkup(); 

    if (!render) {
      return markup;
    }
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return;
    }

    this._data = data;

    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      if (
        !currEl.isEqualNode(newEl) &&
        currEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent; 

        if (!currEl.isEqualNode(newEl)) {
          Array.from(newEl.attributes).forEach(attr => {
            currEl.setAttribute(attr.name, attr.value); 
          });
        }
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', newMarkup);
      }
    });
  }

  renderSpinner() {
    this._clear(); 

    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = ''; 
  }

  renderError(err = this._errMessage) {
    this._clear();

    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${err}</p>
  </div>`;

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(err = this._message) {
    this._clear();

    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${err}</p>
  </div>`;

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
