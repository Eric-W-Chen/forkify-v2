import * as model from "./model";
import RecipeView from "./views/RecipeView";
import SearchView from "./views/SearchView";
import ResultsView from "./views/ResultsView";
import PaginationView from "./views/PaginationView";
import BookmarksView from "./views/BookmarksView";
import AddRecipeView from "./views/AddRecipeView";
import "core-js/stable"; 
import "regenerator-runtime"; 
import BookmarksView from "./views/BookmarksView";
import { MODAL_CLOSE_SEC } from "./config";
///////////////////////////////////////


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); 

    if (!id) return;

    RecipeView.renderSpinner(); 
    ResultsView.update(model.getSearchResultsPage()); 
    BookmarksView.update(model.state.bookmarks); 
    await model.loadRecipe(id);
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner(); 
    const query = SearchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);
    ResultsView.render(model.getSearchResultsPage());
    PaginationView.render(model.state.search);
  } catch (err) {
    ResultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage)); 
  PaginationView.render(model.state.search); 
};


const controlServings = function (newServings) {
  model.updateServings(newServings);
  RecipeView.update(model.state.recipe);
};

const controlToggleBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe); 
  }
  else {
    model.deleteBookmark(model.state.recipe.id);
  }
  RecipeView.update(model.state.recipe);
  BookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    AddRecipeView.renderSpinner(); 

    await model.uploadRecipe(newRecipe);

    RecipeView.render(model.state.recipe); 
    AddRecipeView.renderMessage(); 
    window.history.pushState(null, "", `#${model.state.recipe.id}`); 
    BookmarksView.render(model.state.bookmarks); 

    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000); 
  } catch (err) {
    console.error(err);
    AddRecipeView.renderError(err.message);
  }
};

const init = function () {
  model.restoreBookmarks();
  BookmarksView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerToggleBookmark(controlToggleBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};

init(); 
