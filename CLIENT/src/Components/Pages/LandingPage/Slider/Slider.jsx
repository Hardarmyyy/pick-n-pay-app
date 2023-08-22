import Carousel from 'react-bootstrap/Carousel';
import '../Slider/Slider.css'
import { useContext } from 'react';
import { myProductContext } from '../../../../Utilities/ProductContext';
import HotProduct from '../HotProductCard/HotProduct';


function Slider() {

// import categories from myProductContext;
const {specialProducts} = useContext(myProductContext)

const firstSlide = specialProducts.slice(0,4)
const secondSlide = specialProducts.slice(4)


return (
<Carousel className='sliderContainer'>

    <Carousel.Item interval={2500}>
        <div className='hotProductsContainer'>
            {firstSlide.map(item =>
                <HotProduct key={item._id}  
                    src={`../../../../../public/productPhoto/${item.photo[0].filename}`} 
                    alt={item.title} 
                    title={item.title} 
                    price={item.price} 
                    special={item.special} 
                    type={item.category}
                    id={item._id}
                >
                </HotProduct>
            )}
        </div>
    </Carousel.Item> 

    <Carousel.Item interval={2500}>
        <div className='hotProductsContainer'>
            {secondSlide.map(item =>
                <HotProduct key={item._id} 
                    src={`../../../../../public/productPhoto/${item.photo[0].filename}`} 
                    alt={item.title} 
                    title={item.title} 
                    price={item.price} 
                    special={item.special}
                    type={item.category}
                    id={item._id}
                >
                </HotProduct>
            )}
        </div>
    </Carousel.Item>

</Carousel>
);
}

export default Slider;