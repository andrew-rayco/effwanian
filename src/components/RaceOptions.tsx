import React, { useState } from 'react';
import moment from 'moment';
import { Race } from '../types/api';

// import Grid from './Grid';
import Quali from './Quali';
// import Results from './Results';

type RaceOptionsProps = {
  race: Race;
  initialVisibility: { visibility: string };
  intro?: string;
};

const RaceOptions = ({ race, initialVisibility, intro }: RaceOptionsProps) => {
  const [visibility, setVisibility] = useState({
    gridVisible: false,
    qualiVisible: false,
    resultsVisible: false,
  });

  const toggleHidden = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    elementToToggle: string
  ) => {
    e.preventDefault();
    let raceDetails = document.getElementById(elementToToggle);
    let raceSection = document.getElementsByClassName(race.round)[0];
    raceDetails?.classList.toggle('hidden');
    raceSection.classList.toggle('selected');
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    visibleProperty: 'gridVisible' | 'qualiVisible' | 'resultsVisible'
  ) => {
    e.preventDefault();
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [visibleProperty]: !prevVisibility[visibleProperty],
    }));
    (e.target as HTMLElement).classList.toggle('toggle-open');
  };

  // visualise(race) {
  //   return (
  //     <p>
  //       <a href={`/#/season/${race.season}/${race.round}/visualise`}>Visualise</a>
  //     </p>
  //   );
  // }

  // Some races in the distant future may not yet have a race.time. Faking it in the meantime.
  const raceDate = new Date(race.date + ' ' + (race.time || '23:10:00Z'));
  const todayDate = new Date();

  // Check if race is in past or future. If future, disable selection
  if (raceDate > todayDate) {
    return (
      <div key={race.round} className="row single-round">
        <div className={`twelve columns round ${race.round}`}>
          {/* <h4 className="muted">{`${race.round} - ${race.raceName || race.name}`}</h4> Why is there a race.name fallback here? */}
          <h4 className="muted">{`${race.round} - ${race.raceName}`}</h4>
          <p className="muted sub-text-date">{moment(race.date).format('MMMM Do YYYY')}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div key={race.round} className="row single-round">
        <div className={`twelve columns round ${race.round}`}>
          <h4 onClick={(e) => toggleHidden(e, race.round)}>
            <button className="race-title">
              {intro ? `${intro} the ${race.season} ${race.raceName}` : `${race.round} - ${race.raceName}`}
            </button>
          </h4>
          <div id={race.round} className={`toggle hidden`}>
            <p>{moment(race.date).format('MMMM Do YYYY')}</p>
            <p>
              <button onClick={(e) => handleClick(e, 'qualiVisible')} className="button-link">
                Qualifying results <img className="toggle-icon" src="../images/down-arrow.svg" alt="read more icon" />
              </button>
            </p>

            {visibility.qualiVisible ? <Quali season={race.season || race.season} round={race.round} /> : null}

            <p>
              <button onClick={(e) => handleClick(e, 'gridVisible')} className="button-link">
                Starting grid <img className="toggle-icon" src="../images/down-arrow.svg" alt="read more icon" />
              </button>
            </p>

            {/* {visibility.gridVisible ? <Grid season={race.year || race.season} round={race.round} /> : null} */}
            {visibility.gridVisible ? <div>GRID visible</div> : null}

            {/* Long wait fetching laptimes from Ergast API. Disable feature for now */}
            {/* {this.props.intro ? null : this.visualise(race)} */}

            <p>
              <button onClick={(e) => handleClick(e, 'resultsVisible')} className="button-link">
                Results <img className="toggle-icon" src="../images/down-arrow.svg" alt="read more icon" />
              </button>
            </p>

            {/* {visibility.resultsVisible ? (
              <Results season={race.year || race.season} round={race.round} raceName={race.raceName} />
            ) : null} */}
            {visibility.resultsVisible ? <div>RESULTS visible</div> : null}

            <p>
              <a href={race.url}>
                {race.season} {race.raceName} on Wikipedia
              </a>
            </p>
            <div className="separator" />
          </div>
        </div>
      </div>
    );
  }
};

export default RaceOptions;
