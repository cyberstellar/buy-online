import React from 'react'
import './button.scss'

const Button = (
  {
    text = null,
    iconName = null,
    className,
    isActive = null,
    onClick = null
  }
) => {
  return (
    <button className={`${className}${isActive ? ' active' : ''}`} onClick={onClick}>
      {iconName &&
        <span className="material-symbols-outlined">{iconName}</span>}
      {text}
    </button>
  )
}

export default Button
