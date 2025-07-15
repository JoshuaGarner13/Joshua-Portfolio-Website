import { useState } from 'react';

export const useClickCounter = (threshold: number = 5) => {
  const [clicks, setClicks] = useState(0);
  const [activated, setActivated] = useState(false);

  const handleClick = () => {
    if (activated) return;
    
    setClicks(prev => {
      const newCount = prev + 1;
      if (newCount >= threshold) {
        setActivated(true);
        console.log('🎉 SECRET UNLOCKED! You found the click easter egg!');
        return 0;
      }
      return newCount;
    });
  };

  return { clicks, activated, handleClick, reset: () => { setClicks(0); setActivated(false); } };
};