import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";


export default function Profile({ clothesItem, onCardClick, onAddItemClick }) {
    return ( 
    <section className="profile">
        <SideBar/>
        <ClothesSection 
        onCardClick={onCardClick} 
        clothingItems={clothesItem} 
        onAddItemClick={onAddItemClick}
        />
    </section>
    );
}