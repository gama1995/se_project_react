import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const ownerId = card.owner?._id ?? card.owner;
  const isOwn = ownerId === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close modal__close_type_image"
          onClick={onClose}
          aria-label="Close modal"
        ></button>
        <img src={card.imageUrl} 
        alt={card.name} 
        className="modal__image" 
        />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
          <button
            type="button"
            className="modal__delete-button"
            onClick={() => onDeleteItem(card._id)}
          >
            Delete item
          </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
