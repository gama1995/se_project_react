import checkResponse from "./checkResponse";

const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const getItems = () => {
  return request(`${baseUrl}/items`, {
    headers,
  });
};

export const addItem = ({ name, imageUrl, weather }) => {
  const token = localStorage.getItem("jwt");

  return request(`${baseUrl}/items`, {
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
  });
};

export const removeItem = (itemID) => {
  const token = localStorage.getItem("jwt");

  return request(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
};

export const addCardLike = (itemID) => {
  const token = localStorage.getItem("jwt");

  return request(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (itemID) => {
  const token = localStorage.getItem("jwt");

  return request(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const updateUserProfile = ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");

  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  });
};
