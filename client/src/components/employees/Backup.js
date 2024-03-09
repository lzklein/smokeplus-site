import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App';

const Backup = () => {
  const { API_BASE_URL, authorized } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleManualBackup = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mega-backup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Manual backup initiated successfully');
      } else {
        console.error('Error initiating manual backup:', response.statusText);
      }
    } catch (error) {
      console.error('Error initiating manual backup:', error);
    }
  };

  if (!authorized) {
    return (
      <div>
        <h1>ERROR</h1>
        <h1>Unauthorized User</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Backup</h1>
      <button className="backbutton" onClick={() => navigate(-1)}>
        {"<< Back"}
      </button>
      <h3>Backups are saved every Sunday at midnight</h3>
      <button onClick={handleManualBackup} className='loginbutton'>
        Manual backup
      </button>
    </div>
  );
};

export default Backup;
