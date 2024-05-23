//better-reads/src/components/SidePanel/SidePanel.jsx

import { Link } from 'react-router-dom';

export default function SidePanel() {
    return (
      <div className="side-panel">
        <div>
        <Link to="/home">Home</Link>
        </div>
        <div>
        <Link to="/profile-page">Profile</Link>
        </div>
        <div>
        <Link to="/booklists">My BookLists</Link>
        </div>
        <div>
        <Link to="/friends">Friends</Link>
        </div>
      </div>
    );
  }