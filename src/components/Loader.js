import React from 'react';
import "./loader.css";

const Loader = () => {
  return (
    <div className='py-[40vh] flex justify-center items-center'>
      <div id="container">
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="h3">loading</div>
      </div>
    </div>
  )
}

export default Loader;