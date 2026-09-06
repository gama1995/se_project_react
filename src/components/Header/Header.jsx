import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";


function Header({ 
  handleAddClicked, 
  handleLoginClick, 
  handleRegisterClick, 
   isLoggedIn,
  weatherData, 
  currentTemperatureUnit,
   handleToggleSwitchChange 
  }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
      <img  
      src={logo} 
      alt="WTWR Logo"
      className="header__logo" 
      />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch
      currentTemperatureUnit={currentTemperatureUnit}
      handleToggleSwitchChange={handleToggleSwitchChange}
      />
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
      <NavLink className="header__nav-link" to="/profile">
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
      </NavLink>
    </header>
  );
}

export default Header;
