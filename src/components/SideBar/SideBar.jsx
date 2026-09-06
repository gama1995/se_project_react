import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onSignOut, onEditProfile,}) {
  const currentUser = useContext(CurrentUserContext);

return (
        <aside className="sidebar">
         <div className="sidebar__user-container">
                {currentUser.avatar ? (
                <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="sidebar__avatar" 
                />
                ) : (
                <div className="sidebar__avatar-placeholder">
                  {currentUser.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <p className="sidebar__username">
                    {currentUser.name}
                    </p>
              </div>
              <button
  type="button"
  className="sidebar__edit-btn"
  onClick={onEditProfile}
>
  Edit Profile
</button>
<button
              type="button"
              className="sidebar__logout-btn"
              onClick={onSignOut}
              >
                Sign Out
              </button>
              </aside>
    );
}