import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter Email and Password");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password  
        }
      );
      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");
      navigate("/home");
    
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <div className="image-box">
        <img src="./images/DesktopLoginImage.svg" alt="Banner" />
        <span className="close">&times;</span>
      </div>

      <div className="content">
        <h2>Sign In</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Sign In</button>
        </form>

        <p className="new">
          New member? <a href="/signup">Create an Account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
