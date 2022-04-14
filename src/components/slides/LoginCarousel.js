import React, {useState} from "react";
import { Carousel, CarouselItem, CarouselControl,
    CarouselIndicators, CarouselCaption } from 'reactstrap';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginCarousel = () => {
    const items= [
        {
            caption: '',
            altText: 'Tu lugar de estudio',
            key: 1,
            src: require('../../assets/img/imglogin/cofee.png')
        },
        {
            caption: '',
            altText: 'Aprendizaje y Concentración',
            key: 2,
            src: require('../../assets/img/imglogin/pexels.jpg')
        },
        {
            caption: '',
            altText: 'Amigos, Cafe, Estudio, Compartir',
            key: 3,
            src: require('../../assets/img/imglogin/group.jpg')
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if(animating) return;
        const nextIndex = activeIndex === 2 ? 0 : activeIndex  + 1;
        setActiveIndex(nextIndex);
    }
    const previous = () => {
        if(animating) return;
        const nextIndex = activeIndex === 0 ? 2 : activeIndex  - 1;
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
                <img src={item.src} width="100%" height="450px" />
                <CarouselCaption width="30px" height="20px" className="titleCarouselsLogin" captionText={item.altText} captionHeader={item.caption} />
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
export default LoginCarousel;