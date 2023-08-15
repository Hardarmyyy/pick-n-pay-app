import React from 'react'
import {BsStarFill } from "react-icons/bs";
import '../Ratings/Ratings.css'

const Ratings = ({rating}) => {
return (

<section className='starRatings'>
    {rating == 5 &&
        <>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
        </>
    }
    {rating == 4 &&
        <>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
        </>
    }
    {rating == 3 &&
        <>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
        </>
    }
    {rating == 2 &&
        <>
            <span> <BsStarFill></BsStarFill></span>
            <span> <BsStarFill></BsStarFill></span>
        </>
    }
    {rating == 1 &&
        <>
            <span> <BsStarFill></BsStarFill></span>
        </>
    }

</section>

)
}

export default Ratings