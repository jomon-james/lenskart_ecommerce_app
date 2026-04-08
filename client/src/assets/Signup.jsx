import { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: firstName + " " + lastName,
          email: email,
          password: password
        }
      );

      alert("Registration Successful");
      window.location.href = "/login";

    } catch (err) {
      console.log(err);
      setError("Registration Failed ");
    }
  };

  return (
    <div className="sign-up">
      <div className="form-box">
        <h2>Create an account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Create an account</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
