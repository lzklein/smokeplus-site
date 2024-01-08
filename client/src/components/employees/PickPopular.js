import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../App';

const PickPopular = () => {
    const { sessionId, API_BASE_URL, authorized } = useContext(SessionContext);

    if(!authorized){
        return(
          <div>
            <h1>
              ERROR
            </h1>
            <h1>Unauthorized User</h1>
          </div>
        )
      }

    return (
    <div>PickPopular</div>
    )
}

export default PickPopular