import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REFRESH } from "../Services/authApi";
import Navigation from "../Layouts/Navigation/Navigation";
import Footer from "../Layouts/Footer/Footer";
import Modal from "../component/Modal";
import Spinner from "../component/Spinner";

const PersistLogin = () => {

    const {category} = useParams()
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state?.auth?.accessToken)
    const logoutStatus = useSelector((state) => state?.auth?.status)
    const refreshStatus = useSelector((state) => state?.auth?.status)

    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                await dispatch(REFRESH());
            }
            catch (error) {
                console.error(error);
            }
        }

        !accessToken && verifyRefreshToken();

    }, [])

    return (
        <>
            {logoutStatus === 'Loading...' && <Modal> <Spinner></Spinner> </Modal>}

            <Navigation category={category}></Navigation>

            {refreshStatus === 'Loading.......'
                ? 
                    <section className='w-full h-1/2 tablet:h-1/2 mini:h-3/5 laptop:h-3/4 super:h-3/4 flex justify-center items-center py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60'>
                        <Spinner></Spinner> 
                    </section>
                : <Outlet></Outlet>
            }

            <Footer></Footer>
        </>
    )

}

export default PersistLogin