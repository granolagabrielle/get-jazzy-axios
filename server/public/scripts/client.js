function onReady() {
  console.log('Hello from client.js');

  // TODO Add Axios request for /songs and display on DOM
  fetchSongs();
  fetchArtistList();
}

onReady();

// function to fetch artist list
function fetchArtistList() {
  axios({
    method: 'GET',
    url: '/artist',
  })
    .then(function (response) {
      // Code that will run on successful response
      // from the server.
      console.log(response);
      // quotesFromServer will be an Array of quotes
      let quotesFromServer = response.data;
      let contentDiv = document.getElementById('artistTableBody');
      for (let artist of quotesFromServer) {
        contentDiv.innerHTML += `
                    <tr>
                        <td>${artist.name}</td>
                        <td>${artist.born}</td>
                        <td>${artist.died}</td>
                    </tr>
                `;
      }
    })
    .catch(function (error) {
      // Code that will run on any errors from the server.
      console.log(error);
      alert('Something bad happened! Check the console for more details.');
    });
}

// function to reload song list
function fetchSongs() {
  axios({
    method: 'GET',
    url: '/song',
  }).then(function (response) {
    console.log(response);
    let songsFromServer = response.data;
    let songTable = document.getElementById('songTableBody');
    for (let artist of songsFromServer) {
      songTable.innerHTML += `
            <tr>
                <td>${artist.title}</td>
                <td>${artist.artist}</td>
            </tr>
            `;
    }
  });
}

// function to add new artist
function addArtist() {
  const artist = document.getElementById('name').value;
  const born = document.getElementById('born').value;
  const died = document.getElementById('died').value;

  axios({
    method: 'GET',
    url: '/artist',
    data: {
      artist: artist,
      born: born,
      died: died,
    },
  })
    .then(function (response) {
      fetchArtistList();
      document.getElementById('name').value = '';
      document.getElementById('born').value = '';
      document.getElementById('died').value = '';
    })
    .catch(function (error) {
      console.error(`Error POSTing artist:`, error);
    });
}
