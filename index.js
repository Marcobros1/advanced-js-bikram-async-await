// --- Soporte dual navegador / Node -------------------------------------------
// El ejercicio está pensado para el navegador (usa document), pero Node no tiene
// DOM. Si detectamos que corremos en Node (node index.js), ofrecemos un sustituto
// mínimo de document para que el archivo se ejecute entero. En el navegador este
// bloque no hace nada. fetch sí existe en Node 18+.
if (typeof document === "undefined") {
  const makeElement = () => ({
    append: () => {},
    addEventListener: () => {},
    innerHTML: "",
  });

  globalThis.document = {
    getElementById: () => makeElement(),
    createElement: () => makeElement(),
    addEventListener: (event, callback) => {
      if (event === "DOMContentLoaded") callback();
    },
  };
}
//1.- Declara una función getRandomPokemon que retorne un pokemon aleatorio.
// API: https://pokeapi.co/ -> GET https://pokeapi.co/api/v2/pokemon/{id}

async function getRandomPokemon() {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=2000`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    let data = await response.json();
    let random = data.results[Math.floor(Math.random() * data.results.length)];

    response = await fetch(random.url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    data = await response.json();

    console.log("1. Pokemon:", data);

    return data;
  } catch (error) {
    console.error(
      "No se pudo obtener una imagen de pokemon aleatoria:",
      error.message,
    );
  }
}

getRandomPokemon();

//2.- Declara una funcion getImageAndName que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name})

async function getImageAndName(pokemon) {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    let data = await response.json();
    let name = data.name;
    let img = data.sprites.front_default;

    console.log("2. Pokemon:", name);
    console.log("2. Pokemon:", img);
    return { name, img };
  } catch (error) {
    console.error(
      "No se pudo obtener una imagen de pokemon aleatoria:",
      error.message,
    );
  }
}

const pokemon = getImageAndName(2);

//3.- Declara una funcion printImageAndName que retorne el string necesario para pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma:
/*
<section>
    <img src="url de imagen" alt="nombre del pokemon">
    <h1>Nombre del pokemon</h1>
</section>
*/

async function printImageAndName(pokemon = 2) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    console.log("3. Pokemon nombre:", data.name);
    console.log("3. Pokemon imagen:", data.sprites.front_default);

    const img = data.sprites.front_default;
    const name = data.name;

    return `<section>
            <img src="${img}" alt="${name}">
            <h1>${name}</h1>
        </section>`;
  } catch (error) {
    console.error("No se pudo obtener el Pokemon:", error.message);
  }
}

printImageAndName(2);

//4.- Declara una función getRandomDogImage que retorne la url de la imagen de un perro aleatorio.
// API de perritos: https://dog.ceo/dog-api/

async function getRandomDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    console.log("4. Perro:", data);

    return data.message;
  } catch (error) {
    console.error(
      "No se pudo obtener una imagen de perro aleatoria:",
      error.message,
    );
  }
}

getRandomDogImage();

//5.- Declara una función getRandomPokemonImage que retorne la url de la imagen de un pokemon aleatorio.

async function getRandomPokemonImage() {
  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=2000`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    let data = await response.json();
    let random = data.results[Math.floor(Math.random() * data.results.length)];

    response = await fetch(random.url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    data = await response.json();

    let img =
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default;

    console.log("5. Pokemon:", img);
    return img;
  } catch (error) {
    console.error(
      "No se pudo obtener una imagen de pokemon aleatoria:",
      error.message,
    );
  }
}

const pokemon2 = getRandomPokemonImage(2);

//6.- Declara una función printPugVsPikachu que pinte la batalla entre "Pug" y "Pikachu" (no se testea)

async function printPugVsPikachu() {
  try {
    const response = await fetch("https://dog.ceo/api/breed/pug/images");

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    const { img: pikachu } = await getImageAndName(25);

    const DOM = `<section>
            <div>
                <img src="${data.message[0]}" alt="Imagen perro">
                <h1>Pug</h1>
            </div>
            <p>VS</p>
            <div>
                <img src="${pikachu}" alt="Imagen Pikachu">
                <h1>Pikachu</h1>
            </div>
        </section>`;
    // En Node no hay document.body (sustituto mínimo), así que ahí solo devolvemos.
    if (document.body) {
      document.body.insertAdjacentHTML("beforeend", DOM);
    }

    console.log("6. Batalla:", DOM);
    return DOM;
  } catch (error) {
    console.error(
      "No se pudieron obtener las imágenes de la batalla épica entre el Pug y Pikachu:",
      error.message,
    );
  }
}

printPugVsPikachu();

//7.- Declara una función getRandomCharacter que retorne un personaje aleatorio.
// API: https://rickandmortyapi.com/ -> GET https://rickandmortyapi.com/api/character/{id}

async function getRandomCharacter() {
  try {
    let response = await fetch(`https://rickandmortyapi.com/api/character/`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    let data = await response.json();
    let id = Math.floor(data.info.count * Math.random()) + 1;

    response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    data = await response.json();

    console.log("7. Personaje:", data);

    return data;
  } catch (error) {
    console.error(
      "No se pudo obtener una imagen de personaje aleatoria:",
      error.message,
    );
  }
}

getRandomCharacter();

//8.- Declara una función getRandomCharacterInfo que retorne de un personaje su imagen, nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos. Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})

async function getRandomCharacterInfo() {
  try {
    // Desestructuramos ya con las claves exactas que espera el test:
    // img, name, episodes.
    const { name, image: img, episode: episodes } = await getRandomCharacter();
    console.log("8. Nombre:", name);
    console.log("8. Imagen:", img);
    console.log("8. Episodes:", episodes);
    console.log("8. Primer episodio (url):", episodes[0]);

    // episodes[0] ya es la URL completa del episodio, no hay que montarla.
    const response = await fetch(episodes[0]);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    const firstEpisode = data.name;
    const dateEpisode = data.air_date;
    console.log("8. Primer episodio:", firstEpisode);
    console.log("8. Fecha estreno episodio:", dateEpisode);

    return { img, name, episodes, firstEpisode, dateEpisode };
  } catch (error) {
    console.error("No se pudo obtener la info del personaje: ", error.message);
  }
}

//9.- Pinta los anteriores datos en el DOM (no se testea)

async function printCharacterInfo() {
  const info = await getRandomCharacterInfo();

  if (!info || !document.body) return;

  const DOM = `<section>
        <div>
            <img src="${info.img}" alt="${info.name}">
            <h1>${info.name}</h1>
        </div>
        <p>Episodios (${info.episodes.length}):</p>
        <ul style="max-height: 150px; overflow: auto;">
            ${info.episodes
              .map(
                (url) =>
                  `<li><a href="${url}" target="_blank" rel="noopener">${url}</a></li>`,
              )
              .join("")}
        </ul>
        <p>Primer episodio: ${info.firstEpisode}</p>
        <p>Fecha de estreno: ${info.dateEpisode}</p>
    </section>`;

  document.body.insertAdjacentHTML("beforeend", DOM);
}

printCharacterInfo();


