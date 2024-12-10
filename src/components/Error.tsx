import React from 'react';

type ErrorProps = {
  message: string;
};

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="load-error">
      <p>
        There was some sort of problem.
        <br />
        Maybe try again but it's not looking good. Sorry about that.
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Error;
