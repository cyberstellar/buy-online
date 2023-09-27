import React from 'react'
import './split-view.scss'

//TODO: переименовать компонент
const SplitView = ({ left, right }) => {
  return (
    <div className="split-view">
      {left}
      {right}
    </div>
  )
}

export default SplitView
