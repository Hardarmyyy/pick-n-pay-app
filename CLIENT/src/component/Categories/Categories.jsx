import { Link } from "react-router-dom"
import { CATEGORYPRODUCTS } from '../../Services/categoryApi'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"



const Categories = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const allCategories = useSelector((state) => state?.category.allCategories)

const fetchCategoryProducts = async (category) => {
    await dispatch(CATEGORYPRODUCTS(category))
    .then((response) => {
        if (response.payload.success) {
            navigate(`/category/${category}`)
        }
    })
    .catch((error) => {
        console.error(error)
    })
}


return (

<>
    <section className="w-40 h-72 py-2 bg-gray-200 rounded-md shadow-sm text-center text-my-primary font-Montserrat sticky top-0">

        <ul>
            {allCategories.map((category) =>
                <li key={category?.categoryID} className="md:text-sm lg:text-lg my-1 py-1 hover:bg-gray-400 rounded-sm">
                    <Link to={`#`} onClick={() => {fetchCategoryProducts(category?.category)}}> 
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