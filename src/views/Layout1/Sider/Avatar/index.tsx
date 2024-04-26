import avatar from "@/assets/images/avatar.jpg";

import "./index.scss";

export default function AvatarCp() {
    return (
        <div className="sidebar-avatar-container">
            <img src={avatar} className="sidebar-avatar" alt="logo" />
            <h1 className="sidebar-title">大苦茶籽</h1>
        </div>
    );

}
