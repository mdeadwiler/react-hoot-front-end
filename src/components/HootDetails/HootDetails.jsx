import { AuthedUserContext } from "../../App";
import { useState, useEffect, useContext } from "react";
import CommentForm from '../CommentForm/CommentForm';




const HootDetails = props => {
  const [hoot, setHoot] = useState(null);
  const user = useContext(AuthedUserContext);

  const handleAddComment = async (commentFormData) => {
  const newComment = await hootService.createComment(hootId, commentFormData);
  setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
};


  
  
  
  return (
    <head>
  <>
<h2>Comments</h2>
    
<CommentForm handleAddComment={handleAddComment} />
</>
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

      {hoot.author._id === user._id && (
        <>
        <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>

        </>
      )}

    </head>
  );
};


export default HootDetails;