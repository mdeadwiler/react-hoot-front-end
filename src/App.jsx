import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  signup,
  signin,
  signout,
  getUser,
} from "./components/services/authService.js";
import NavBar from "./components/NavBar/NavBar.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import SignupForm from "./components/SignupForm/SignupForm.jsx";
import SigninForm from "./components/SigninForm/SigninForm.jsx";
import HootDetails from "./components/HootDetails/HootDetails";

import "./App.css";

export const AuthedUserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  const handleSignout = () => {
    signout();
    setUser(null);
  };

const handleUpdateHoot = async (hootId, hootFormData) => {
  const updatedHoot = await hootService.update(hootId, hootFormData);

  setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));

  navigate(`/hoots/${hootId}`);
};


  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}
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
      </Routes>
    </AuthedUserContext.Provider>
  );
}

export default App;
