import React, { useState,useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  console.log("rendering")
  const [movies,setMovies]=useState([]);
  const [isLoading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  const [retryCount, setRetryCount] = useState(0);
  const [retryTimer, setRetryTimer] = useState(null);


  useEffect(() => {
    if (retryCount > 0) {
      // Start the retry timer
      const timer = setTimeout(fetchMoviesHandler, 5000);
      setRetryTimer(timer);
    }

    return () => {
      // Clear the retry timer on component unmount or when retryCount changes
      clearTimeout(retryTimer);
    };
  }, [retryCount]);

  async function fetchMoviesHandler() {
    
    
    setLoading(true)
    setError(null)
    try{
      const res = await fetch('https://swapi.dev/api/film/')
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
      setRetryCount(0);
     
    }
  
    catch(error){
      setError(error.message)
      setRetryCount((prevCount) => prevCount + 1);
    }
    setLoading(false)
  }



  function cancelRetryHandler() {
    clearTimeout(retryTimer);
    setRetryCount(0);
  }

  return (
    <React.Fragment>
     <section>
        <button onClick={fetchMoviesHandler} className="button">
          Fetch Movies
        </button>
        {retryCount > 0 && (
          <button onClick={cancelRetryHandler} className="button">
            Cancel Retry
          </button>
        )}
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
