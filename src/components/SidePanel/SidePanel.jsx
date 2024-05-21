import { Link } from 'react-router-dom';

export default function SidePanel() {
    return (
      <div className="side-panel">
        <div>
        <Link to="/profile-page">Profile</Link>
        </div>
        <div>
        <Link to="/booklists">My BookLists</Link>
        </div>
      </div>
    );
  }