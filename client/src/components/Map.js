import React from 'react';
import map from '../map.png';

const Map = () => {
  return (
    <div>
      <a href="https://www.google.com/maps/dir//SMOKE+PLUS,+1222+Bronson+Way+N+UNIT+110,+Renton,+WA+98057/@47.4834672,-122.2039636,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x54906801b0adccd3:0x1a5833d1f30e5aa8!2m2!1d-122.201274!2d47.4834422!3e0?entry=ttu" target="_blank">
        <img src={map} alt="Store Location" className="map-png" />
      </a>

    </div>
  );
}

export default Map;
