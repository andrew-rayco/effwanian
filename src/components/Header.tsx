import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  let path = location.pathname.substr(1).split('/');
  let seasonUrl;

  // if (path.indexOf('visualise') >= 0) {
  //   seasonUrl = '/#/season/' + path[1];
  // }

  return (
    <div className='header'>
      <nav>
        {seasonUrl ? (
          <a id='home-link' href={seasonUrl}>
            Back to {path[1]} season
          </a>
        ) : null}
      </nav>
      <h1>
        <a className='main-header' href='/#/'>
          F1ian
        </a>
      </h1>
    </div>
  );
};

export default Header;
