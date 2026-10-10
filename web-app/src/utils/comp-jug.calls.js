import Axios from 'axios';
const api_url = import.meta.env.REACT_APP_API_URL;
const scraping_url= import.meta.env.REACT_APP_SCRAPING_URL;

Axios.defaults.withCredentials = true;

export async function getDataUserChart(){
    try {
      const response = await Axios.get(`${api_url}/comparar-jugadores/dataPlayer`);

      return response.data.result;
    } catch (error) {
      console.error("HAY EL SIGUIENTE ERROR: " + error);
    }
  }


  export async function getCompetitions(){
    try {
      const response = await Axios.get(`${api_url}/comparar-jugadores/competitions`);
      return response.data.result;
    } catch (error) {
      console.error("HAY EL SIGUIENTE ERROR: " + error);
    }
  }


  export async function getCompeRetir(arrayReti, value1, value2){
    try {
      const response = await Axios.post(`${api_url}/comparar-jugadores/playerCompetitions`, {
        arrayReti,
        value1,
        value2
    });
      return response.data.result;
    } catch (error) {
      console.error("HAY EL SIGUIENTE ERROR: " + error);
    }
  }
  export function getCompetiActi(jugador, compe, moda){
    return Axios.get(`${scraping_url}/comparacion.php`, {
      params: {
        deportista: jugador,
        competicion: compe,
        modalidad: moda
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}
