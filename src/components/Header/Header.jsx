import "./Header.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClicked,
  handleLoginClick,
  handleRegisterClick,
  isLoggedIn,
  weatherData,
  currentTemperatureUnit,
  handleToggleSwitchChange,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch
        currentTemperatureUnit={currentTemperatureUnit}
        handleToggleSwitchChange={handleToggleSwitchChange}
      />

      {isLoggedIn ? (
        <>
          <button
            type="button"
            className="header__add-clothes-btn"
            onClick={handleAddClicked}
          >
            + Add clothes
          </button>

          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="hearder__username">{currentUser.name}</p>

              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <>
          <button
            type="button"
            className="header__auth-button"
            onClick={handleRegisterClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__auth-button"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
