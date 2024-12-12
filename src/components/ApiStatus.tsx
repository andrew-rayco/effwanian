import React from 'react';
import Loading from '../components/Loading';
import Error from '../components/Error';

type ApiStatusProps = {
  isLoading: boolean;
  error: Error | null;
};

const ApiStatus: React.FC<ApiStatusProps> = ({ isLoading, error }) => {
  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="container-border">
        <Error message={error.message} />
      </div>
    );

  return null;
};

export default ApiStatus;
