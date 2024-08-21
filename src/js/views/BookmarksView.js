import View from "./View";
import PreviewView from "./PreviewView";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errMessage = "No bookmarks yet! Find a nice recipe and bookmark it :)";
  _message = "";

  /**
   * Generates the HTML markup for the list of bookmarked recipes.
   * Maps over the bookmarked data and uses the PreviewView to generate markup for each bookmark.
   * @method
   * @returns {string} The generated HTML string for the bookmarks list.
   * @private
   */
  _generateMarkup() {
    return this._data
      .map((bookmark) => PreviewView.render(bookmark, false))
      .join("");
  }

  /**
   * Adds an event handler to render bookmarks when the page loads.
   * @method
   * @param {Function} handler - The function to be called when the page is loaded.
   */
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BookmarksView();
