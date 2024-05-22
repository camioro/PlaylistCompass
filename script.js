const clientId = '1fe145a390ff4b7a8491a5db45858b13'; // Client ID proporcionado
let token;

const redirectUri = 'https://camioro.github.io/PlaylistCompass/'; // URL proporcionado
const scopes = 'playlist-read-private playlist-read-collaborative';

// Función para obtener el token al cargar la página
function obtenerToken() {
  const hashParams = window.location.hash.substr(1).split('&');
  for (let i = 0; i < hashParams.length; i++) {
    const [key, value] = hashParams[i].split('=');
    if (key === 'access_token') {
      token = value;
      break;
    }
  }
}

// Función para obtener el ID de cliente y mostrar la foto de perfil del usuario
function obtenerIdCliente() {
  const usuario = document.getElementById('usuario').value;
  fetch(`https://api.spotify.com/v1/users/${usuario}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => response.json())
  .then(data => {
    const fotoPerfil = data.images.length > 0 ? data.images[0].url : 'https://via.placeholder.com/150';
    document.getElementById('fotoPerfil').src = fotoPerfil;
    obtenerPlaylists(usuario);
  })
  .catch(error => {
    console.error('Error al obtener ID de cliente:', error);
    alert('Error al obtener ID de cliente');
  });
}

// Función para obtener las playlists del usuario y mostrarlas en la página
function obtenerPlaylists(usuario) {
  fetch(`https://api.spotify.com/v1/users/${usuario}/playlists`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => response.json())
  .then(data => {
    const playlists = data.items.map(item => ({
      nombre: item.name,
      portada: item.images.length > 0 ? item.images[0].url : 'https://via.placeholder.com/150'
    }));
    mostrarPlaylists(playlists);
  })
  .catch(error => {
    console.error('Error al obtener playlists:', error);
    alert('Error al obtener playlists');
  });
}

// Función para mostrar las playlists en la página
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

// Obtener token al cargar la página
obtenerToken();
