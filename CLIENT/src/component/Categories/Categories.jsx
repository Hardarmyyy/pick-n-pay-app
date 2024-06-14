import { Link } from "react-router-dom"
import { CATEGORYPRODUCTS } from '../../Services/categoryApi'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"



const Categories = ({eventHandler}) => {

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
    

        <ul>
            {allCategories.map((category) =>
                <li key={category?.categoryID} onClick={eventHandler} className="transition duration-75 md:text-sm lg:text-lg my-1 py-1">
                    <Link to={`/category/${category.category}`}> 
                        {category.category}
                    </Link>
                </li>
            )}
        </ul>

</>

)
}

export default Categories