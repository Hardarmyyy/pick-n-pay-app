import { Link } from "react-router-dom"
import {useSelector } from 'react-redux'


const Categories = () => {

const allCategories = useSelector((state) => state?.category.allCategories)


return (

<>
    <section className="w-40 h-72 py-2 bg-gray-200 rounded-md shadow-sm text-center text-my-primary font-Montserrat">

        {allCategories.map((category) => 
            <ul>
                <li key={category._id} className="md:text-sm lg:text-lg my-1 py-1 hover:bg-gray-400 rounded-sm">
                    <Link to={`/category/${category.categoryName}`}> 
                        {category.categoryName}
                    </Link>
                </li>
            </ul>
        )}

    </section>
</>

)
}

export default Categories