import React, { useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  console.log("rendering")
  const [movies,setMovies]=useState([]);
  const [isLoading,setLoading]=useState(false)
  const[error,setError]=useState(null)


  const fetchMoviesHandler= useCallback( async ()=> {
    
    
    setLoading(true)
    setError(null)
    try{
      const res = await fetch('https://swapi.dev/api/films/')
      if(!res.ok){
        throw new Error("Something ent wrong")
      }
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
  
    catch(error){
      setError(error.message)
    }
    setLoading(false)
  },[])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
     <section>
        <button onClick={fetchMoviesHandler} className="button">
          Fetch Movies
        </button>
      </section>
      <section>
        { !isLoading && movies.length>0 && <MoviesList movies={movies} />}
        { !isLoading && movies.length===0 && !error && <p>No Movie Found</p> }
        {!isLoading && error && <p>{error}</p>}
        { isLoading && <p>Movie Loading..</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
