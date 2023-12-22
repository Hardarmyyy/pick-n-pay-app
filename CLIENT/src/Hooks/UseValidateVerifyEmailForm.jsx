import { useRef, useEffect } from "react";


const UseValidateVerifyEmailForm = (signupOtp, inputRefs) => {

    const completeOTP = Object.values(signupOtp).join('')
    const Otp = {signupOtp: completeOTP }

    // Check if any OTP field is empty
    const isOTPComplete = Object.values(signupOtp).every(Boolean);

    const getNextField = (currentField) => {
        const field = Object.keys(signupOtp);
        const currentIndex = field.indexOf(currentField);
    
        return currentIndex < field.length - 1 ? field[currentIndex + 1] : null;
    };
    
    const getPreviousField = (currentField) => {
        const field = Object.keys(signupOtp);
        const currentIndex = field.indexOf(currentField);
    
        return currentIndex > 0 ? field[currentIndex - 1] : null;
    };
    
    const handleBackspace = (e, currentField) => {
        const {value} = e.target;
    
        // Move focus to the previous input field if backspace is pressed in an empty field
        if (!value && inputRefs[currentField].current) {
            const previousField = getPreviousField(currentField);
            if (previousField) {
                inputRefs[previousField].current.focus();
                
            }
        }
    };


return {getNextField, handleBackspace, Otp, isOTPComplete}

}

export default UseValidateVerifyEmailForm 

