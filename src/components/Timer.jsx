import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(900); // 10 minutes timer

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => setSeconds(seconds - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      // You can auto-submit the test when time runs out
      alert('Time is up! Submitting the test...');
      window.location.reload(); // For simplicity, reloads to restart the test
    }
  }, [seconds]);

  return (
    <div>
      <h2>Time Remaining: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}{seconds % 60}</h2>
    </div>
  );
};

export default Timer;
