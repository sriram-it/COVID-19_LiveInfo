import React from 'react';
import './App.css';
import GlobalCounter from './Component/GlobalCount/GlobalCount.js';
import GlobalDailyChart from './Component/GlobalDailyChart/GlobalDailyChart.js'
import AllCountriesStatistics from './Component/AllCountriesStatistics/AllCountriesStatistics.js'

function App() {
  return (
    <div className="App">
     {/* Title
      Global Count
      Global Data Line Graph
     Country Wise Spinner and Country data*/}
      {/* <div>
        <h1>COVID-19</h1>
        <h3>live data</h3>
      </div> */}
      <GlobalCounter name="confirmed" count="1234" />
      <GlobalDailyChart/>
      <AllCountriesStatistics/>
    </div>
  );
}

export default App;
