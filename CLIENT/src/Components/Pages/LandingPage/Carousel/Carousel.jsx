import Carousel from 'react-bootstrap/Carousel';
import {images} from '../../../../Utilities/CarouselData'
import '../Carousel/Carousel.css'

function CarouselSlider() {

return (
<Carousel fade className='carouselContainer'>
    <Carousel.Item interval={1000}>
        <img src={images[0].img} alt={images[0].title} className='photos'/>
        <Carousel.Caption>
            <h3 style={{color: 'black'}}> {images[0].title} </h3>
            <p style={{color: 'black', fontWeight: 'bold'}}> Everyday deals you don't want to miss </p>
        </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item interval={800}>
        <img src={images[1].img} alt={images[1].title} className='photos'/>
        <Carousel.Caption>
            <h3 style={{color: 'black'}}> {images[1].title} </h3>
            <p style={{color: 'black', fontWeight: 'bold'}}> Everyday deals you don't want to miss </p>
        </Carousel.Caption>
    </Carousel.Item> 

    <Carousel.Item>
        <img src={images[2].img} alt={images[2].title} className='photos'/>
        <Carousel.Caption>
            <h3> {images[2].title} </h3>
            <p> Everyday deals you don't want to miss </p>
        </Carousel.Caption>
    </Carousel.Item>

    {/* <Carousel.Item>
        <img src={images[3].img} alt={images[3].title} className='photos'/>
        <Carousel.Caption>
            <h3> {images[3].title} </h3>
            <p> Everyday deals you don't want to miss </p>
        </Carousel.Caption>
    </Carousel.Item> */}
</Carousel>
);
}

export default CarouselSlider;