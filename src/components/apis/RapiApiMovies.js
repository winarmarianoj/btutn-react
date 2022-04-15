import React, {useState, useEffect} from "react";
import GameSpotService from "../../services/GameSpotService";
import Swal from 'sweetalert';
import axios from "axios";

/*axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});*/





const RapiApiMovies = () => {
    const [movies, setMovies] = useState([]);
    const options = {
        method: 'GET',
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {s: 'Avengers Endgame', r: 'json', page: '1'},
        headers: {
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
          'X-RapidAPI-Key': '645b661688msh2b71d481a7ca817p17b245jsn10e5632b5b5e'
        }
    };

    const options2 = {
        method: 'GET',
        url: 'https://video-game-news.p.rapidapi.com/tetris',
        headers: {
          'X-RapidAPI-Host': 'video-game-news.p.rapidapi.com',
          'X-RapidAPI-Key': '645b661688msh2b71d481a7ca817p17b245jsn10e5632b5b5e'
        }
    };

    useEffect(() => {        
        axios.request(options2).then(function (response) {
            setMovies(response.data);
            console.log(response.data);
        }).catch(error=>{
            console.error(error)
            Swal({text: 'Failed get gamespot.', icon: 'error', timer:'3500'}); console.log(error.message);
    })}, []);

    return(
        <>
        <p>{movies}</p>
    </>
    );
}
export default RapiApiMovies;