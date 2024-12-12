import React from 'react';

const NoData = () => {
  return (
    <div className="no-data">
      <p>Sorry, there is no data arriving here.</p>
      <p>
        The event is either too old for the data to exist, or too new for this app that is manually updated by an ageing
        sloth-beast.
      </p>
      <p>Who knows, perhaps there was some sort of funky error, but it's probably the other thing.</p>
      <p>Either way, this doesn't seem to be working right now and I feel really bad about it.</p>
    </div>
  );
};

export default NoData;
