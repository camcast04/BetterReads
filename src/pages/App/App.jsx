// better-reads/src/pages/App/App.jsx


import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import BookDetailsPage from '../BookDetailsPage/BookDetailsPage';
import BookListsPage from '../BookListsPage/BookListsPage';
import BookListDetailsPage from '../BookListDetailsPage/BookListDetailsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import LandingPage from '../LandingPage/LandingPage';
import BookSearch from '../../components/BookSearch/BookSearch';
import FeaturePage from '../FeaturePage/FeaturePage';
import SidePanel from '../../components/SidePanel/SidePanel';

export default function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  const handleUserSet = (user) => {
    setUser(user);
    navigate('/'); 
  };

  return (
    <main className="App">
      {user ? (
        <>
          <div className="content">
            <NavBar user={user} setUser={setUser} />
            <SidePanel />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage user={user} />} />
                <Route path="/book/:bookId" element={<BookDetailsPage user={user} />} />
                <Route path="/booklists" element={<BookListsPage />} />
                <Route path="/lists/:listName" element={<BookListDetailsPage />} /> {/* Ensure this route is present */}
                <Route path="/search" element={<BookSearch />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage setUser={handleUserSet} />} />
          <Route path="/auth" element={<AuthPage setUser={handleUserSet} />} />
          <Route path="/features" element={<FeaturePage />} />
        </Routes>
      )}
    </main>
  );
}


  

// import { useState } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { getUser } from '../../utilities/users-service';
// import './App.css';
// import AuthPage from '../AuthPage/AuthPage';
// import NavBar from '../../components/NavBar/NavBar';
// import HomePage from '../HomePage/HomePage';
// import BookDetailsPage from '../BookDetailsPage/BookDetailsPage';
// import BookListsPage from '../BookListsPage/BookListsPage';
// import ProfilePage from '../ProfilePage/ProfilePage';
// import LandingPage from '../LandingPage/LandingPage';
// import BookSearch from '../../components/BookSearch/BookSearch';
// import FeaturePage from '../FeaturePage/FeaturePage';
// import SidePanel from '../../components/SidePanel/SidePanel';

// export default function App() {
//   const [user, setUser] = useState(getUser());
//   const navigate = useNavigate();

//   const handleUserSet = (user) => {
//     setUser(user);
//     navigate('/'); 
//   };

//   return (
//     <main className="App">
//       {user ? (
//         <>
//           <div className="content">
//             <NavBar user={user} setUser={setUser} />
//             <SidePanel />
//             <div className="main-content">
//               <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/profile" element={<ProfilePage user={user} />} />
//                 <Route path="/book/:bookId" element={<BookDetailsPage user={user} />} />
//                 <Route path="/booklists" element={<BookListsPage />} />
//                 <Route path="/search" element={<BookSearch />} />
//               </Routes>
//             </div>
//           </div>
//         </>
//       ) : (
//         <Routes>
//           <Route path="/" element={<LandingPage setUser={handleUserSet} />} />
//           <Route path="/auth" element={<AuthPage setUser={handleUserSet} />} />
//           <Route path="/features" element={<FeaturePage />} />
//         </Routes>
//       )}
//     </main>
//   );
// }
