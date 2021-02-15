import firebaseInstance from '../config/firebase'

function albumList({ albums, error }) {
  return (
    <main>
      <h1>Mine favorittalbumer</h1>
      <ul>
        {albums.map(album => {
          return (
            <li key={album.id}>
              {JSON.stringify(album)}
            </li>
          )
        })}
      </ul>
    </main>
  )
};

albumList.getInitialProps = async () => {

  try {
    const albumCollection = await firebaseInstance.firestore().collection('albums');
    const albumData = await albumCollection.get();

    let albums = [];
    albumData.forEach(album => {
      albums.push({
        id: album.id,
        ...album.data()
      });
    });

    return { albums };
    
  } catch (error) {
    return {
      error: error.message
    };
  }
};

export default albumList;