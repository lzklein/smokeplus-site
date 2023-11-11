import React, { useState } from 'react';

const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    setUsername('');
    setPassword('');
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
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 !"
        >
          Sign in
        </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeLogin;
