import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import * as auth from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { getItems, addItem, removeItem, addCardLike, removeCardLike, updateUserProfile, } from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";


const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const coordinates = {
  latitude: 32.779167,
  longitude: -96.808891,
};

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
    imageUrl: ""
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

   const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ADD THIS TOKEN CHECK HERE
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      });
  }, []);

  // ADD LOGIN FUNCTION HERE
  const handleLogin = ({ email, password }) => {
    auth
      .login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);

        return auth.checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

const handleRegistration = ({ name, avatar, email, password }) => {
  auth
    .register({
      name,
      avatar,
      email,
      password,
    })
    .then(() => {
      return handleLogin({
        email,
        password,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClicked = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
  setActiveModal("login");
};

const handleRegisterClick = () => {
  setActiveModal("register");
};

  const onAddItem = (inputValues) => {
const token = localStorage.getItem("jwt");

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        console.log("WEATHER RESPONSE:", data);

        if (!data || !data.weather) {
          console.error("Unexpected weather response:", data);
          return;
        }

        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Weather API Error:", err);
      });

    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
  }, []);

  const handleDeleteItem = (id) => {
const token = localStorage.getItem("jwt");

    removeItem(id)
      .then(() => {
        setClothingItems((items) => items.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
  localStorage.removeItem("jwt");
  setCurrentUser({});
  setIsLoggedIn(false);
};

  const handleCardLike = ({ _id, isLiked }) => {
  if (!isLoggedIn) {
    return;
  }

  const request = isLiked
    ? removeCardLike(_id, token)
    : addCardLike(_id, token);

  request
    .then((updatedCard) => {
      setClothingItems((items) =>
        items.map((item) =>
          item._id === _id ? updatedCard : item
        )
      );
    })
    .catch(console.error);
};

const handleEditProfileClick = () => {
  setActiveModal("edit-profile");
};

const handleUpdateUser = ({ name, avatar }) => {
const token = localStorage.getItem("jwt");

  updateUserProfile({ name, avatar })
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeActiveModal();
    })
    .catch(console.error);
};

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
          handleAddClicked={handleAddClicked}
  handleLoginClick={handleLoginClick}
  handleRegisterClick={handleRegisterClick}
  isLoggedIn={isLoggedIn}
  weatherData={weatherData}
  currentTemperatureUnit={currentTemperatureUnit}
  handleToggleSwitchChange={handleToggleSwitchChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  setClothingItems={setClothingItems}
                  handleCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onCardClick={handleCardClick}
                  clothesItem={clothingItems}
                  onAddItemClick={handleAddClicked}
                  onCardLike={handleCardLike}
                  onSignOut={handleSignOut}
                  onEditProfile={handleEditProfileClick}
                />
                  </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
          onClose={closeActiveModal}
        />
        <LoginModal
  isOpen={activeModal === "login"}
  onClose={closeActiveModal}
  onLogin={handleLogin}
/>
<RegisterModal
  isOpen={activeModal === "register"}
  onClose={closeActiveModal}
  onRegister={handleRegistration}
/>
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onClose={closeActiveModal}
          onUpdateUser={handleUpdateUser}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
