import { availableProductCategory } from "../../../../Utilities/ProductContext"
import '../Categories/Categories.css'
import { Link } from "react-router-dom"


const Categories = () => {


return (

<>
    <section>
        <div className='productCategories'>
            {availableProductCategory.map((type, index) => 
                <Link to={`/category/${type}`} key={index}> 
                    <p>  {type}  </p> 
                </Link>
            )}
        </div>  
    </section>
</>

)
}

export default Categories