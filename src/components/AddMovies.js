import React, { useRef } from "react";
import classes from "./AddMovies.module.css";

function AddMovies(props) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    //could add validation here....

    const NewMovieObj = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    console.log(NewMovieObj);
    props.onAddMovie(NewMovieObj);
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  };

  return (
    <div className={classes.form}>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Title</label>
        <input type="text"  id="title" ref={titleRef} /> <br /> <br />
        <label htmlFor="opening text">Opening Text</label>
        {/* <input type="text" className={classes.input}  ref={openingTextRef}/> <br /> <br /> */}
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
        <label htmlFor="date">Realising Date</label>
        <input type="number" ref={releaseDateRef} id="date" /> <br /> <br />
        <button className={classes.button} type="submit">
        Add Movie
      </button>
      </form>
    </div>
  );
}

export default AddMovies;