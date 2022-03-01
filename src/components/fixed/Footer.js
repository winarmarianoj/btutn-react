import React from "react";
import '../../assets/css/StyleWeb.css';

const Footer = () => {
    return (
        <div className="">
            <footer className = "footer pt-2 text-center text-small bg-dark">
                <div className="row textFooter">
                    <ul className="list-in line">
                        <li className="list-inline-item"><a href="">Nosotros</a></li>
                        <li className="list-inline-item"><a href="">Términos</a></li>
                        <li className="list-inline-item"><a href="">Soporte</a></li>
                        <li className="list-inline-item"><a href=""></a></li>
                        <span className="text-muted">All Rights Reserved 2022 @CUVL-UTN</span>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer;