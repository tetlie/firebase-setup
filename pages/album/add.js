import firebaseInstance from '../../config/firebase'
import { useState } from 'react'
import InputBlock from '../../components/InputBlock'

function AddAlbum () {

  const [title, setTitle] = useState(null)
  const [artist, setArtist] = useState(null)
  const [rating, setRating] = useState(null)
  const [year, setYear] = useState(null)

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleArtistChange(event) {
    setArtist(event.target.value);
  }
  function handleRatingChange(event) {
    setRating(event.target.value);
  }
  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // evt. valider her
    const collection = firebaseInstance.firestore().collection('albums');
    collection.doc().set({ // tom .doc() — lager id for deg 
      title: title,
      artist: artist,
      released: year,
      rating: rating
    })
      .then(() => {
        console.log('Lagt til') // state, grensesnittet endrer seg, brukeren kan legge til mer, eller send brukeren videre
      })
      .catch(error => {
        console.log(error)
      });
  }

  return(
    <main>

      <h1>Legg til album</h1>

      <form
        name='add-album'
        id='add-album'
        action='/'
        method='GET'
        onSubmit={event => handleSubmit(event)}
      >

        <InputBlock 
          inputName='title'
          inputId='title'
          inputType='text'
          inputPlaceholder='Albumets tittel'
          labelText='Tittel'
          inputChangeHandler={event => handleTitleChange(event)}
        />

        <InputBlock 
          inputName='artist'
          inputId='artist'
          inputType='text'
          inputPlaceholder='Albumets artist'
          labelText='Artist name'
          inputChangeHandler={event => handleArtistChange(event)}
        />

        <InputBlock 
          inputName='year'
          inputId='year'
          inputType='number'
          labelText='Utgivelsesår'
          inputChangeHandler={event => handleYearChange(event)}
        />

        <InputBlock 
          inputName='rating'
          inputId='rating'
          inputType='number'
          labelText='Karakter'
          inputChangeHandler={event => handleRatingChange(event)}
        />

        <button type='submit'>Legg til</button>

      </form>
    </main>
  )
}

export default AddAlbum;