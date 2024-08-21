import { TIMEOUT_SEC } from "./config";

/**
 * Returns a promise that rejects after a specified timeout period.
 * @function timeout
 * @param {number} s - The number of seconds before the promise rejects.
 * @returns {Promise} A promise that rejects with a timeout error.
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Makes an AJAX request using the Fetch API, with support for GET and POST methods.
 * Includes a timeout to reject the request if it takes too long.
 * @async
 * @function AJAX
 * @param {string} url - The URL to send the request to.
 * @param {Object} [uploadData=undefined] - Data to be uploaded (for POST requests). If undefined, a GET request is made.
 * @returns {Object} The response data from the server.
 * @throws Will throw an error if the request fails or if the timeout is reached.
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }

    return data;
  } catch (err) {
    // Optionally handle errors here, but rethrowing might be better for error handling upstream
    throw err;
  }
};
