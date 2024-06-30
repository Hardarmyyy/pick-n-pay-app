import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'


const Categories = ({eventHandler}) => {

const allCategories = useSelector((state) => state?.category.allCategories)

return (

<>
    

        <ul className="tablet:ms-4 mini:ms-6 laptop:ms-10 super:ms-10">
            {allCategories?.map((category) =>
                <li key={category?.categoryID} onClick={eventHandler} className="transition duration-75 text-sm my-1 py-1">
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