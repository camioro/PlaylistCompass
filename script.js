const clientId = '1fe145a390ff4b7a8491a5db45858b13'; // Client ID proporcionado

const redirectUri = 'https://camioro.github.io/PlaylistCompass/'; // URL proporcionado
const scopes = 'playlist-read-private playlist-read-collaborative';
const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

function obtenerIdCliente() {
  const usuario = document.getElementById('usuario').value;
  fetch(`https://api.spotify.com/v1/users/${usuario}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => response.json())
  .then(data => {
    const clientId = data.client_id;
    obtenerToken(clientId);
    mostrarFotoPerfil(usuario);
  })
  .catch(error => {
    console.error('Error al obtener ID de cliente:', error);
    alert('Error al obtener ID de cliente');
  });
}

function obtenerToken(clientId) {
  const authorizeUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location = authorizeUrl;
}

function mostrarFotoPerfil(usuario) {
  fetch(`https://api.spotify.com/v1/users/${usuario}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => response.json())
  .then(data => {
    const fotoPerfil = data.images[0].url;
    document.getElementById('fotoPerfil').src = fotoPerfil;
  })
  .catch(error => {
    console.error('Error al obtener la foto de perfil:', error);
    alert('Error al obtener la foto de perfil');
  });
}

function mostrarPlaylists(playlists) {
  let playlistHtml = '<h2>Playlists:</h2>';
  playlists.forEach(playlist => {
    playlistHtml += `
      <div class="playlist">
        <img src="${playlist.portada}" alt="${playlist.nombre}">
        <h3>${playlist.nombre}</h3>
      </div>`;
  });
  document.getElementById('playlists').innerHTML = playlistHtml;
}

// Resto del código...
