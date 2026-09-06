import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({  
  clothingItems,
    onCardClick, 
    onAddItemClick,
    onCardLike
}) {

  const currentUser = useContext(CurrentUserContext);

  const ownItems = clothingItems.filter(
  (item) => item.owner._id === currentUser._id);

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>
         <button
          type="button"
          className="clothes-section__add-btn"
          onClick={onAddItemClick}
        >
          + Add new
        </button>
        </div>
      <ul className="clothes-section__list">
        {ownItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
      </ul>
    </div>
  );
}
