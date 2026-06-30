import "./ModalWithForm.css";

const ModalWithForm = ({ 
  children, 
  buttonText, 
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
        >
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );

 
export default ModalWithForm;