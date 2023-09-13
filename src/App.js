import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  console.log("rendering")
  const [movies,setMovies]=useState([]);
  const [isLoading,setLoading]=useState(false)
  async function movieHanlder() {
    
    
    setLoading(true)
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
    setLoading(false)
  }



  

  return (
    <React.Fragment>
      <section>
        <button onClick={movieHanlder}>Fetch Movies</button>
      </section>
      <section>
        { !isLoading && movies.length>0 && <MoviesList movies={movies} />}
        { !isLoading && movies.length===0 && <p>No Movie Found</p> }
        { isLoading && <p>Movie Loading..</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
