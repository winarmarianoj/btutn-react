import axios from 'axios';
import AuthService from "./AuthService";

//http://www.gamespot.com/api/releases/?api_key=[TU CLAVE API]
//http://www.gamespot.com/api/games/?api_key=
const GAMESPOT_BASE_URL = "http://www.gamespot.com/api/games/?api_key=";
const API_KEY = 'e25f745b2a0fecd83715a5576ed361ab5a83b324';
const FILTER = '&release_date=release_date:start 2022-04-01|end 2022-04-14'
const USER = 'winarmarianoj';
const config = {
    method: 'get',
    headers: {    
        'Access-Control-Allow-Origin': '*',
		Accept: 'application/json',
		'Content-Type': 'text/plain',
    },
    url: GAMESPOT_BASE_URL + API_KEY,
};

const testURL = GAMESPOT_BASE_URL+API_KEY+FILTER;
const myInit = {
    method: 'HEAD',
    mode: 'no-cors',
};

const myRequest = new Request(testURL, myInit);


class GameSpotService {

    async getReleases(){
        //return await axios.get(GAMESPOT_BASE_URL + API_KEY, {headers}).then(res => res.data);
        fetch(myRequest).then(function(response) {
            return response;
        }).then(function(response) {
            console.log(response);
        }).catch(function(e){
            console.log(e);
        });
        
    }
}

export default new GameSpotService();