import React from 'react';
import './Loader.css'; 

const Loader = ({ message = "Analizando imagen..." }) => {
  return (
    <div className="loader-container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loader-message font-black text-2xl mt-10 text-[#292E50] text-center">{message}</p>
    </div>
  );
};

export default Loader;