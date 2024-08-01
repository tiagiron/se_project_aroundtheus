export default class Api {
  constructor({ baseURL, authToken }) {
    this._baseURL = baseURL;
    this._authToken = authToken;
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) => {
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // other methods for working with the API
}

/* Cards should be rendered after the user information is received from the server. Сreate a function in Api.js and return the Promise.all() method. Pass the array of function calls for getting user information and the list of cards to Promise.all() as a parameter.
 */

// Endpoints:
/*User routes
GET /users/me – Get the current user’s info
PATCH /users/me – Update your profile information
PATCH /users/me/avatar – Update avatar

Card routes
GET /cards – Get all cards
POST /cards – Create a card
DELETE /cards/:cardId – Delete a card
PUT /cards/:cardId/likes – Like a card
DELETE /cards/:cardId/likes – Dislike a card */
