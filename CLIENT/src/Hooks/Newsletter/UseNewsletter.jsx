import React from 'react'
import { useState, useEffect} from 'react'
import UseValidateNewsLetterForm from './UseValidateNewsLetterForm'
import {toast} from 'react-toastify'

const UseNewsletter = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [newsLetter, setNewsLetter] = useState({
        username: '',
        email: '' 
    })
    
    const [error, setError] = useState({})

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setNewsLetter((newsLetter) => {return {...newsLetter, [name]: name === 'username' ? value : value.replace(/\s/g, "")}})
    
        if (name === 'username') {
            setError((error) => { return {...error, username: value ? '' : 'Enter your name', email: value ? '' : null}})
        }
        else if (name === 'email') {
            setError((error) => { return {...error, username: '', email: value ? emailRegex.test(value) ? '' : 'Invalid e-mail' : 'Enter email address'}})
        }
    } 
    
    const handleCanSave = (value) => {
        const canSubmit = [
            value.username.replace(/\s/g, "") && 
            emailRegex.test(value.email)
        ].every(Boolean) // enable the submit button 
    
        return canSubmit
    }
    
    const isSave = handleCanSave(newsLetter)
    const {errors} = UseValidateNewsLetterForm(newsLetter)

    const handleSubmitNewsLetter = () => {

        setError(errors)

        if (isSubmitting) return;

        if (!isSubmitting && isSave) {
            toast.success('You have successfully subscribed to our newsletter', {
                toastStyle: { background: 'green', color: 'white' }
            })
            setNewsLetter({
                username: '',
                email: '' 
            })
        }

        setIsSubmitting(false)
    }
    

    useEffect(() => {
        handleCanSave(newsLetter)
    }, [newsLetter])

  return {newsLetter, error, handleChange, handleSubmitNewsLetter}
}

export default UseNewsletter