import React, {useState} from "react";
import HomeCards from "../../components/home/HomeCards";
import CuvlCarousel from "../../components/slides/CuvlCarousel";
import UtnCarousel from "../../components/slides/UtnCarousel";
import FooterHome from "../../components/fixed/FooterHome";
import Footer from "../../components/fixed/Footer";
import '../../assets/css/home.css';

/*fixed-top offset-fixed*/

const Home = () => {
    return(
        <div className="home">
            <div className="container-fluid">
                <div className="row">
                    <section className="col-4 f-left my-5 pt-5 carouselItems">  
                        <div className="carouselItems"><CuvlCarousel /> <UtnCarousel /></div>
                    </section>
                    <section className="col-1 "></section>
                    <section className="col-7 f-right pt-5">                        
                        <HomeCards />
                    </section>                    
                </div>
                <FooterHome />
            </div>            
        </div>        
    );
};
export default Home;
