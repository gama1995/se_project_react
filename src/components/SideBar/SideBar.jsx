import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
const username = "Terrence Tegegne";
const userAvatar = avatar;


    return (
        <aside className="sidebar">
         <div className="sidebar__user-container">
            {userAvatar ? (
                <img 
                src={userAvatar} 
                alt={username} 
                className="sidebar__avatar" 
                />
            ) : (
                <div className="sidebar__avatar_none">
                    {username.chartAt(0)}
                    </div>
            )}
                <p className="sidebar__username">{username}</p>
              </div>
              </aside>
    );
}