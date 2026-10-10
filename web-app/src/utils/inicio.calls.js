import Axios from 'axios';
const api_url = import.meta.env.REACT_APP_API_URL;


export async function searchBarPlayer(){
    try {
      const response = await Axios.get(`${api_url}/inicio/barra-busqueda`);
      return response.data.result;
    } catch (error) {
      console.error("HAY EL SIGUIENTE ERROR: " + error);
    }
  }

  export async function flagsCodes() {
    try {
      const response = await Axios.get(
        `https://flagcdn.com/es/codes.json`,
        {
          withCredentials: false
        }
      );
      return response.data;
    } catch (error) {
      console.error("HAY EL SIGUIENTE ERROR: " + error);
    }
  }
