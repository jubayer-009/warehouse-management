import React from 'react';
import loader from '../images/icons/loader.gif';

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={loader} alt="" />
    </div>
  );
};

export default Loading;