import axios from 'axios';
import AuthService from "./AuthService";

//http://www.gamespot.com/api/releases/?api_key=[TU CLAVE API]
//http://www.gamespot.com/api/games/?api_key=
const GAMESPOT_BASE_URL = "http://www.gamespot.com/api/games/?api_key=";
const API_KEY = 'e25f745b2a0fecd83715a5576ed361ab5a83b324';
const FILTER = '&release_date=release_date:start 2022-04-01|end 2022-04-14'
// &filter=field:start date|end date (using datetime format)  April 15, 2022 at 1:06PM PDT
const FILTER_GAME = '&filter=release_date:start April 15, at 0:00AM PDT|end April 15, at 18:00PM PDT'
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

const IMAGES_URL = 'http://www.gamespot.com/api/images/?api_key=' + API_KEY + '&filter=association:[GUID]';


const PROGRAMAS = "https://www.cultura.gob.ar/api/v2.0/programas/?format=api";

//const testURL = GAMESPOT_BASE_URL+API_KEY+FILTER_GAME;
//const testURL = IMAGES_URL;
const myInit = {
    Allow: 'GET, HEAD, OPTIONS',
    method: 'HEAD',
    mode: 'no-cors',
    'Content-Type': 'application/json',
    Vary: 'Accept',
    "name": "Apicultura",
        "description": "The default basic root view for DefaultRouter",
        "renders": [
            "application/json",
            "text/html"
        ],
        "parses": [
            "application/json",
            "application/x-www-form-urlencoded",
            "multipart/form-data"
        ]
}

const myRequest = new Request(PROGRAMAS, myInit);


class GameSpotService {

    async getReleases(){
        //await axios.get(GAMESPOT_BASE_URL + API_KEY, {headers}).then(res => res.data);
        /*await axios.get(PROGRAMAS).then(res => {
            console.log(res.data)
        });*/
        
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