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
        onSignout={onSignOut} 
        onEditProfile={onEditProfile}
        />
        <ClothesSection 
        onCardClick={onCardClick} 
        clothingItems={userItems} 
        onAddItemClick={onAddItemClick}
        onCardLike={onCardLike}
        />
    </section>
    );
}