import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies,setMovies]=useState([]);

  async function movieHanlder() {
    
    const res = await fetch('https://swapi.dev/api/films/')
    const data = await res.json();

    const transfromMovies = data.results.map(mData => {
      return {
        id: mData.episode_id,
        title: mData.title,
        openingText: mData.opening_crawl,
        releaseDate: mData.release_Date
      }
    })
    setMovies(transfromMovies);
  }



  

  return (
    <React.Fragment>
      <section>
        <button onClick={movieHanlder}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
