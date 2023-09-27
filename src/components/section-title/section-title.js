import React from 'react'
import './section-title.scss'

const SectionTitle = ({ title, subtitle }) => {
  return (
    title &&
    <div className="section-title">
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  )
}

export default SectionTitle
