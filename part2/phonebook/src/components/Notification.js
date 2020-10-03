import React from 'react';

const Notification = ({ msg }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        border: '2px solid #18b566',
        background: 'ebebeb',
        padding: '0 1rem',
        margin: '.5rem 0',
      }}
    >
      <h3>{msg}</h3>
    </div>
  );
};

export default Notification;
