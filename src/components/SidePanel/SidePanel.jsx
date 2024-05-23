//better-reads/src/components/SidePanel/SidePanel.jsx

import { Link } from 'react-router-dom';
import './SidePanel.css';

export default function SidePanel() {
  return (
    <div className="side-panel">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
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
