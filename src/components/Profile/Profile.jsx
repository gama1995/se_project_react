import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({ 
  clothesItem, 
  onCardClick, 
  onAddItemClick, 
  onCardLike, 
  onSignOut, 
  onEditProfile, }) {
    
    return ( 
    <section className="profile">
        <SideBar 
        onSignOut={onSignOut} 
        onEditProfile={onEditProfile}
        />
        <ClothesSection 
        onCardClick={onCardClick} 
        clothingItems={clothesItem} 
        onAddItemClick={onAddItemClick}
        onCardLike={onCardLike}
        />
    </section>
    );
}