import React, { useState } from 'react';
// import '../../styles/EmployeeLogin.css';

const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submitted");
    console.log(username)
    console.log(password)
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
