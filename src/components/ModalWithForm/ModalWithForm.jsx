import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText,
  secondaryButtonText,
  onSecondaryClick,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
}) => (
  <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
    <div className="modal__content">
      <h2 className="modal__title">{title}</h2>

      <button
        type="button"
        className="modal__close"
        onClick={onClose}
        aria-label="Close modal"
      ></button>

      <form onSubmit={onSubmit} className="modal__form">
        {children}

        <div className="modal__buttons">
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>

          {secondaryButtonText && (
            <button
              type="button"
              className="modal__switch-button"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
);

export default ModalWithForm;
