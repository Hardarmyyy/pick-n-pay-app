import { Link } from "react-router-dom"
import {useSelector } from 'react-redux'
import './Categories.css'


const Categories = () => {

const allCategories = useSelector((state) => state?.category.allCategories)


return (

<>
    <section>

        <div className='productCategories'>

            {allCategories.map((category, index) => 
                <Link to={`/category/${category.categoryName}`} key={index}> 
                    <p>  {category.categoryName}  </p> 
                </Link>
            )}

        </div>  

    </section>
</>

)
}

export default Categories