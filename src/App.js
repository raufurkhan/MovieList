import React, { useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovies from './components/AddMovies';

function App() {
  console.log("rendering")
  const [movies,setMovies]=useState([]);
  const [isLoading,setLoading]=useState(false)
  const[error,setError]=useState(null)

  function addMovieHandler(movie){
    console.log(movie);
  }

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


  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading....</p>;
  }




  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={addMovieHandler} />
      </section>
     <section>
        <button onClick={fetchMoviesHandler} className="button">
          Fetch Movies
        </button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
