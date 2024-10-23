import { AuthedUserContext } from "../../App";
import { useState, useEffect, useContext } from "react";

const HootDetails = props => {
  const [hoot, setHoot] = useState(null);
  const user = useContext(AuthedUserContext);

  return (
    <head>
      <p>
        {hoot.category.toUpperCase()}
      </p>
      <h1>
        {hoot.title}
      </h1>
      <p>
        {hoot.author.username} posted on{" "}
        {new Date(hoot.createdAt).toLocaleDataString()}
      </p>

      {/* // Add the following code below the p tag */}

      {hoot.author._id === user._id && (
        <>
        <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>

        </>
      )}

    </head>
  );
};

export default HootDetails;