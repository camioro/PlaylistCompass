const clientId = 'TU_CLIENT_ID_DE_SPOTIFY'; // Reemplaza con tu Client ID de Spotify
const redirectUri = 'https://tu-usuario.github.io/tu-proyecto/'; // Reemplaza con tu URL de GitHub Pages

function obtenerToken() {
    const scopes = 'playlist-read-private playlist-read-collaborative';
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location = url;
}

function obtenerPlaylists() {
    const params = new URLSearchParams(window.location.hash.replace('#', ''));
    const token = params.get('access_token');

    if (!token) {
        obtenerToken();
        return;
    }

    const usuario = document.getElementById('usuario').value;
    fetch(`https://api.spotify.com/v1/users/${usuario}/playlists`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const playlists = data.items.map(playlist => ({
                id: playlist.id,
                nombre: playlist.name
            }));

            let playlistHtml = '<h2>Playlists:</h2><ul>';
            playlists.forEach(playlist => {
                playlistHtml += `<li class="playlist">${playlist.nombre}</li>`;
            });
            playlistHtml += '</ul>';

            document.getElementById('playlists').innerHTML = playlistHtml;

            generarCuestionario(playlists);
        })
        .catch(error => {
            console.error('Error al obtener playlists:', error);
            alert('Error al obtener playlists');
        });
}

function generarCuestionario(playlists) {
    const preguntas = [
        "¿Qué género musical prefieres escuchar?",
        "¿Te gustan más las playlists con artistas variados o de un solo artista?",
        "¿Prefieres música en vivo o grabada en estudio?",
        "¿Cuál es tu estado de ánimo habitual al escuchar música?",
        "¿Te gustan las playlists temáticas (ej. para trabajar, hacer ejercicio)?",
        "¿Prefieres canciones nuevas o clásicas?",
        "¿Te gusta descubrir música nueva a través de playlists?",
        "¿Prefieres playlists largas o cortas?",
        "¿Qué tipo de música prefieres para relajarte?",
        "¿Te gustan las playlists colaborativas?",
        "¿Qué duración de canción prefieres?",
        "¿Te gustan las playlists que cuentan una historia o tienen un flujo?",
        "¿Prefieres música con letras o instrumental?",
        "¿Te gusta que las playlists tengan una mezcla de géneros?",
        "¿Qué importancia tiene para ti la portada de la playlist?"
    ];

    let questionnaireHtml = '<h2>Cuestionario:</h2>';
    preguntas.forEach((pregunta, index) => {
        questionnaireHtml += `
      <div class="question">
        <label>${pregunta}</label>
        <select id="pregunta-${index}">
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
          <option value="opcion4">Opción 4</option>
          <option value="opcion5">Opción 5</option>
        </select>
      </div>`;
    });

    questionnaireHtml += '<button type="button" onclick="recomendarPlaylist()">Recomendar Playlist</button>';

    document.getElementById('questionnaire').innerHTML = questionnaireHtml;
}

function recomendarPlaylist() {
    const respuestas = [];
    for (let i = 0; i < 15; i++) {
        const respuesta = document.getElementById(`pregunta-${i}`).value;
        respuestas.push(respuesta);
    }

    const resultadoHtml = `<h2>Resultados:</h2><p>Basado en tus respuestas, te recomendamos la playlist: <strong>Playlist Recomendada</strong></p>`;
    document.getElementById('resultado').innerHTML = resultadoHtml;
}
