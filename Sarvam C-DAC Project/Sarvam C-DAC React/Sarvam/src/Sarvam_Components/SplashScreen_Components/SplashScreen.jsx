import React from 'react';
import welcomeVideo from './welcome.mp4'; // Adjust the path accordingly

const SplashScreen = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    }}>
      <video
        src={welcomeVideo}
        autoPlay
        muted
        loop
        style={{
          width: '70%',
          /*maxWidth: '1000px',*/
          borderRadius: '10px',
        }}
      />
    </div>
  );
};

export default SplashScreen;
