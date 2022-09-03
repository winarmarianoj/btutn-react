import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import '../../assets/css/FooterHome.css';

const FooterHome = () => {

    return(
        <section className="">
            <div className="container backgroundFooterHome">
                <div className="row row-30 ">
                    <div className="col-md-4 col-xl-5 ">
                        <div className="pr-xl-4">
                            <dd className="imgCuvl" ></dd>
                            <div className="mt-4 text-center">
                                <p>Bienvenido a la Bolsa de Trabajo hecha y suministrada por Centro Universitario Vicente Lopez en conjunto con 
                                    la Universidad Técnica Nacional de Buenos Aires.</p>                        
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                                    <ul className="list-unstyled list-inline social text-center">
                                        <li className="list-inline-item"><a className="logos" href="https://www.facebook.com/CentroUniversitarioVL" target="-blanck" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} color="#4d4d4e" /></a></li>
                                        <li className="list-inline-item"><a className="logos" href="https://www.instagram.com/centrouniversitariovl/" target="-blanck" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} color="#4d4d4e" /></a></li>
                                        <li className="list-inline-item"><a className="logos" href="https://twitter.com/frbautn" target="-blanck" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} color="#4d4d4e" /></a></li>
                                        <li className="list-inline-item"><a className="logos" href="https://www.linkedin.com/in/prensa-utn-buenos-aires-9671a32b/" target="-blanck" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} color="#4d4d4e" /></a></li>
                                        <li className="list-inline-item"><a className="logos" href="https://www.youtube.com/user/utnbuenosaires1" target="-blanck" rel="noreferrer"><FontAwesomeIcon icon={faYoutube} color="#4d4d4e" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>                  
                    </div>
                    <div className="col-md-4">
                        <h5>Contacts</h5>                        
                        <dl className="contact-list">
                            <dt>Address:</dt>   
                            <dd><a className="footer-adr" target="_blank" href="https://goo.gl/maps/X6s9YGWqpc42">Carlos Villate 4480, Munro, Buenos Aires</a></dd>
                        </dl>                        
                        <dl className="contact-list">
                            <dt>Email:</dt>
                            <dd><a href="mailto:#">bolsa.de.trabajo.utn.test@gmail.com</a></dd>
                        </dl>
                        <dl className="contact-list">
                            <dt>Phones:</dt>
                            <dd><a href="tel:#">5197-1515</a> <span>or</span> <a href="tel:#">5197-1154</a></dd>
                        </dl>
                    </div>
                    <div className="col-md-4 col-xl-3">
                        <h5>Links</h5>
                        <ul className="nav-list">
                            <li><a href="https://www.vicentelopez.gov.ar/centrouniversitariovl">Web Site CUVL</a></li>
                            <li><a href="https://www.frba.utn.edu.ar/">Web Site UTN</a></li>
                            <li><a href="#">Nosotros</a></li>
                            <li><a href="#">Términos</a></li>
                            <li><a href="#">Soporte</a></li>
                        </ul>
                    </div>
                </div>                             
            </div>            
        </section>
    );
};

export default FooterHome;
