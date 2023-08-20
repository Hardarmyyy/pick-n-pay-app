import React from 'react'
import { useState } from 'react'
import Modal from './Modal'
import { useContext } from 'react'
import Navigation from '../../Navigation/Navigation'
import { myUserContext } from '../../../../Utilities/UserContext'

const OrderCompleteLayout = () => {

// import user object from myUserContext and destructure cartProducts;
const {user, cartCounter} = useContext(myUserContext)
const {username} = user

// define a state to open and close orderComplete Modal
const [openModal, setOpenModal] = useState(false)

// define a function to close Modal;
const closeModal = () => { 
    setOpenModal(false);
}

return (
<>
    <Navigation  username={username} cartCounter={cartCounter}></Navigation>

    <section>
        {openModal && <Modal closeModal={closeModal}></Modal>}
    </section>

</>

)
}

export default OrderCompleteLayout
