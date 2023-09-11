import React from 'react';
import BackgroundHome from '../spinner/BackgroundHome';

const HasError = () => {
  return (
    <div className='HasError'>
      <h2>❌ No response was found to your request. 😭</h2>
      <BackgroundHome/>
      <div className="btn__HasError">
        <a className='btn__exit' href="/">back</a>
      </div>
    </div>
  );
};

export default HasError;
