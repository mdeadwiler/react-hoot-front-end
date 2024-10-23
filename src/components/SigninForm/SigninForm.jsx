import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from "../services/authService.js";

function SigninForm({ setUser }) {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateMessage("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await signin(formData);
      setUser(userData);
      navigate("/");
    } catch (error) {
      updateMessage(error.message);
    }
  };

  return (
    <main>
      <h1>Log In</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Log In</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default SigninForm;