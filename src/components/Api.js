export default class Api {
  constructor({ baseURL, authToken }) {
    this._baseURL = baseURL;
    this._authToken = authToken;
  }

  getUserInfo() {
    return fetch(`${this._baseURL}//users/me`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        return console.error(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        return console.error(err);
      });
  }

  getAppInfo() {
    /* Cards should be rendered after the user information is received from the server. Сreate 
    a function in Api.js and return the Promise.all() method. Pass the array of function calls 
    for getting user information and the list of cards to Promise.all() as a parameter.*/
    return Promise.all([getUserInfo, getInitialCards]).then((res) =>
      console.log(res),
    );
  }

  editProfile({ name, about }) {
    fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// Endpoints:
/*User routes
GET /users/me – Get the current user’s info
PATCH /users/me – Update your profile information
PATCH /users/me/avatar – Update avatar

Card routes
GET /cards – Get all cards
DELETE /cards/:cardId – Delete a card
PUT /cards/:cardId/likes – Like a card
DELETE /cards/:cardId/likes – Dislike a card */
