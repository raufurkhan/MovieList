import React, { useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovies from './components/AddMovies';

function App() {
  console.log("rendering")
  const [movies,setMovies]=useState([]);
  const [isLoading,setLoading]=useState(false)
  const[error,setError]=useState(null)

  async function addMovieHandler(movie) {
    const res = await fetch('https://react-api99-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        //it is not required bvut good practice to aware your backend about data u r sending
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    console.log(data);
  }

  async function deleteMovieHandler(movieId) {
    try {
      const res = await fetch(`https://react-api99-default-rtdb.firebaseio.com/movies/${movieId}.json`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Delete request failed.');
      }

      // Filter out the deleted movie from the local state
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
    } catch (error) {
      setError(error.message);
    }
  }


  const fetchMoviesHandler= useCallback( async ()=> {
    
    
    setLoading(true)
    setError(null)
    try{
      const res = await fetch('https://react-api99-default-rtdb.firebaseio.com/movies.json');
      if(!res.ok){
        throw new Error("Something ent wrong")
      }
      const data = await res.json();
  
      const loadMovies = [];
      for (const key in data) {
        loadMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }
      setMovies(loadMovies);
     
     
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
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;
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
