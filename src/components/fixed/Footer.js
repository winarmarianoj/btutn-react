import React from "react";
import '../../assets/css/StyleWeb.css';

const Footer = () => {
    return (
        <div className="">
            <footer className = "footer pt-2 text-center text-small bg-dark">
                <div className="row textFooter">
                    <ul className="list-in line">
                        <li className="list-inline-item"><a href="">Soporte</a></li>
                        <span className="text-muted">© 2022 Buenos Aires. All right Reversed CUVL-UTN</span>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer;