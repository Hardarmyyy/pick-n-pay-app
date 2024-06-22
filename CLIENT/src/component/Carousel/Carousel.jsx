import Carousel from 'react-bootstrap/Carousel';
import {images} from '../../Utils/CarouselData'

function CarouselSlider() {

return (
    
    <Carousel fade className='sm:w-full md:w-full tablet:w-1/2 mini:w-1/2 laptop:w-3/5 super:w-3/4 mx-auto'>
        <Carousel.Item interval={1000}>
            <img src={images[0].img} alt={images[0].title} className='w-full h-72 rounded-sm'/>
            <Carousel.Caption>
                <h3 style={{color: 'black'}}> {images[0].title} </h3>
                <p style={{color: 'black', fontWeight: 'bold'}}> Everyday deals you don't want to miss </p>
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={800}>
            <img src={images[1].img} alt={images[1].title} className='w-full h-72 rounded-sm'/>
            <Carousel.Caption>
                <h3 style={{color: 'black'}}> {images[1].title} </h3>
                <p style={{color: 'black', fontWeight: 'bold'}}> Everyday deals you don't want to miss </p>
            </Carousel.Caption>
        </Carousel.Item> 

        <Carousel.Item interval={1000}>
            <img src={images[2].img} alt={images[2].title} className='w-full h-72 rounded-sm'/>
            <Carousel.Caption>
                <h3> {images[2].title} </h3>
                <p style={{color: 'white', fontWeight: 'bold'}}> Everyday deals you don't want to miss </p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>

    

);
}

export default CarouselSlider;
