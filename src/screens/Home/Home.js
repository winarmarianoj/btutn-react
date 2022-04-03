import React from "react";
import HomeCards from "../../components/home/HomeCards";
import HomeCss from '../../assets/css/home.css';

const Home = () => {
    return(
        <div className="home">
            <div className="row ">
                <section className="col-4 fixed-top offset-fixed f-left  my-5 pt-5">
                    
                </section>
                <section className="col-8 f-right ">                        
                    <HomeCards />
                </section>
            </div>
        </div>        
    );
}

export default Home;
