import firebaseInstance from '../config/firebase'

function ArtistList({ artists, error }) {
  return (
    <main>
      <h1>Mine favorittartister</h1>
      <ul>
        {artists.map(artist => {
          return (
            <li key={artist.id}>
              {JSON.stringify(artist)}
            </li>
          )
        })}
      </ul>
    </main>
  )
};

ArtistList.getInitialProps = async () => {

  try {
    const artistCollection = await firebaseInstance.firestore().collection('artists');
    const artistData = await artistCollection.get();

    let artists = [];
    artistData.forEach(artist => {
      artists.push({
        id: artist.id,
        ...artist.data()
      });
    });

    return { artists };
    
  } catch (error) {
    return {
      error: error.message
    };
  }
};

export default ArtistList;