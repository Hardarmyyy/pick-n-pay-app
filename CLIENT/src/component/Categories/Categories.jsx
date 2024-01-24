import { Link } from "react-router-dom"
import {useSelector } from 'react-redux'


const Categories = () => {

const allCategories = useSelector((state) => state?.category.allCategories)


return (

<>
    <section className="w-40 h-72 py-2 bg-gray-200 rounded-md shadow-sm text-center text-my-primary font-Montserrat sticky top-0">

        <ul>
            {allCategories.map((category) =>
                <li key={category?.categoryID} className="md:text-sm lg:text-lg my-1 py-1 hover:bg-gray-400 rounded-sm">
                    <Link to={`/category/${category?.category}`}> 
                        {category.category}
                    </Link>
                </li>
            )}
        </ul>

    </section>
</>

)
}

export default Categories