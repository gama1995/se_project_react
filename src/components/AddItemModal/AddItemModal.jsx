import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange } = useForm(defaultValues);

    useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

   function handleSubmit (evt) {
    evt.preventDefault();
    onAddItem(values);
   }

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
          minLength={"1"}
          maxLength={"30"}
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error" id="place-name-error" />
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
          value={values.imageUrl}
          onChange={handleChange}
        />
        <span className="modal__error" id="place-link-error" />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="weather-hot"
          className="modal__label modal__input_type_radio"
        >
          <input
            id="weather-hot"
            name="weather"
            type="radio"
            value="hot"
            className="modal__radio-input"
            required
            onChange={handleChange}
          />
          <span className="modal__error" id="place-weather-error" />
          Hot
        </label>
        <label
          htmlFor="weather-warm"
          className="modal__label modal__input_type_radio"
        >
          <input
            id="weather-warm"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
          />
          <span className="modal__error" id="palce-weather-error" />
          Warm
        </label>
        <label
          htmlFor="weather-cold"
          className="modal__label modal__input_type_radio"
        >
          <input
            id="weather-cold"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
          />
          <span className="modal__error" id="palce-weather-error" />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
