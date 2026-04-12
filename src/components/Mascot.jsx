import React from 'react';

const Mascot = ({ size = 'medium', emotion = 'happy' }) => {
  const sizes = {
    small: '24px',
    medium: '64px',
    large: '120px'
  };

  const emotions = {
    happy: '😊',
    thinking: '🤔',
    celebrate: '🎉',
    sad: '😞',
  };

  const style = {
    fontSize: sizes[size] || sizes.medium,
    lineHeight: 1,
    display: 'inline-block',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    // Removed continuous animation to favor minimal, soft animations
  };

  return (
    <div style={style} className="mascot fadeIn">
      {emotions[emotion] || emotions.happy}
    </div>
  );
};

export default Mascot;
