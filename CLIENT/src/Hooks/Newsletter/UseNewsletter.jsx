import React from 'react'
import { useState, useEffect} from 'react'
import UseValidateNewsLetterForm from './UseValidateNewsLetterForm'
import {toast} from 'react-toastify'

const UseNewsletter = () => {

    const [newsLetter, setNewsLetter] = useState({
        name: '',
        email: '' 
    })
    
    const [error, setError] = useState({})

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setNewsLetter((newsLetter) => {return {...newsLetter, [name]: name === 'name' ? value : value.replace(/\s/g, "")}})
    
        if (name === 'name') {
            setError((error) => { return {...error, name: value ? '' : null, multi: value ? '' : null }})
        }
        else if (name === 'email') {
            setError((error) => { return {...error, email: value ? '' : null, multi: value ? '' : null}})
        }
    } 
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const handleCanSave = (value) => {
        const canSubmit = [
            value.name.replace(/\s/g, "") && 
            emailRegex.test(value.email)
        ].every(Boolean) // enable the submit button 
    
        return canSubmit
    }
    
    const isSave = handleCanSave(newsLetter)
    const {errors} = UseValidateNewsLetterForm(newsLetter)

    const handleSubmitNewsLetter = () => {

        if (!newsLetter.name && !newsLetter.email) {
            return setError({multi: 'Enter name and email'})
        }

        setError(errors)

        if (isSubmitting) return;

        if (!isSubmitting && isSave) {
            toast.success('You have successfully subscribed to our newsletter', {
                toastStyle: { background: 'green', color: 'white' }
            })
            setNewsLetter({
                name: '',
                email: '' 
            })
            setIsSubmitting(false)
        }
    }
    

    useEffect(() => {
        handleCanSave(newsLetter)
    }, [newsLetter])

  return {newsLetter, error, handleChange, handleSubmitNewsLetter}
}

export default UseNewsletter