import React from 'react'
import { NavLink } from 'react-router-dom'
import { CATEGORIES } from '../../utils/constants'
import './category-list.scss'

const CategoryList = ({ getData }) => {
  const { data: categories = [], isLoading } = getData()

  return (
    <ul className="category-list">
      {!isLoading && <>
          <li>
            <NavLink to="/">Все товары</NavLink>
          </li>
          {categories.map(category => (
            <li key={category}>
              <NavLink to={`/category/${category}`}>
                {category in CATEGORIES ? CATEGORIES[category] : category}
              </NavLink>
            </li>
          ))}
        </>}
    </ul>
  )
}

export default CategoryList
