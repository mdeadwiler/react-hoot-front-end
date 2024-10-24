import HootDetails from './components/HootDetails/HootDetails';
import HootList from './components/HootList/HootList';
import * as hootService from './components/services/hootService';
import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { signup, signin, signout, getUser } from "./components/services/authService.js"
import NavBar from "./components/NavBar/NavBar.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import SignupForm from "./components/SignupForm/SignupForm.jsx";
import SigninForm from "./components/SigninForm/SigninForm.jsx";
import "./App.css";

export const AuthedUserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [hoots, setHoots] = useState([]);

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

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout} />
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