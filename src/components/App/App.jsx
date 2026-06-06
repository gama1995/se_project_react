import {  useState, useEffect } from "react";
import "./App.css";
import { coordinates, defaultClothingItems } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

const APIkey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
const [weatherData, setWeatherData] = useState({ 
    type: "", 
    temp: { F: 999 },
    city: "",
    condition: "clear",
    isDay: true,
});
const [clothingItems, setClothingItems] = useState(defaultClothingItems);
const [activeModal, setActiveModal] = useState("");
const [selectedCard, setSelectedCard] = useState({});

const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);

}

const handleAddClicked = () => {
    setActiveModal("add-garment");
};

const closeActiveModal = () => {
    setActiveModal("");
};

useEffect(() => {
    getWeather(coordinates, APIkey)
    .then((data) => {
      const filteredData = filterWeatherData(data);
      setWeatherData(filteredData);
    })
    .catch(console.error);
}, []);

  return (
  <div className="page">
    <div className="page__content">
      <Header handleAddClicked={handleAddClicked} weatherData={weatherData} />
      <Main
       weatherData={weatherData} 
       clothingItems={clothingItems}
       setClothingItems={setClothingItems}
       handleCardClick={handleCardClick}
        />
      <Footer />
    </div>
    <ModalWithForm 
    title="New garment" 
    buttonText="Add garment"
    name="add-garment"
    isOpen={activeModal === "add-garment"}
    onClose={closeActiveModal}
    >
    <label htmlFor="name" className="modal__label">
        Name{" "}
   <input
type="text"
className="modal__input"
id="name"
name="name"
placeholder="Name"
required
/>
</label>
<label htmlFor="imageUrl" className="modal__label">
    Image  
<input
type="url"
className="modal__input"
id="imageUrl"
name="imageUrl"
placeholder="Image URL"
required
/>
</label>
<fieldset className="modal__radio-buttons">
<legend className="modal__legend">Select the weather type:</legend>
<label
 htmlFor="weather-hot"
  className="modal__label modal__input_type_radio">
<input
id="weather-hot"
name="weather"
type="radio"
value="hot"
className="modal__radio-input"
required
/> 
Hot
    </label>
    <label
 htmlFor="weather-warm"
  className="modal__label modal__input_type_radio">
<input
id="weather-warm"
name="weather"
type="radio"
value="warm"
className="modal__radio-input"
/> 
Warm
    </label>
    <label
 htmlFor="weather-cold"
  className="modal__label modal__input_type_radio">
<input
id="weather-cold"
name="weather"
type="radio"
value="cold"
className="modal__radio-input"
/> 
Cold
    </label>
</fieldset>
      </ModalWithForm> 
      <ItemModal 
      activeModal={activeModal} 
      card={selectedCard} 
      onClose={closeActiveModal}
      />
  </div>
  );
}

export default App;
