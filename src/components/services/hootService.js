//running app locally we're at localhost:3000/hoots
const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`;

//Index functionality

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        //headers so middleware verifyToken will let us access protected routes
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
//authorization header for service function
const show = async (hootId) => {
    try {
      const res = await fetch(`${BASE_URL}/${hootId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  export { index, show };
  