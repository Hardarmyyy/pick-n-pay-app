import { myUserContext } from '../../../Utilities/UserContext'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react';
import '../Profile/Profile.css'


const Profile = () => {

// destructure username from myUserContext;
const {user} = useContext(myUserContext)
const {username} = user

// store the user information
const [name, setName] = useState(null)
const [email, setEmail] = useState(null)
const [err, setErr] = useState(null)

useEffect(() => {
    axios.get('http://localhost:4050/api/user/'+username)
    .then((response) => {
        const result = response.data
        setName(result.username)
        setEmail(result.email)
    })
    .catch((error) => {
        setErr(error.response.data.error)
    })
}, [username, email])


return (

<>

    <section>

        <p className='infohead'> Basic Information </p>

        <div className='accountInfo'>
            <p> <strong>  username: </strong> {name} </p>
            <p> <strong>  email: </strong> {email} </p>
        </div>

    </section>
</>

)
}

export default Profile