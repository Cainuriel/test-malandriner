/** @type {import('./$types').PageLoad} */
import test from "node:test";
import assert from "node:assert";
export async function load() {

    const API_URL = "https://tormenta-codigo-app-terrible.vercel.app/api/podcast";
    const API_TERRIBLE = "https://tormenta-codigo-app-terrible.vercel.app/api/podcast/terrible";

    function validateObjectKeys(obj) {
        const correctKeys = [
          "number",
          "title",
          "excerpt",
          "published_at",
          "duration",
          "id",
        ];
      
        const objectKeys = Object.keys(obj);
        
          
        for (const key of objectKeys) {
            if (!correctKeys.includes(key)) {
            return key; // Devuelve la clave incorrecta encontrada
            }
        }

        for (const key of correctKeys) {
            if (!objectKeys.includes(key)) {
            return key; // Devuelve la clave que falta en el objeto
            }
        }

        return null; // Si todas las claves coinciden, devuelve null
      
      }
    
      function isDurationNumber(obj) {
        console.log(`typeof obj.duration`, typeof obj.duration);
        if (typeof obj.duration === 'number') {
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

        function processEpisodes(episodes) {
            if (!episodes || episodes.length === 0) return;
          
            // Convertir duration a números y ordenar episodios por number
            episodes.forEach((ep) => (ep.duration = parseInt(ep.duration, 10)));
            episodes.sort((a, b) => parseInt(a.number, 10) - parseInt(b.number, 10));
          
            console.log(`episodes[0]`, episodes[0]);
              test('Si es un array los episodios', () => {
                assert.ok(Array.isArray(episodes))
                // console.log(`episodes`,  episodes);
                
              });

              test('Si son las claves correctas', () => {
                // const validObject = {
                //   number: 1,
                //   title: "Episodio 1",
                //   excerpt: "Descripción del episodio 1",
                //   published_at: "2023-10-10",
                //   duration: 30,
                //   id: "abc123",
                // };
              
                // const invalidObject = {
                //   number: 2,
                //   title: "Episodio 2",
                //   excerpt: "Descripción del episodio 2",
                //   // Falta "published_at"
                //   duration: 45,
                //   id: "def456",
                //   extraKey: "extraValue", // Clave adicional
                // };
            
                let result = validateObjectKeys(episodes[0]); 
                // console.log(`result`, result);
                assert.equal(result, null)
              });

              test('Valida si la clave "duration" es de tipo número', () => {
                // const validObject = {
                //   number: 1,
                //   title: "Episodio 1",
                //   excerpt: "Descripción del episodio 1",
                //   published_at: "2023-10-10",
                //   duration: 30,
                //   id: "abc123",
                // };
              
                // const invalidObject = {
                //   number: 2,
                //   title: "Episodio 2",
                //   excerpt: "Descripción del episodio 2",
                //   published_at: "2023-10-15",
                //   duration: "45", 
                //   id: "def456",
                // };
               console.log(`isDurationNUmber(episodes[0])`, isDurationNumber(episodes[0]));
                assert.ok(isDurationNumber(episodes[0]));

              });

              
                // Calcular el siguiente episode number
                const nextEpisodeNumber =
                parseInt(episodes[episodes.length - 1].number, 10) + 1;
          
            // Calcular la suma total de duration
            const totalDuration = episodes.reduce((sum, ep) => sum + ep.duration, 0);
          
            // Encontrar el episode más corto
            const shortestEpisode = episodes.reduce(
              (shortest, ep) => (ep.duration < shortest.duration ? ep : shortest),
              episodes[0]
            );
          
            // Crear una lista aleatoria y seleccionar titles de episodios que sumen menos de 2 horas
            const shuffledEpisodes = episodes.sort(() => Math.random() - 0.5);
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

            return {nextEpisodeNumber, totalDuration, shortestEpisodeNumber: shortestEpisode.number, selectedTitles}
          }

    const podcast = await fetchEpisodes();
    // console.log(`fetchEpisodes`, await fetchEpisodes());
    // console.log(`processEpisodes`,  processEpisodes(podcast));
    const results = processEpisodes(podcast);

    // async function fetchTerrible() {
    //     try {
    //         const response = await fetch(API_TERRIBLE);
    //         const responseDataTerrible = await response.json();
    //         return responseDataTerrible;
    //     } catch (error) {
    //         console.error("Error fetching the episodes:", error);
    //         return [];
    //     }
    //     }

    // console.log(`fethTerrible`, await fetchTerrible());
	return {
		result: results
	};
}