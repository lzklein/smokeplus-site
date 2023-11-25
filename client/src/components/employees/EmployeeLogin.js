import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [failCount, setFailCount] = useState(0);
  const navigate = useNavigate();

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
        setErrorMessage('');
        const data = await response.json();
        navigate('/employee');
        setFailCount(0)
      } else {
        console.error('Login failed:', response.statusText);
        setErrorMessage('Login Info Incorrect');
        setFailCount(failCount+1)
        console.log(failCount)
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Oops, no one should see this. Bug Alert');
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
            onChange={(e) => setUsername(e.target.value)}
            style={{
              margin: '10px',
              borderColor: errorMessage ? 'red' : 'initial',
            }}
            className="rounded-md border py-1.5 pl-7 pr-20"
            placeholder="username"
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              margin: '10px',
              borderColor: errorMessage ? 'red' : 'initial',
            }}
            className="rounded-md border py-1.5 pl-7 pr-20"
            placeholder="password"
          />
          <br />
          <label>
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />{' '}
            Show Password
          </label>
        </div>
        <br />
        <div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {failCount > 4 ? <p style={{ color: 'red' }}>You suck</p>:null}
          <button type="submit" className="logbutton">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeLogin;
