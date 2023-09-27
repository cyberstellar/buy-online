import React from 'react'
import { NavLink } from 'react-router-dom'
import { CATEGORIES } from '../../utils/constants'
import './category-list.scss'

const CategoryList = ({ getData }) => {
  const { data: categories = [] } = getData()

  return (
    <ul className="category-list">
      <li>
        <NavLink to="/">Все товары</NavLink>
      </li>
      {categories.map((category, idx) => (
        <li key={idx}>
          <NavLink to={`/category/${category}`}>
            {CATEGORIES[category]}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default CategoryList
