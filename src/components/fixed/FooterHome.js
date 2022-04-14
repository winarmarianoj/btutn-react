import React from "react";
import '../../assets/css/FooterHome.css';

const FooterHome = () => {

    return(
        <section className="">
            <div className="container backgroundFooterHome">
                <div className="row row-30 ">
                    <div className="col-md-4 col-xl-5 ">
                        <div className="pr-xl-4">
                        <div className="row">
                            <dl className="imgUtn col-6"></dl>
                            <dl className="imgCuvl col-6"></dl>
                        </div>
                            <p>Bienvenido a la Bolsa de Trabajo hecha y suministrada por Centro Universitario Vicente Lopez en conjunto con 
                                la Universidad Técnica Nacional de Buenos Aires.</p>                        
                            <p className="rights"><span>©  </span><span className="copyright-year">2022</span><span> </span><span>Buenos Aires</span><span>. </span><span>All Rights Reserved.</span></p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h5>Contacts</h5>                        
                        <dl className="contact-list">
                            <dt>Address:</dt>   
                            <dd><a class="footer-adr" target="_blank" href="https://goo.gl/maps/X6s9YGWqpc42">Carlos Villate 4480, Munro, Buenos Aires</a></dd>
                        </dl>                        
                        <dl className="contact-list">
                            <dt>email:</dt>
                            <dd><a href="mailto:#">bolsa.de.trabajo.utn.test@gmail.com</a></dd>
                        </dl>
                        <dl className="contact-list">
                            <dt>phones:</dt>
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
            <div className="row no-gutters social-container">          
            <div className="col"><a className="social-inner" href="https://www.facebook.com/CentroUniversitarioVL" target="_blank"><span className="icon mdi mdi-facebook"></span><span>Facebook CUVL</span></a></div>
            <div className="col"><a className="social-inner" href="https://www.instagram.com/centrouniversitariovl/" target="_blank"><span className="icon mdi mdi-instagram"></span><span>Instagram CUVL</span></a></div>
            <div className="col"><a className="social-inner" href="https://twitter.com/frbautn" target="_blank"><span className="icon mdi mdi-twitter"></span><span>Twitter UTN</span></a></div>
            <div className="col"><a className="social-inner" href="https://www.linkedin.com/in/prensa-utn-buenos-aires-9671a32b/" target="_blank"><span className="icon mdi mdi-youtube-play"></span><span>Linkedin UTN</span></a></div>
            </div>
        </section>
    );
};

export default FooterHome;
