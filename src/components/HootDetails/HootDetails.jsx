import CommentForm from '../CommentForm/CommentForm';


const handleAddComment = async (commentFormData) => {
  const newComment = await hootService.createComment(hootId, commentFormData);
  setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
};

<CommentForm handleAddComment={handleAddComment} />


return (
<>
<h2>Comments</h2>
<CommentForm />
/</>
)