import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// import RunRace from './RunRace';
import Home from './Home';
import Header from './Header';
import Circuits from './Circuits';
import FullSeason from './FullSeason';
// import Quali from './Quali';
// import Grid from './Grid';
// import Results from './Results';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/circuits" element={<Circuits />} />
          <Route path="/season/:id" element={<FullSeason />} />
          {/* <Route path='/season/:id/:raceId/qualifying' element={<Quali />} />
          <Route path='/season/:id/:raceId/grid' element={<Grid />} />
          <Route path='/season/:id/:raceId/visualise' element={<RunRace />} />
          <Route path='/season/:id/:raceId/results' element={<Results />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
