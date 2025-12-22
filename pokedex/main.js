const listaPokemon = document.querySelector("#listaPokemon")
const botonesHeader = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/"
let allPokemon = []
const inputSearch = document.querySelector(".search")
const overlay = document.querySelector(".overlay")
const detailCard = document.querySelector(".detail-card")


const fetches = []
for (let i = 1; i <= 151; i++) {
    fetches.push(fetch(URL + i).then((response) => response.json()))
}

Promise.all(fetches)
    .then(results => {
        allPokemon = results;              // guardo todos los objetos
        renderPokemonList(allPokemon);     // muestro todos al terminar de cargar
    })
    .catch(err => console.error("Error al cargar pokes:", err));



/* --------- 2) Función para renderizar UN pokemon --------- */
function renderPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    tipos = tipos.join('')

    let pokeId = poke.id.toString()
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId
    }

    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-img">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${poke.height}m</p>
            <p class="stat">${poke.weight}Kg</p>
        </div>
    </div>
    `
    div.addEventListener("click", () => mostrarDetalle(poke))
    return div
}


/* --------- 3) Función para renderizar UNA LISTA de pokemon --------- */
function renderPokemonList(array) {
    listaPokemon.innerHTML = ""
    if (!Array.isArray(array) || array.length === 0) {
        listaPokemon.innerHTML = "<p>No se encontraron Pokémon</p>";
        return;
    }
    const fragment = document.createDocumentFragment();
    array.forEach(poke => {
        fragment.appendChild(renderPokemon(poke));
    });
    listaPokemon.appendChild(fragment);
}

/* --------- 4) Búsqueda en vivo por nombre --------- */

inputSearch.addEventListener("input", (event) => {
    const searchName = event.target.value.trim().toLowerCase();

    if (searchName === "") {
        renderPokemonList(allPokemon);
        return;
    }

    const arrayFiltrado = allPokemon.filter(poke =>
        poke.name.toLowerCase().startsWith(searchName)
    );

    renderPokemonList(arrayFiltrado);
});

/* --------- 5) Filtrado por botones (sin volver a fetch) --------- */

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id; // ej 'fire', 'water', 'ver-todos'

    if (botonId === "ver-todos") {
        renderPokemonList(allPokemon);
        return;
    }

    const filtrados = allPokemon.filter(poke => {
        const tipos = poke.types.map(t => t.type.name);
        return tipos.includes(botonId);
    });

    renderPokemonList(filtrados);
}));


function mostrarDetalle(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    tipos = tipos.join('')
    let stats = poke.stats.map((stat) => `<p class="${stat.stat.name} tipo">${stat.stat.name}</p>`)
    stats = stats.join('')
    let baseStat = poke.stats.map((statNr) => `<p class="${statNr.base_stat} tipo">${statNr.base_stat}</p>`)
    baseStat = baseStat.join('')
    let abilities = poke.abilities.map((ability) => `<p class="${ability.ability.name} tipo">${ability.ability.name}</p>`)
    abilities = abilities.join('')

    let pokeId = poke.id.toString()
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId
    }

    detailCard.innerHTML = `
    
    <h1 id="name">${poke.name}</h1>
    <h3 id="id">#${pokeId}</h3>
    <div class="detail-panel-content">
        <div class="detail-header">
            <div class="header-right">
                <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
            </div>
            <div class="header-left">
                <div class="types">
                    ${tipos}
                </div>
                <div class="stats">
                    <span class ="stat-detail">${stats}</span><span class="stat-bar"> ${baseStat}</span>
                </div>
                <div class="poke-minutia">
                    <p class="stat">${poke.height}m</p>
                    <p class="stat">${poke.weight}Kg</p>
                    <div class="abilities">
                    ${abilities}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    overlay.style.display = "flex";
}

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none";
    }
});

