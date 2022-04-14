import React, {useState} from "react";
import { Carousel, CarouselItem, CarouselControl,
    CarouselIndicators, CarouselCaption } from 'reactstrap';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const UtnCarousel = () => {
    const items= [
        {
            altText: '',
            caption: 'UTN',
            key: 1,
            src: require('../../assets/img/carousel/sede-caba.jpg'),
            href: "https://www.frba.utn.edu.ar/"
        },
        {
            altText: '',
            caption: 'Carreras de Grado',
            key: 2,
            src: require('../../assets/img/carousel/carreras-de-grado.jpg'),
            href: "https://www.frba.utn.edu.ar/carreras-de-grado/"
        },
        {
            altText: '',
            caption: 'Investigación',
            key: 3,
            src: require('../../assets/img/carousel/investigacion.jpg'),
            href: "https://www.frba.utn.edu.ar/investigacion/centros-grupos-utn-ba/"
        },
        {
            altText: '',
            caption: 'Administración',
            key: 4,
            src: require('../../assets/img/carousel/phone.jpg'),            
            href:"https://www.frba.utn.edu.ar/administracion/"
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if(animating) return;
        const nextIndex = activeIndex === 3 ? 0 : activeIndex  + 1;
        setActiveIndex(nextIndex);
    }
    const previous = () => {
        if(animating) return;
        const nextIndex = activeIndex === 0 ? 3 : activeIndex  - 1;
        setActiveIndex(nextIndex);
    }
    const goToIndex = (newIndex) => {
        if(animating) return;
        setActiveIndex(newIndex);
    }
    const slides = items.map((item) => {
        return(
            <CarouselItem
                onExisting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <a href={item.href} target="_blank"> <img src={item.src} alt={item.altText} width="100%" height="200px" /> </a>
                <div> <p width="30px" height="20px" className="titleCarousels" >{item.caption}</p> </div>
                <CarouselCaption   captionText={item.altText}  />
            </CarouselItem>
        );
    });

    return(
        <Carousel
            activeIndex={activeIndex}        
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
            <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
        </Carousel>
    );
  }

export default UtnCarousel;