import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes?.some((id) => id === currentUser._id);

  const handleLike = () => {
    onCardLike({
      ...item,
      isLiked,
    });
  }; 

  return (
    <li className="card">
      <div className="card__header">
      <h2 className="card__name">{item.name}</h2>

      {currentUser._id && (
        <button
        type="button"
        className={`card__like-button ${
          isLiked ? "card__like-button_active" : ""
        }`}
        onClick={handleLike}
      aria-label={isLiked ? "Unlike item" : "Like item"}
      >
        {isLiked ? "❤️" : "🤍"}
      </button>
      )}
      </div> 

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={`${item.name} clothing item`}
      />
    </li>
  );
}

export default ItemCard;
