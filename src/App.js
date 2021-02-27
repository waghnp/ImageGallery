import React from 'react';
import './App.css';
import SearchAppBar from './Screens/SearchAppBarScreen';
import ImgMediaCard from './Screens/ImgMediaCardScreen';

function App() {
  return (
    <div className="App">
        <SearchAppBar/>
        <ImgMediaCard/>
    </div>
  );
}

export default App;
