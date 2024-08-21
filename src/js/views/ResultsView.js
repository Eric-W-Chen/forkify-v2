import View from "./View";
import PreviewView from "./PreviewView";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errMessage = "No recipes found for your query! Please try again";
  _message = "";

  /**
   * Generates the HTML markup for the search results.
   * Maps over the results data and uses the PreviewView to generate markup for each recipe.
   * @method
   * @returns {string} The generated HTML string for all search results.
   */
  _generateMarkup() {
    return this._data
      .map((result) => PreviewView.render(result, false))
      .join("");
  }
}

export default new ResultsView();
