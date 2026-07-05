import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ 
    clothingItems,  
    onCardClick, 
    onAddItemClick
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your items</p>
         <button
          type="button"
          className="clothes-section__add-btn"
          onClick={onAddItemClick}
        >
          + Add new
        </button>
        </div>
      <ul className="clothes-section__list">
        {clothingItems
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
      </ul>
    </div>
  );
}
