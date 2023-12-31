/** @type {import('./$types').PageLoad} */
import test from "node:test";
import assert from "node:assert";
export async function load() {
  const API_URL = "https://tormenta-codigo-app-terrible.vercel.app/api/podcast";
  const API_TERRIBLE =
    "https://tormenta-codigo-app-terrible.vercel.app/api/podcast/terrible";

  let invalidsKeys = [];
  let missingKeys = [];
  let deletePodcasts = 0;
//   let noTypeNumber = 0;
  let errorMessage = "Hemos encontrado los siguientes errores: ";
  const correctKeys = [
    "number",
    "title",
    "excerpt",
    "published_at",
    "duration",
    "id",
  ];

  function validateObjectKeys(obj) {
    const objectKeys = Object.keys(obj);

    for (const key of objectKeys) {
      if (!correctKeys.includes(key)) {
        return key; // Devuelve la clave incorrecta encontrada
      }
    }
    return null; // Si todas las claves coinciden, devuelve null
  }

  function missingObjectKeys(obj) {
    const objectKeys = Object.keys(obj);

    for (const key of correctKeys) {
      if (!objectKeys.includes(key)) {
        return key; // Devuelve la clave que falta en el objeto
      }
    }

    return null; // Si todas las claves coinciden, devuelve null
  }

  function isDurationNumber(obj) {
    // console.log(`typeof obj.duration`, typeof obj.duration);
    if (typeof obj.duration === "number") {
      return true; // Si duration es de tipo número, devuelve verdadero
    } else {
      return false; // Si duration no es de tipo número, devuelve falso
    }
  }

  async function fetchEpisodes() {
    try {
      const response = await fetch(API_TERRIBLE);
      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error("Error fetching the episodes:", error);
      return [];
    }
  }

  async function prevalidationData(episodes) {
    let postValidate = [];
    for (let index = 0; index < episodes.length; index++) {
    //   console.log(`episodes antes de validar`, episodes[index]);
      const ok = await tests(episodes[index]);
      if (!ok) {
        console.log(`no ha pasado el test`, episodes[index]);
        deletePodcasts++;
      } else {
        postValidate.push(episodes[index])
      }
    }
     console.log(`episodios validados`, postValidate);
    return postValidate;
  }

    // async function tests(ep) {

    //         // test("Si es un array los episodios", () => {
    //         //     assert.ok(Array.isArray(ep));

    //         // });

    //     test('Si son las claves correctas', () => {
    //       // const validObject = {
    //       //   number: 1,
    //       //   title: "Episodio 1",
    //       //   excerpt: "Descripción del episodio 1",
    //       //   published_at: "2023-10-10",
    //       //   duration: 30,
    //       //   id: "abc123",
    //       // };

    //       // const invalidObject = {
    //       //   number: 2,
    //       //   title: "Episodio 2",
    //       //   excerpt: "Descripción del episodio 2",
    //       //   // Falta "published_at"
    //       //   duration: 45,
    //       //   id: "def456",
    //       //   extraKey: "extraValue", // Clave adicional
    //       // };

    //       let result = validateObjectKeys(ep);
    //       assert.equal(result, null);

    //     });

    //   test('Valida si la clave "duration" es de tipo número', () => {
    //     // const validObject = {
    //     //   number: 1,
    //     //   title: "Episodio 1",
    //     //   excerpt: "Descripción del episodio 1",
    //     //   published_at: "2023-10-10",
    //     //   duration: 30,
    //     //   id: "abc123",
    //     // };

    //     // const invalidObject = {
    //     //   number: 2,
    //     //   title: "Episodio 2",
    //     //   excerpt: "Descripción del episodio 2",
    //     //   published_at: "2023-10-15",
    //     //   duration: "45",
    //     //   id: "def456",
    //     // };
    //   //   console.log(
    //   //     `isDurationNUmber(ep)`,
    //   //     isDurationNumber(ep)
    //   //   );
    //     let result = isDurationNumber(ep);
    //     assert.ok(result);

    //   });
    // }

  async function tests(ep) {
    
    let validKey = validateObjectKeys(ep);
    if (validKey !== null) {
      invalidsKeys.push(validKey);
    //   console.log(`invalidsKeys`, invalidsKeys);
      return false;
    }

    let missingKey = missingObjectKeys(ep);
    if (missingKey !== null) {
      missingKeys.push(missingKey);
    //   console.log(`missingKey`, missingKeys);
      return false;
    }

    // let typeNumber = isDurationNumber(ep);
    // if (!typeNumber) {
    //     noTypeNumber++
    //     // console.log(`errores de tipado en duration`, noTypeNumber);
    //   return false
    // }
    // console.log(`ha pasado todas las pruebas`, ep);
    return true;
  }

  async function processEpisodes(episodes) {
    // if (!episodes || episodes.length === 0) return;
    let filterEpisodes = await prevalidationData(episodes);
    //  console.log(`episodes validados`, filterEpisodes);
    if(filterEpisodes.length !== 0) {
    // Convertir duration a números y ordenar episodios por number
    filterEpisodes.forEach((ep) => (ep.duration = parseInt(ep.duration, 10)));
    filterEpisodes.sort((a, b) => parseInt(a.number, 10) - parseInt(b.number, 10));
    // Calcular el siguiente episode number
    const nextEpisodeNumber =
      parseInt(filterEpisodes[filterEpisodes.length - 1].number, 10) + 1;

    // Calcular la suma total de duration
    const totalDuration = filterEpisodes.reduce((sum, ep) => sum + ep.duration, 0);

    // Encontrar el episode más corto
    const shortestEpisode = filterEpisodes.reduce(
      (shortest, ep) => (ep.duration < shortest.duration ? ep : shortest),
      filterEpisodes[0]
    );

    // Crear una lista aleatoria y seleccionar titles de episodios que sumen menos de 2 horas
    const shuffledEpisodes = filterEpisodes.sort(() => Math.random() - 0.5);
    const twoHourLimit = 2 * 60 * 60; // 2 horas en segundos
    let durationSum = 0;
    const selectedTitles = [];
    for (const ep of shuffledEpisodes) {
      if (durationSum + ep.duration <= twoHourLimit) {
        durationSum += ep.duration;
        selectedTitles.push(ep.title);
      }
    }

    // Imprimir resultados
    // console.log("Next episode number:", nextEpisodeNumber);
    // console.log("Total duration of all episodes:", totalDuration);
    // console.log("Number of the shortest episode:", shortestEpisode.number);
    // console.log("Titles below 2 hours:", selectedTitles);

    if(invalidsKeys.length > 0) {
        errorMessage = errorMessage +  `${invalidsKeys.length} posts con keys incorrectas `
    }

    if(missingKeys.length > 0) {
        errorMessage = errorMessage +  `${missingKeys.length} posts con keys faltantes `
    }

    // if(noTypeNumber> 0) {
    //     errorMessage = errorMessage +  `${noTypeNumber} posts con error de tipado `
    // }

    return {
      nextEpisodeNumber,
      totalDuration,
      shortestEpisodeNumber: shortestEpisode.number,
      selectedTitles,
      errorReport: {
        totalErrors: errorMessage,
        haveErrors: deletePodcasts

      }
    };
    } else {
       return {todosLosDatosSonInvalidos: "Lamentablemente no hemos recibido ningún dato correctamente"}
    }

  }

  const podcast = await fetchEpisodes();
//   console.log(`podcast`, podcast);

  const results = processEpisodes(podcast);

  return {
    result: results,
  };
}
