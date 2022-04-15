import React, {useState, useEffect} from "react";
import GameSpotService from "../../services/GameSpotService";
import Swal from 'sweetalert';

const GameSpot = () => {

    const [releases, setReleases] = useState([]);

    useEffect(() => {        
        GameSpotService.getReleases().then(data => { setReleases(data); console.log(data);
        }).catch(error=>{
            Swal({text: 'Failed get gamespot.', icon: 'error', timer:'3500'}); console.log(error.message);
    })}, []);

    return(
        <>
            <p>{releases}</p>
        </>
    );
}
export default GameSpot;