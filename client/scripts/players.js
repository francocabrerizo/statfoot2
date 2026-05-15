const PLAYERS_DATA = [
  { nombre: "R. Lewandowski", club: "FC Barcelona",    posicion: "ST",  pj: 34, goles: 27, asistencias: 8,  rating: 7.8 },
  { nombre: "K. Mbappé",      club: "Real Madrid",     posicion: "LW",  pj: 33, goles: 24, asistencias: 11, rating: 8.1 },
  { nombre: "A. Griezmann",   club: "Atlético Madrid", posicion: "CAM", pj: 34, goles: 19, asistencias: 14, rating: 7.9 },
  { nombre: "P. Gavi",        club: "FC Barcelona",    posicion: "CM",  pj: 30, goles: 6,  asistencias: 12, rating: 7.5 },
  { nombre: "T. Kroos",       club: "Real Madrid",     posicion: "CDM", pj: 29, goles: 4,  asistencias: 16, rating: 7.7 },
  { nombre: "M. ter Stegen",  club: "FC Barcelona",    posicion: "GK",  pj: 32, goles: 0,  asistencias: 0,  rating: 7.4 },
  { nombre: "R. Araújo",      club: "FC Barcelona",    posicion: "CB",  pj: 30, goles: 3,  asistencias: 1,  rating: 7.6 },
  { nombre: "M. Oyarzabal",   club: "Real Sociedad",   posicion: "LW",  pj: 34, goles: 17, asistencias: 9,  rating: 7.9 },
];

const POSITION_GROUPS = {
  DEF: ["CB", "LB", "RB"],
  MID: ["CMD", "CM", "CAM"],
  FWD: ["ST", "LW", "RW"],
  GK: ["GK"],
}

const searchInput = document.getElementById("search-player");
const positionSelect = document.getElementById("filter-position");
const clubSelect = document.getElementById("filter-club");
const tbody = document.getElementById("players-tbody");

const buildRow = (player) => {
  return `
    <tr>
      <td class="td-name">
        <a href="player-profile.html">${player.nombre}</a>
      </td>
      <td>${player.club}</td>
      <td><span class="badge badge-pos">${player.posicion}</span></td>
      <td>${player.pj}</td>
      <td>${player.goles}</td>
      <td>${player.asistencias}</td>
      <td>${player.rating}</td>
    </tr>
  `;
};

const renderPlayers = (players) => {
  if (players.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 32px; color: var(--color-text-secondary)">
          No se encontraron jugadores
        </td>
      </tr>
    `;
    return;}

    tbody.innerHTML = players.map(buildRow).join("");
};


const filterPlayers = () => {
  const textoBusqueda = searchInput.value.toLowerCase().trim();
  const posicionSeleccionada = positionSelect.value;

  const resultado = PLAYERS_DATA.filter(player => {

    // ¿El nombre contiene el texto buscado?
    const coincideNombre = player.nombre.toLowerCase().includes(textoBusqueda);

    // ¿La posición coincide? (si no hay filtro, pasan todos)
    const coincidePosicion =
      posicionSeleccionada === "" ||
      (POSITION_GROUPS[posicionSeleccionada] || []).includes(player.posicion);

    const coincideClub =
      clubSelect.value === "" || player.club === clubSelect.value;

    // El jugador pasa el filtro solo si AMBAS condiciones son true
    return coincideNombre && coincidePosicion && coincideClub;
  });

  renderPlayers(resultado);
};

searchInput.addEventListener("input", filterPlayers);
positionSelect.addEventListener("change", filterPlayers);
clubSelect.addEventListener("change", filterPlayers);

renderPlayers(PLAYERS_DATA);