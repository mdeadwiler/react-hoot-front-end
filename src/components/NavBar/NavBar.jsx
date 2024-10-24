import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App.jsx";

function NavBar({ handleSignout }) {
  const user = useContext(AuthedUserContext);

 
    



  const authorizedOptions = (
    <ul>
      <li><Link to='/'>HOME</Link></li>
      <li><Link to='/hoots'>HOOTS</Link></li>
      <Link to="/hoots/new">NEW HOOT</Link>
      <li><Link to='' onClick={handleSignout}>SIGN OUT</Link></li>
    </ul>
  );

  const unauthorizedOptions = (
    <ul>
      <li><Link to="/signin">Sign In</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
    </ul>
  );

  return (
    <nav>
      {user ? authorizedOptions : unauthorizedOptions}
    </nav>
  );
}

export default NavBar;
