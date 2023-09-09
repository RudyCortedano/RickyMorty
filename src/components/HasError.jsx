import React from 'react';
import BackgroundHome from '../spinner/BackgroundHome';

const HasError = () => {
  return (
    <div className='HasError'>
      <h2>❌ Hey! you must provide an id from 1 to 126 😭</h2>
      <BackgroundHome/>
    </div>
  );
};

export default HasError;