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
                                        <li className="list-inline-item"><a href="https://www.facebook.com/CentroUniversitarioVL"><i className="fa fa-facebook"></i></a></li>
                                        <li className="list-inline-item"><a href="https://www.instagram.com/centrouniversitariovl/"><i className="fa fa-twitter"></i></a></li>
                                        <li className="list-inline-item"><a href="https://www.instagram.com/centrouniversitariovl/"><i className="fa fa-instagram"></i></a></li>
                                        <li className="list-inline-item"><a href="https://www.linkedin.com/in/prensa-utn-buenos-aires-9671a32b/"><i className="fa fa-linkedin"></i></a></li>
                                        <li className="list-inline-item"><a href="https://www.youtube.com/user/utnbuenosaires1"><i className="fa fa-youtube"></i></a></li>
                                        <li className="list-inline-item"><a href="mailto:centro.universitario@mvl.edu.ar" target="_blank"><i className="fa fa-envelope"></i></a></li>
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
