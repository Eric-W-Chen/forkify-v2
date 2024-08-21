class SearchView {
  _parentElement = document.querySelector(".search");
  _inputField = this._parentElement.querySelector(".search__field");

  /**
   * Retrieves the search query from the input field and clears the input.
   * @method
   * @returns {string} The search query entered by the user.
   */
  getQuery() {
    const query = this._inputField.value;
    this._clearInputField();
    return query;
  }

  /**
   * Clears the search input field.
   * @method
   * @private
   */
  _clearInputField() {
    this._inputField.value = "";
  }

  /**
   * Adds an event handler to the search form to handle search submissions.
   * @method
   * @param {Function} handler - The function to be called when the form is submitted.
   */
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
