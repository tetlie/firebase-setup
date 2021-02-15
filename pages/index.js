import firebaseInstance from '../config/firebase'

export default function Home({ artist, error }) {
  if (error !== undefined) {
    return (
      <p>En feil har oppstått: {error}</p>
    )
  }
  return (
    <>
    <pre>
      <code>{JSON.stringify(artist, null, 2)}</code>
    </pre>
    </>
  )

}

// async - skal være ferdig før komponenten rendres
// alt som må være klart fra serveren
// skal etter hvert inn som miljøvariabler
Home.getInitialProps = async () => {
  
  try { // gjør en spørring mot databasen

    const collection = await firebaseInstance.firestore().collection('artists'); // sett opp en samling dokumenter
    const document  = await collection.doc('p3VE4yA55pO2VBeM3FxQ').get(); //.get = selve dokumentet slik det ser ut nå
    if (document.exists !== true) { // dersom det ikke finnes, kast en feil
      throw new Error('Dokumentet finnes ikke')
    };

    const artist = { // dersom det finnes
      id: document.id,
      ...document.data() // .data() returnere alle datatene som ligger i dokumentet på dette tidspunktet
    };

    return { artist };

  } catch (error) {
    return { // dersom det oppstår en feil, lagre dette i en feilmelding som kan brukes i komponenten
      error: error.message
    };
  }

};