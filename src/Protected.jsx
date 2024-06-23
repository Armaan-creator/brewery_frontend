import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Utility function to get item with expiry
const getItemWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getItemWithExpiry('userId');
    if (!userId) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
