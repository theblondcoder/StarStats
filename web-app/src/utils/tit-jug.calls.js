import Axios from 'axios';
const api_url = import.meta.env.REACT_APP_API_URL;
const scraping_url= import.meta.env.REACT_APP_SCRAPING_URL;


export async function getDatosTodDepor(id){
    try {
      const response = await Axios.get(`${api_url}/titulos-jugador/datos-todos-depor/${id}`);
      return response.data.result;
    } catch (error) {
      console.error("HAY EL SIGUIENTE ERROR: " + error);
    }
  }


  export async function getDeporRetirados(id){
    try {
      const response = await Axios.get(`${api_url}/titulos-jugador/depor_retirados/${id}`);
      return response.data.result;
    } catch (error) {
      console.error("HAY EL SIGUIENTE ERROR: " + error);
    }
  }


  export async function getTitDeportistas(id){
    try {
      const response = await Axios.get(`${api_url}/titulos-jugador/tit_deportistas/${id}`);
      return response.data.result;
    } catch (error) {
      console.error("HAY EL SIGUIENTE ERROR: " + error);
    }
  }

export function getDatosCartaWeb(jugador){
    return Axios.get(`${scraping_url}/info-card.php`, {
      params: {
        deportista: jugador,
      }
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}
