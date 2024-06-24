import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REFRESH } from "../Services/authApi";
import Spinner from "../component/Spinner";

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state?.auth?.accessToken)

    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                await dispatch(REFRESH());
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false)
            }
        }

        !accessToken ? verifyRefreshToken() : setIsLoading(false);

    }, [])

    return (
        <>
            {isLoading 
                ? <div className="loader"> <Spinner></Spinner> </div>
                : <Outlet></Outlet>
            }
        </>
    )

}

export default PersistLogin