import React, {useState} from "react";
import HomeCards from "../../components/home/HomeCards";
import CuvlCarousel from "../../components/slides/CuvlCarousel";
import UtnCarousel from "../../components/slides/UtnCarousel";
import FooterHome from "../../components/fixed/FooterHome";
import TuTiempo from "../../components/apis/Tutiempo";
import SearchByCategory from "../../components/home/SearchByCategory";
import '../../assets/css/home.css';

const Home = () => {
    return(
        <div className="home">
            <div className="container-fluid">
                <div className="row">
                    <section className="col-4 f-left my-5 pt-5 carouselItemsLeft">  
                        <div className=""><CuvlCarousel /> <UtnCarousel /> 
                        <TuTiempo /></div>
                    </section>
                    <section className="col-1 "></section>
                    <section className="col-7 f-right my-5 pt-5 carouselItemsRight">
                        <div className=""><SearchByCategory /> <HomeCards /></div>
                    </section>                    
                </div>
                <FooterHome />
            </div>            
        </div>        
    );
};
export default Home;
