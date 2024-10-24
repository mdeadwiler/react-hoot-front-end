import HootDetails from './components/HootDetails/HootDetails';
import HootList from './components/HootList/HootList';
import HootForm from './components/HootForm/HootForm.jsx';
import * as hootService from './components/services/hootService';
import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import signout from "./components/services/authService.js"
import NavBar from "./components/NavBar/NavBar.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import SignupForm from "./components/SignupForm/SignupForm.jsx";
import SigninForm from "./components/SigninForm/SigninForm.jsx";
import "./App.css";
export const AuthedUserContext = createContext(null);
//added delete to front end

function App() {
  const [user, setUser] = useState(null);
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      // setting state to hootsData
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);
  

  const handleSignout = () => {
    signout();
    setUser(null);
  };
//This is updated
const handleUpdateHoot = async (hootId, hootFormData) => {
  const updatedHoot = await hootService.update(hootId, hootFormData);

  setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));

  navigate(`/hoots/${hootId}`);
};
  //This is addHoot
const handleAddHoot = async (hootFormData) => {
  const newHoot = await hootService.create(hootFormData);
  setHoots([newHoot, ...hoots]);
  navigate('/hoots');
};

  //handle delete function
  const handleDeleteHoot = async hootId => {
    //////// console.log("hootId", hootId);
    const deletedHoot = await hootService.deletedHoot(hootId);
    ////////
    setHoots(hoots.filter(hoot => hoot._id !== deletedHoot._id));
    navigate("/hoots");
  };

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout} />

      <Routes>
        {user
          ? <Route path="/" element={<Dashboard />} />
          : <Route path="/" element={<Landing />} />}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />

        <Route
          path="/hoots/new"
          element={<HootForm handleAddHoot={handleAddHoot} />}
        />
        <Route
          path="/hoots/:hootId/edit"
          element={<HootForm handleUpdateHoot={handleUpdateHoot} />}
        />
        <Route path="/hoots/:hootsId" element={<HootDetails />} />
   
      <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot} />} />

        <Route
          path="/hoots/:hootId"
          element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
        />
    </Routes>

      <h1>Welcome to Hoot Hoot</h1>

<Routes>
  {user ? (
    // Protected Routes:
    <>
      <Route path="/" element={<Dashboard user={user} />} />
      <Route path="/hoots" element={<HootList />} />
      <Route path="/hoots/:hootId" element={<HootDetails />} />
    </>
  ) : (
    // Public Route:
    <Route path="/" element={<Landing />} />
  )}
  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
</Routes>

    </AuthedUserContext.Provider>
  );
}

export default App;
