import checkResponse from "./checkResponse";

const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(checkResponse);

export const addItem = ({ name, imageUrl, weather }) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
};

export const removeItem = (itemID) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const addCardLike = (itemID) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const removeCardLike = (itemID) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const updateUserProfile = ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(checkResponse);
};
