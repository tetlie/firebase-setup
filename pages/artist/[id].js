function ArtistPage({ id }) {
  return (
    <h1>Du er på side med id {id}</h1>
  )
}

// query inneholder info : url, historikk, annen info
ArtistPage.getInitialProps = async ({ query }) => {
  return {
    id: query.id
  };
};

export default ArtistPage;