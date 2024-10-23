import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App.jsx";

function NavBar({ handleSignout }) {
  const user = useContext(AuthedUserContext);

  const alwaysOption = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
    </>
  );

  const authorizedOptions = (
    <>
      <li>
        <Link to="" onClick={handleSignout}>
          Sign Out
        </Link>
      </li>
    </>
  );

  const unauthorizedOptions = (
    <>
      <li>
        <Link to="/signin">Sign In</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </>
  );

  return (
    <>
      <nav>
        <ul>
          {alwaysOption}
          {user ? authorizedOptions : unauthorizedOptions}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;