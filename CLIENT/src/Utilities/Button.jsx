import React from 'react'
import { useState } from 'react'

const Button = ({children, borderRadius='5px', padding='5px 10px', margin= '0px 10px', color ='#FCFCFC', backgroundColor='#1C3F94', eventHandler }) => {

const buttonStyle = {
    backgroundColor: backgroundColor,
    color: color,
    padding: padding,
    border: 'none',
    borderRadius: borderRadius,
    margin: margin,
    fontFamily: "'Montserrat', sans-serif"
}

const hoverStyle = {
    opacity: '0.8'
}

const [hover, setHover] = useState(false)

const handleHover = () => {
    setHover(!hover)
}

const btnStyle = hover ? {...buttonStyle, ...hoverStyle} :  buttonStyle;

return (

<>
    <button style={btnStyle} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={eventHandler}>{children}</button>
</>
)

}

export default Button