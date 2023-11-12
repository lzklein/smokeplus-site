import React, { useState } from 'react';
// import '../../styles/EmployeeLogin.css';

const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5555/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });      

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login">
        <div>
          <label htmlFor="username">Username</label>
          <br />

          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            style={{margin:"10px"}}
            className="rounded-md border py-1.5 pl-7 pr-20"
            placeholder="username"
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            style={{margin:"10px"}}
            className="rounded-md border py-1.5 pl-7 pr-20"
            placeholder="password"
          />
                  <br />

          <label>
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />{" "}
            Show Password
          </label>
        </div>
        <br />
        <div>
        <button
          type="submit"
          className="logbutton"
        >
          Sign in
        </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeLogin;
