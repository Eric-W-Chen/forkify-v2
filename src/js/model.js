import { API_KEY, API_URL, RES_PER_PAGE } from "./config";
import { AJAX } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1, // set the page to 1 by default
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

/**
 * Creates a recipe object from the data received from the API.
 * @function createRecipeObject
 * @param {Object} data - Data object returned from the API.
 * @returns {Object} A recipe object with relevant properties.
 */
const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

/**
 * Loads a recipe by its ID and updates the state with the recipe data.
 * @async
 * @function loadRecipe
 * @param {string} id - The ID of the recipe to be loaded.
 * @throws Will throw an error if the recipe cannot be loaded.
 */
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Loads search results based on a query and updates the state with the results.
 * @async
 * @function loadSearchResults
 * @param {string} query - The search query to find recipes.
 * @throws Will throw an error if the search results cannot be loaded.
 */
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

/**
 * Retrieves a paginated slice of the search results.
 * @function getSearchResultsPage
 * @param {number} [page=state.search.page] - The page number to retrieve.
 * @returns {Array} A slice of the search results corresponding to the page.
 */
export const getSearchResultsPage = function (page = state.search.page) {
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  state.search.page = page;
  return state.search.results.slice(start, end);
};

/**
 * Updates the servings of the current recipe and adjusts ingredient quantities accordingly.
 * @function updateServings
 * @param {number} newServings - The new number of servings.
 */
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

/**
 * Persists the bookmarks to local storage.
 * @function persistBookmarks
 * @private
 */
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

/**
 * Adds a recipe to the bookmarks and persists the updated bookmarks to local storage.
 * @function addBookmark
 * @param {Object} recipe - The recipe object to be bookmarked.
 */
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  persistBookmarks();
};

/**
 * Deletes a recipe from the bookmarks and updates the local storage.
 * @function deleteBookmark
 * @param {string} id - The ID of the recipe to remove from bookmarks.
 */
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((recipe) => id === recipe.id);
  state.bookmarks[index].bookmarked = false;
  state.bookmarks.splice(index, 1);

  persistBookmarks();
};

/**
 * Restores bookmarks from local storage and updates the state.
 * @function restoreBookmarks
 */
export const restoreBookmarks = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage?.length > 0) state.bookmarks = JSON.parse(storage);
};

/**
 * Uploads a new recipe to the API and adds it to bookmarks.
 * @async
 * @function uploadRecipe
 * @param {Object} newRecipe - The new recipe data submitted by the user.
 * @throws Will throw an error if the recipe cannot be uploaded.
 */
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient-") && entry[1])
      .map((ingredient) => {
        const ingArray = ingredient[1].split(",").map((str) => str.trim());

        if (ingArray.length !== 3) {
          throw new Error(
            "Wrong ingredient format! Please use the correct format."
          );
        }
        const [quantity, unit, description] = ingArray;
        return { quantity: "" ? null : Number(quantity), unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      cooking_time: Number(newRecipe.cookingTime),
      servings: Number(newRecipe.servings),
      ingredients,
    };

    const data = await AJAX(
      `${API_URL}?search=${recipe.title}&key=${API_KEY}`,
      recipe
    );
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
    persistBookmarks();
  } catch (err) {
    throw err;
  }
};
