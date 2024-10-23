import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import {
  signup,
  signin,
  signout,
  getUser
} from "./components/services/authService.js";
import NavBar from "./components/NavBar/NavBar.jsx";
import Landing from "./components/Landing/Landing.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import SignupForm from "./components/SignupForm/SignupForm.jsx";
import SigninForm from "./components/SigninForm/SigninForm.jsx";
import HootDetails from "./components/HootDetails/HootDetails.jsx";
import "./App.css";
export const AuthedUserContext = createContext(null);
//added delete  
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  const handleSignout = () => {
    signout();
    setUser(null);
  };

  ///handle delete function
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
          path="/hoots/:hootId"
          element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
        />
      </Routes>
    </AuthedUserContext.Provider>
  );
}

export default App;
