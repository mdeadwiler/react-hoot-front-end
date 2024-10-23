// src/components/HootDetails/HootDetails.jsx
import { Link } from 'react-router-dom';

{hoot.author._id === user._id && (
    <>
    <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
    <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>
    </>
)}